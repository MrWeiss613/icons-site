const fs = require("fs");
const path = require("path");

const BASE_URL = "https://icons-94z.pages.dev";
const ICONS_FOLDER = __dirname;

const allowed = [".jpg", ".jpeg", ".png", ".webp"];

function scan(dir, results = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      scan(fullPath, results);
    } else {
      const ext = path.extname(item.name).toLowerCase();

      if (allowed.includes(ext)) {
        const relative = path.relative(ICONS_FOLDER, fullPath);
        const url = BASE_URL + "/" + relative.replace(/\\/g, "/");

        results.push({
          path: url,
          folder: relative.split("/")[0],
          name: item.name
        });
      }
    }
  }

  return results;
}

const icons = scan(ICONS_FOLDER);

fs.writeFileSync(
  "icons.json",
  JSON.stringify({ icons }, null, 2)
);

console.log("icons.json created with", icons.length, "icons");
