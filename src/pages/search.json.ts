import { getCollection } from 'astro:content';

export async function GET() {
  const modules = await getCollection('modules');
  const caseStudies = await getCollection('caseStudies');

  const searchData: any[] = [];

  // Index modules
  modules.forEach((mod) => {
    searchData.push({
      type: 'Module',
      title: `Module ${mod.data.moduleNumber}: ${mod.data.title}`,
      summary: mod.data.description,
      theme: mod.data.theme,
      url: `/modules/${mod.id}`,
      services: mod.data.keyServices,
      tags: ['module', mod.data.difficulty.toLowerCase()],
    });
  });

  // Index case studies
  caseStudies.forEach((cs) => {
    searchData.push({
      type: 'Case Study',
      title: cs.data.title,
      summary: cs.data.summary,
      url: `/case-studies/${cs.id}`,
      services: cs.data.awsServices.map((s) => s.name),
      tags: [...cs.data.tags, ...cs.data.architectureStyle, cs.data.difficulty.toLowerCase(), cs.data.industry.toLowerCase()],
    });
  });

  return new Response(JSON.stringify(searchData), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
