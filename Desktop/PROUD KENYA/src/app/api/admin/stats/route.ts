import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/admin/firebase-admin';
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

// GET handler for admin dashboard statistics
export async function GET(request: Request) {
  const headersList = headers();
  const authHeader = headersList.get('authorization');
  const { searchParams } = new URL(request.url);
  
  if (!await verifyAdminToken(authHeader)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const period = searchParams.get('period') || '7d'; // 7d, 30d, or all
    const fromDate = getDateFromPeriod(period);

    // Run parallel queries for different metrics
    const [
      achievementsStats,
      postsStats,
      paymentsStats,
      userStats,
      reportsStats
    ] = await Promise.all([
      getAchievementsStats(fromDate),
      getPostsStats(fromDate),
      getPaymentsStats(fromDate),
      getUserStats(fromDate),
      getReportsStats(fromDate)
    ]);

    return NextResponse.json({
      achievements: achievementsStats,
      posts: postsStats,
      payments: paymentsStats,
      users: userStats,
      reports: reportsStats,
      period
    });
  } catch (error) {
    console.error('Error fetching admin statistics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper functions for stats calculations
function getDateFromPeriod(period: string): Date {
  const now = new Date();
  switch (period) {
    case '7d':
      return new Date(now.setDate(now.getDate() - 7));
    case '30d':
      return new Date(now.setDate(now.getDate() - 30));
    default:
      return new Date(0); // beginning of time
  }
}

async function getAchievementsStats(fromDate: Date) {
  const query = adminDb.collection('achievements')
    .where('createdAt', '>=', fromDate);
  
  const snapshot = await query.get();
  
  const stats = {
    total: snapshot.size,
    pending: 0,
    approved: 0,
    rejected: 0,
    byCategory: {} as Record<string, number>
  };

  snapshot.docs.forEach(doc => {
    const data = doc.data();
    stats[data.status]++;
    if (data.category) {
      stats.byCategory[data.category] = (stats.byCategory[data.category] || 0) + 1;
    }
  });

  return stats;
}

async function getPostsStats(fromDate: Date) {
  const query = adminDb.collection('posts')
    .where('createdAt', '>=', fromDate);
  
  const snapshot = await query.get();
  
  return {
    total: snapshot.size,
    published: snapshot.docs.filter(doc => doc.data().status === 'published').length,
    pending: snapshot.docs.filter(doc => doc.data().status === 'pending_review').length,
    premium: snapshot.docs.filter(doc => doc.data().visibility === 'premium').length
  };
}

async function getPaymentsStats(fromDate: Date) {
  const query = adminDb.collection('payments')
    .where('createdAt', '>=', fromDate);
  
  const snapshot = await query.get();
  
  let totalAmount = 0;
  let successfulAmount = 0;
  
  snapshot.docs.forEach(doc => {
    const data = doc.data();
    if (data.status === 'completed') {
      successfulAmount += data.amount;
    }
    totalAmount += data.amount;
  });

  return {
    total: snapshot.size,
    completed: snapshot.docs.filter(doc => doc.data().status === 'completed').length,
    failed: snapshot.docs.filter(doc => doc.data().status === 'failed').length,
    totalAmount,
    successfulAmount
  };
}

async function getUserStats(fromDate: Date) {
  const query = adminDb.collection('users')
    .where('createdAt', '>=', fromDate);
  
  const snapshot = await query.get();
  
  return {
    total: snapshot.size,
    publishers: snapshot.docs.filter(doc => doc.data().role === 'publisher').length,
    verified: snapshot.docs.filter(doc => doc.data().isVerified).length,
    suspended: snapshot.docs.filter(doc => doc.data().status === 'suspended').length
  };
}

async function getReportsStats(fromDate: Date) {
  const query = adminDb.collection('reports')
    .where('createdAt', '>=', fromDate);
  
  const snapshot = await query.get();
  
  return {
    total: snapshot.size,
    pending: snapshot.docs.filter(doc => doc.data().status === 'pending').length,
    resolved: snapshot.docs.filter(doc => doc.data().status === 'resolved').length,
    byType: snapshot.docs.reduce((acc, doc) => {
      const type = doc.data().type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
}