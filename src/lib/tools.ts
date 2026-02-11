import fs from "fs";
import path from "path";
import matter from "gray-matter";

const TOOLS_CONTENT_PATH = path.join(process.cwd(), "src/content/tools");

export async function getToolContent(slug: string) {
  const filePath = path.join(TOOLS_CONTENT_PATH, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    meta: data,
    content,
  };
}
