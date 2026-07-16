import { HomeFeaturedProjects, HomeHero, HomeSkillsDirection } from "@/features/home";

export function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeSkillsDirection />
      <HomeFeaturedProjects />
    </main>
  );
}
