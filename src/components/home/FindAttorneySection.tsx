
import React from "react";
import { Button } from "@/components/ui/button";

/**
 * Section: FindAttorneySection
 * Image: /lovable-uploads/32a92b14-f28e-43ae-aab2-8109ab83c60c.png
 * - The image is responsive, fits in a max-w-md on desktop, and takes full width on mobile.
 * - Section is perfectly responsive across all screen sizes.
 */
export default function FindAttorneySection() {
  return (
    <section className="w-full bg-white py-20 md:py-28 flex items-center">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Responsive Image with shadow and rounded effect */}
          <div className="w-full max-w-md mx-auto md:mx-0 relative flex-shrink-0 flex-grow-0">
            <div className="absolute -inset-6 bg-bright-orange-100 rounded-3xl z-0" aria-hidden="true" />
            <img
              src="/lovable-uploads/32a92b14-f28e-43ae-aab2-8109ab83c60c.png"
              alt="Find Attorney"
              className="w-full h-auto aspect-[1.35/1] rounded-2xl relative z-10 object-cover shadow-lg"
              style={{ boxShadow: "0px 8px 32px 0px rgba(2, 1, 34, 0.06)" }}
              loading="lazy"
            />
          </div>
          {/* Text Content */}
          <div className="flex-1 max-w-xl mt-12 md:mt-0 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-bright-orange-500 text-lg font-semibold mb-2">
              Don't have time to research?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-rocket-gray-900 mb-4 leading-snug">
              Let us do the work of finding an attorney for you
            </h2>
            <p className="text-lg text-rocket-gray-600 mb-8">
              Try Avvo&apos;s free premium concierge service to chat with a live agent, tell them what you need, and get connected with an attorney in your area.
            </p>
            {/* Avvo CTA Button */}
            <a
              href="https://www.avvo.com/ask-a-lawyer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button
                className="bg-[#006AFF] text-white hover:bg-[#0052cc] px-8 py-4 text-lg font-semibold rounded-lg shadow-md flex items-center"
                style={{ minWidth: 265 }}
              >
                <span className="mr-3 inline-flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Chat with
                </span>
                <span className="ml-1 font-extrabold tracking-wide" style={{ fontStyle: "italic" }}>Avvo</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

