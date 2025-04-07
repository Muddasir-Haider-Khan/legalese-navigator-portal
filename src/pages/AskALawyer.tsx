
import { useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import AskLawyerHero from "@/components/lawyer/AskLawyerHero";
import CommunicationOptions from "@/components/lawyer/CommunicationOptions";
import FrequentlyAskedQuestions from "@/components/lawyer/FrequentlyAskedQuestions";
import ContactForm from "@/components/lawyer/ContactForm";

export default function AskALawyer() {
  return (
    <Layout>
      <Helmet>
        <title>Ask a Lawyer | Rocket Lawyer</title>
        <meta name="description" content="Get legal advice from our network of certified lawyers through chat, video calls, or our Q&A section." />
      </Helmet>
      
      <AskLawyerHero />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <CommunicationOptions />
        <FrequentlyAskedQuestions />
        <ContactForm />
      </div>
    </Layout>
  );
}
