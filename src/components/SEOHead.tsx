"use client";

import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export default function SEOHead({
  title = "Image Collage Maker - Free Online Photo Collage Tool",
  description = "Create beautiful photo collages online with our free image collage maker. Multiple templates, easy editing, and high-quality export. No download required, start creating now!",
  keywords = "image collage,photo collage maker,online collage tool,photo editing,collage templates,free collage tool,image editing,photo montage",
  image = "/og-image.jpg",
  url = "https://your-domain.com",
  type = "website"
}: SEOHeadProps) {
  return (
    <Head>
      {/* 基础SEO标签 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Image Collage Maker" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="图片拼贴制作器" />
      <meta property="og:locale" content="zh_CN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@your-twitter-handle" />
      
      {/* 其他重要标签 */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="canonical" href={url} />
      
      {/* 预连接优化 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}
