import Head from "next/head";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Hero from "../components/Hero";
import Map from "../components/Map/Map";
import FeaturedPosts from "../components/Widgets/FeaturedPosts";
import AchievementsFeed from "../components/Widgets/AchievementsFeed";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Proud Kenya - Track National Progress</title>
        <meta
          name="description"
          content="Explore Kenya's achievements and progress"
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <Map />
        <FeaturedPosts />
        <AchievementsFeed />
      </main>
      <Footer />
    </div>
  );
}
