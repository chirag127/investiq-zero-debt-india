import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'debt-triage',
      'credit-cards',
      'recovery-rights',
      'credit-repair',
      'settlement-pitfalls',
      'legal-proceedings'
    ]),
    tags: z.array(z.string()),
    verifiedOn: z.string(),
    lastUpdated: z.string(),
    statutoryReferences: z.array(z.string()),
    readingTime: z.string(),
    primaryTakeaway: z.string(),
    riskWarning: z.string().optional()
  })
});

export const collections = {
  articles: articlesCollection
};
