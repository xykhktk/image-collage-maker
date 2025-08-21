
import { Metadata } from "next";
import Canvas from "@/src/components/Canvas";
import { Toolbar } from "@/src/components/toolbar";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Online Image Collage Maker - Multiple Templates, One-Click Export",
  description: "Create stunning photo collages with our free online image collage maker. Multiple templates, real-time preview, and high-quality export. No download required, start creating now!",
  keywords: "free image collage,online collage tool,photo collage maker,collage templates,image editing tool",
  openGraph: {
    title: "Free Online Image Collage Maker - Multiple Templates, One-Click Export",
    description: "Create stunning photo collages with our free online image collage maker. Multiple templates, real-time preview, and high-quality export.",
    type: "website",
    url: siteConfig.url,
  },
};

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center p-8 md:p-10">
        {/* SEO-friendly title and description */}
        <div className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Free Online Image Collage Maker
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
            Professional photo collage tool with multiple templates to create personalized works easily
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>✓ Free to Use</span>
            <span>✓ Multiple Templates</span>
            <span>✓ Online Editing</span>
            <span>✓ One-Click Export</span>
            <span>✓ High Quality Output</span>
          </div>
        </div>

        {/* Main functionality area */}
        <div className="w-full max-w-6xl">
          <Toolbar></Toolbar>
          <Canvas></Canvas>
        </div>

        {/* SEO-friendly feature introduction */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Collage Maker?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-3">Multiple Templates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Rich collage templates including 2 horizontal photos, 3 horizontal photos, 3 vertical photos and more layout options
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-3">Online Editing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No software download required, edit directly in your browser with drag, zoom, crop and other operations
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-3">One-Click Export</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Support high-resolution image export to meet various usage needs and quickly save your creative works
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
