import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/queries/home";
import { HomePage } from "@/components/home/home-page";
import { ScrollContainer } from "@/components/global/scroll-container";
import { HomeScrollScene } from "@/components/home/intro/home-scroll-scene";

export default async function Home() {
  const { data: homePage } = await sanityFetch({ query: homePageQuery });
  
  return (
    <ScrollContainer>
      <HomePage {...homePage} />
      <HomeScrollScene />
    </ScrollContainer>
  );
}
