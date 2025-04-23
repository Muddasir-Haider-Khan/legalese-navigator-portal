
import React from "react";
import { Button } from "@/components/ui/button";

export default function FindAttorneySection() {
  return (
    <section className="w-full bg-white py-20 md:py-28 flex items-center">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image with shadow effect */}
          <div className="w-full max-w-md mx-auto md:mx-0 relative">
            <div className="absolute -inset-6 bg-bright-orange-100 rounded-3xl z-0" aria-hidden="true" />
            <img
              src="/lovable-uploads/57453edd-dfba-41cc-a506-58c29c94cd1a.png"
              alt="Call center support agent"
              className="w-full h-auto rounded-2xl relative z-10 object-cover"
              style={{ boxShadow: "0px 8px 32px 0px rgba(2, 1, 34, 0.06)" }}
            />
          </div>
          {/* Text Content */}
          <div className="flex-1 max-w-xl">
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
