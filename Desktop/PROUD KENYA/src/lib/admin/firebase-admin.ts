import * as admin from 'firebase-admin';

// Initialize Firebase Admin if it hasn't been initialized yet
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
    console.log('Firebase Admin initialized');
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export const adminStorage = admin.storage();

// Helper functions for common admin operations

// User Management
export const verifyUser = async (uid: string) => {
  try {
    await adminAuth.updateUser(uid, {
      emailVerified: true,
    });
    await adminDb.collection('users').doc(uid).update({
      isVerified: true,
      verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error verifying user:', error);
    return false;
  }
};

// Achievement Management
export const moderateAchievement = async (
  achievementId: string,
  status: 'approved' | 'rejected',
  moderatorNote?: string
) => {
  try {
    await adminDb.collection('achievements').doc(achievementId).update({
      status,
      moderatedAt: admin.firestore.FieldValue.serverTimestamp(),
      moderatorNote,
    });
    return true;
  } catch (error) {
    console.error('Error moderating achievement:', error);
    return false;
  }
};

// Post Management
export const approvePublisherPost = async (
  postId: string,
  paymentStatus: 'completed' | 'failed'
) => {
  try {
    await adminDb.collection('posts').doc(postId).update({
      status: paymentStatus === 'completed' ? 'published' : 'payment_failed',
      publishedAt: paymentStatus === 'completed' ? 
        admin.firestore.FieldValue.serverTimestamp() : null,
    });
    return true;
  } catch (error) {
    console.error('Error approving post:', error);
    return false;
  }
};

// Payment Management
export const updatePaymentStatus = async (
  paymentId: string,
  status: 'completed' | 'failed',
  transactionDetails: any
) => {
  const paymentRef = adminDb.collection('payments').doc(paymentId);
  
  try {
    await adminDb.runTransaction(async (transaction) => {
      const paymentDoc = await transaction.get(paymentRef);
      
      if (!paymentDoc.exists) {
        throw new Error('Payment not found');
      }

      transaction.update(paymentRef, {
        status,
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
        transactionDetails,
      });

      // If this is a post payment, update the post status
      if (paymentDoc.data()?.type === 'post_publishing') {
        const postRef = adminDb.collection('posts').doc(paymentDoc.data().postId);
        transaction.update(postRef, {
          status: status === 'completed' ? 'pending_review' : 'payment_failed',
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    });
    return true;
  } catch (error) {
    console.error('Error updating payment status:', error);
    return false;
  }
};

// Analytics helpers
export const incrementMetrics = async (
  collection: string,
  docId: string,
  metrics: { [key: string]: number }
) => {
  try {
    const ref = adminDb.collection(collection).doc(docId);
    const incrementObject = {};
    
    Object.keys(metrics).forEach(key => {
      incrementObject[key] = admin.firestore.FieldValue.increment(metrics[key]);
    });
    
    await ref.update(incrementObject);
    return true;
  } catch (error) {
    console.error('Error incrementing metrics:', error);
    return false;
  }
};