import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

// output: 'export' 下 metadata 路由必须声明为纯静态
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    }
    // ,
    // {
    //   url: `${baseUrl}/templates`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/tutorials`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // },
    // {
    //   url: `${baseUrl}/help-feedback`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.5,
    // },
  ]
}
