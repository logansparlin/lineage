import { HomePage } from "@/components/home/home-page";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/queries/home";
import ReactLenis from "lenis/react";

export default async function Home() {
  const { data: homePage } = await sanityFetch({ query: homePageQuery });
  return (
    <ReactLenis root>
      <HomePage {...homePage} />
    </ReactLenis>
  );
}
