// Starlight docs collection (Content Layer API).
// Required for the Starlight integration to resolve src/content/docs/*.
// Shape per the official Starlight manual-setup guide.
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
