import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/admin/firebase-admin';
import { headers } from 'next/headers';

// Middleware to verify admin token (reusable)
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

// GET handler for listing users with filters
export async function GET(request: Request) {
  const headersList = headers();
  const authHeader = headersList.get('authorization');
  const { searchParams } = new URL(request.url);
  
  if (!await verifyAdminToken(authHeader)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let query = adminDb.collection('users');
    
    // Apply filters
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const verificationStatus = searchParams.get('verified');
    
    if (role) {
      query = query.where('role', '==', role);
    }
    if (status) {
      query = query.where('status', '==', status);
    }
    if (verificationStatus) {
      query = query.where('isVerified', '==', verificationStatus === 'true');
    }

    const usersSnapshot = await query.limit(50).get();
    
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      lastLogin: doc.data().lastLogin?.toDate()
    }));

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST handler for user management actions
export async function POST(request: Request) {
  const headersList = headers();
  const authHeader = headersList.get('authorization');

  if (!await verifyAdminToken(authHeader)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action, userId, data } = await request.json();

    switch (action) {
      case 'updateRole':
        await adminDb.collection('users').doc(userId).update({
          role: data.role,
          updatedAt: new Date(),
          updatedBy: data.adminId
        });
        break;

      case 'verifyPublisher':
        await adminDb.collection('users').doc(userId).update({
          isVerifiedPublisher: true,
          publisherVerifiedAt: new Date(),
          publisherVerifiedBy: data.adminId
        });
        break;

      case 'suspend':
        await adminDb.collection('users').doc(userId).update({
          status: 'suspended',
          suspendedAt: new Date(),
          suspendedBy: data.adminId,
          suspensionReason: data.reason
        });
        // Revoke user's Firebase session
        await adminAuth.revokeRefreshTokens(userId);
        break;

      case 'restore':
        await adminDb.collection('users').doc(userId).update({
          status: 'active',
          restoredAt: new Date(),
          restoredBy: data.adminId
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
    console.error('Error managing user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}