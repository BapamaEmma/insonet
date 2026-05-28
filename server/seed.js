import { projects, projectCategories, projectStats } from "../src/data/projects.js";
import { services } from "../src/data/services.js";
import { readContent, writeContent } from "./utils/storage.js";

async function seed() {
  const content = await readContent();
  content.projects = projects;
  content.projectCategories = projectCategories;
  content.projectStats = projectStats;
  if (!content.services?.length) content.services = services;
  await writeContent(content);
  console.log(`Seeded ${projects.length} projects into server/data/content.json`);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
