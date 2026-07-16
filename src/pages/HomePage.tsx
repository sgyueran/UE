import { HomeContactResume, HomeFeaturedProjects, HomeHero, HomeSkillsDirection } from "@/features/home";

export function HomePage() {
  return (
    <div>
      <HomeHero />
      <HomeSkillsDirection />
      <HomeFeaturedProjects />
      <HomeContactResume />
    </div>
  );
}
