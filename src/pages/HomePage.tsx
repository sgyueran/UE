import { HomeContactResume, HomeFeaturedProjects, HomeHero, HomeSkillsDirection } from "@/features/home";

export function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeSkillsDirection />
      <HomeFeaturedProjects />
      <HomeContactResume />
    </main>
  );
}
