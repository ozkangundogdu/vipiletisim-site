import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

async function main() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  let updated = 0;

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    if (!data.faqs) continue;

    delete data.faqs;
    fs.writeFileSync(filePath, matter.stringify(content, data), "utf-8");
    updated++;
  }

  console.log(`✅ ${updated} yazıdan SSS kaldırıldı.`);
}

main().catch(console.error);
