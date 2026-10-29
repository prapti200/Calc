import { MetadataRoute } from 'next';
import { CALCULATORS, CATEGORIES } from '@/lib/calculators';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calc-modern.vercel.app';
  const now = new Date();

  // 1. Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. Category Pages
  Object.values(CATEGORIES).forEach((cat) => {
    routes.push({
      url: `${baseUrl}/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // 3. Calculator Pages
  CALCULATORS.forEach((calc) => {
    routes.push({
      url: `${baseUrl}/${calc.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  return routes;
}
