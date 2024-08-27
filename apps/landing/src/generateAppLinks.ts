import { readdirSync, lstatSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const appsDir = join(__dirname, "../../../apps");

interface AppLink {
  name: string;
  url: string;
}

function getDirectories(source: string): string[] {
  return readdirSync(source).filter((name) =>
    lstatSync(join(source, name)).isDirectory()
  );
}

function generateLinks(): AppLink[] {
  const apps = getDirectories(appsDir);

  return apps
    .map((appName) => ({
      name: appName,
      url: `./${appName}/`,
    }))
    .filter((appName) => appName.name !== "landing");
}

const links = generateLinks();
mkdirSync(join(__dirname, "../dist"), { recursive: true });
writeFileSync(
  join(__dirname, "../dist", "appLinks.json"),
  JSON.stringify(links, null, 2)
);
console.log("App links JSON generated successfully!");
