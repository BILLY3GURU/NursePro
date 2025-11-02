import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import WardHeader from "../../components/Ward/WardHeader";
import AchievementsList from "../../components/Ward/AchievementsList";
import RelatedPosts from "../../components/Ward/RelatedPosts";
import CommentsSection from "../../components/Ward/CommentsSection";

export default function WardPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Ward {id} - Proud Kenya</title>
        <meta name="description" content={`Local achievements in ward ${id}`} />
      </Head>
      <Header />
      <main>
        <WardHeader wardId={id} />
        <AchievementsList wardId={id} />
        <RelatedPosts wardId={id} />
        <CommentsSection wardId={id} />
      </main>
      <Footer />
    </div>
  );
}
