import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const modules = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/modules' }),
  schema: z.object({
    moduleNumber: z.number().min(0).max(10),
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    theme: z.string(),
    keyServices: z.array(z.string()),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
    estimatedHours: z.number(),
    icon: z.string(),
    order: z.number(),
    learningOutcomes: z.array(z.string()),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    moduleId: z.string(),
    title: z.string(),
    summary: z.string(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
    estimatedMinutes: z.number(),
    industry: z.string(),
    architectureStyle: z.array(z.string()),
    awsServices: z.array(
      z.object({
        name: z.string(),
        category: z.enum([
          'Compute',
          'Storage',
          'Database',
          'Networking',
          'Serverless',
          'Analytics',
          'Containers',
          'Security',
          'DevOps',
          'Observability',
          'IoT',
          'Media',
          'Management',
        ]),
        role: z.string(),
      })
    ),
    keyMetrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        trend: z.enum(['up', 'down', 'neutral']).optional(),
      })
    ),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = {
  modules,
  caseStudies,
};
