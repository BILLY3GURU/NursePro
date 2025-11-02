import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/admin/firebase-admin';
import { headers } from 'next/headers';

// Middleware to verify admin access
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

// GET handler for fetching moderation queue
export async function GET() {
  const headersList = headers();
  const authHeader = headersList.get('authorization');

  if (!await verifyAdminToken(authHeader)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch pending items for moderation
    const [pendingAchievements, pendingPosts, reportedItems] = await Promise.all([
      adminDb.collection('achievements')
        .where('status', '==', 'pending')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get(),
      
      adminDb.collection('posts')
        .where('status', '==', 'pending_review')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get(),
      
      adminDb.collection('reports')
        .where('status', '==', 'pending')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get()
    ]);

    return NextResponse.json({
      achievements: pendingAchievements.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })),
      posts: pendingPosts.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })),
      reports: reportedItems.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    });
  } catch (error) {
    console.error('Error fetching moderation queue:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST handler for moderating content
export async function POST(request: Request) {
  const headersList = headers();
  const authHeader = headersList.get('authorization');

  if (!await verifyAdminToken(authHeader)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { type, id, action, note } = await request.json();
    
    switch (type) {
      case 'achievement':
        await adminDb.collection('achievements').doc(id).update({
          status: action,
          moderatorNote: note,
          moderatedAt: new Date(),
        });
        break;
        
      case 'post':
        await adminDb.collection('posts').doc(id).update({
          status: action,
          moderatorNote: note,
          moderatedAt: new Date(),
        });
        break;
        
      case 'report':
        await adminDb.collection('reports').doc(id).update({
          status: action,
          moderatorNote: note,
          resolvedAt: new Date(),
        });
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid content type' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error moderating content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}