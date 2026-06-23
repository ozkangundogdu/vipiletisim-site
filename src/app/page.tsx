import { BlogSection } from "@/components/blog-section";
import { BrandsSection } from "@/components/brands-section";
import { FaqSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ReviewsSection />
        <BrandsSection />
        <ServicesSection />
        <BlogSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
