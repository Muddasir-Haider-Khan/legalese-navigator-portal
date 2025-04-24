
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import MakeDocuments from "@/components/dashboard/MakeDocuments";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Documents = () => {
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <div className="container-custom py-8 md:py-16">
          <div className="mx-auto">
            <div className={cn(
              "text-center mb-16",
              isMobile ? "px-4" : ""
            )}>
              <div className="inline-flex items-center justify-center bg-bright-orange-100 text-bright-orange-500 px-3 py-1.5 rounded-full mb-4 text-xs md:text-sm font-medium">
                PROFESSIONAL LEGAL DOCUMENTS
              </div>
              <h1 className={cn(
                "text-4xl md:text-5xl font-bold mb-6 text-deep-blue-900",
                isMobile ? "text-3xl" : ""
              )}>
                Create Your Legal Documents
              </h1>
              <p className={cn(
                "text-muted-foreground max-w-2xl mx-auto text-base md:text-lg",
                isMobile ? "px-2" : ""
              )}>
                Browse our comprehensive collection of attorney-drafted legal templates designed for 
                individuals and businesses. Customize, download, and use within minutes.
              </p>
            </div>
            
            <MakeDocuments />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
