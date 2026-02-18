import { Box } from "@mui/material";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TemplateSection from "@/components/TemplateSection";
import AIBuilderSection from "@/components/AIBuilderSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <Box id="hero">
        <HeroSection />
      </Box>
      <Box id="features">
        <FeaturesSection />
      </Box>
      <Box id="templates">
        <TemplateSection />
      </Box>
      <Box id="ai-builder">
        <AIBuilderSection />
      </Box>
      <Box id="testimonials">
        <TestimonialsSection />
      </Box>
      <CTABanner />
      <Footer />
    </Box>
  );
}
