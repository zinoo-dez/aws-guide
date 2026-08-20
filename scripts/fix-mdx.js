import fs from 'fs';
import path from 'path';

const dir = './src/content/case-studies';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace <pre><code>...</code></pre> inside DeepDiveAccordion with standard markdown fenced code blocks
  // e.g. <DeepDiveAccordion title="..." badge="...">\n  <pre><code>CODE</code></pre>\n</DeepDiveAccordion>
  content = content.replace(
    /<DeepDiveAccordion([^>]*)>\s*<pre><code>([\s\S]*?)<\/code><\/pre>\s*<\/DeepDiveAccordion>/g,
    (match, attrs, code) => {
      // Decode HTML entities if any
      const cleanCode = code
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .trim();
      return `<DeepDiveAccordion${attrs}>\n\n\`\`\`\n${cleanCode}\n\`\`\`\n\n</DeepDiveAccordion>`;
    }
  );

  // In case there are other <pre><code> tags
  content = content.replace(
    /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
    (match, code) => {
      const cleanCode = code
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .trim();
      return `\n\n\`\`\`\n${cleanCode}\n\`\`\`\n\n`;
    }
  );

  fs.writeFileSync(filePath, content, 'utf-8');
}

console.log(`Processed ${files.length} MDX files.`);
