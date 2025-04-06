
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <div className="w-full">
        <Hero />
        <Features />
        <Testimonials />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Index;
