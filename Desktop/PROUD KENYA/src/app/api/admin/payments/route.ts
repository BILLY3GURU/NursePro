import { NextResponse } from 'next/server';
import { adminAuth, adminDb, updatePaymentStatus } from '@/lib/admin/firebase-admin';
import { headers } from 'next/headers';

async function verifyAdminToken(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) {
    return false;
  }

  try {
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get();
    
    return userDoc.exists && userDoc.data()?.role === 'admin';
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return false;
  }
}

// GET handler for payment management
export async function GET(request: Request) {
  const headersList = headers();
  const authHeader = headersList.get('authorization');
  const { searchParams } = new URL(request.url);
  
  if (!await verifyAdminToken(authHeader)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let query = adminDb.collection('payments');
    
    // Apply filters
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const dateFrom = searchParams.get('from');
    const dateTo = searchParams.get('to');
    
    if (status) {
      query = query.where('status', '==', status);
    }
    if (type) {
      query = query.where('type', '==', type);
    }
    if (dateFrom) {
      query = query.where('createdAt', '>=', new Date(dateFrom));
    }
    if (dateTo) {
      query = query.where('createdAt', '<=', new Date(dateTo));
    }

    const paymentsSnapshot = await query
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();
    
    const payments = paymentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      processedAt: doc.data().processedAt?.toDate()
    }));

    return NextResponse.json({ payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST handler for payment actions
export async function POST(request: Request) {
  const headersList = headers();
  const authHeader = headersList.get('authorization');

  if (!await verifyAdminToken(authHeader)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action, paymentId, data } = await request.json();

    switch (action) {
      case 'processRefund':
        // Start M-Pesa refund process
        const paymentDoc = await adminDb.collection('payments').doc(paymentId).get();
        const paymentData = paymentDoc.data();
        
        if (!paymentData) {
          throw new Error('Payment not found');
        }

        // Create refund record
        const refundRef = adminDb.collection('refunds').doc();
        await refundRef.set({
          originalPaymentId: paymentId,
          amount: paymentData.amount,
          reason: data.reason,
          status: 'pending',
          createdAt: new Date(),
          createdBy: data.adminId,
          phoneNumber: paymentData.phoneNumber,
          transactionRef: paymentData.transactionRef
        });

        // Update original payment
        await adminDb.collection('payments').doc(paymentId).update({
          refundStatus: 'pending',
          refundId: refundRef.id,
          refundReason: data.reason,
          refundRequestedAt: new Date(),
          refundRequestedBy: data.adminId
        });
        break;

      case 'markRefunded':
        await adminDb.collection('payments').doc(paymentId).update({
          status: 'refunded',
          refundStatus: 'completed',
          refundCompletedAt: new Date(),
          refundCompletedBy: data.adminId,
          refundTransactionDetails: data.transactionDetails
        });

        // Update the associated refund record
        if (data.refundId) {
          await adminDb.collection('refunds').doc(data.refundId).update({
            status: 'completed',
            completedAt: new Date(),
            completedBy: data.adminId,
            transactionDetails: data.transactionDetails
          });
        }
        break;

      case 'manualVerification':
        // For cases where M-Pesa callback failed but payment is confirmed
        await updatePaymentStatus(paymentId, 'completed', {
          manuallyVerified: true,
          verifiedAt: new Date(),
          verifiedBy: data.adminId,
          verificationNote: data.note
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing payment action:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}