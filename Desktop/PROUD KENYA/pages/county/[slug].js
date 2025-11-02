import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import CountyHeader from "../../components/County/CountyHeader";
import ConstituencyCards from "../../components/County/ConstituencyCards";
import FeaturedCountyPosts from "../../components/County/FeaturedCountyPosts";
import CountyAchievements from "../../components/County/CountyAchievements";

export default function CountyPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{slug} - Proud Kenya</title>
        <meta
          name="description"
          content={`Explore achievements in ${slug} county`}
        />
      </Head>
      <Header />
      <main>
        <CountyHeader countySlug={slug} />
        <ConstituencyCards countySlug={slug} />
        <FeaturedCountyPosts countySlug={slug} />
        <CountyAchievements countySlug={slug} />
      </main>
      <Footer />
    </div>
  );
}
