
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MessageSquare, ChevronRight, Send, ShieldCheck, GraduationCap, Scale, Clock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const questions = [
  {
    id: "name",
    question: "What is your full name?",
    type: "text",
    placeholder: "Enter your full name",
    validation: (value: string) => value.trim().length > 0,
    errorMessage: "Please enter your name"
  },
  {
    id: "fatherName",
    question: "What is your father's name?",
    type: "text",
    placeholder: "Enter your father's name",
    validation: (value: string) => value.trim().length > 0,
    errorMessage: "Please enter your father's name"
  },
  {
    id: "country",
    question: "What is your country of residence?",
    type: "text",
    placeholder: "Enter your country of residence",
    validation: (value: string) => value.trim().length > 0,
    errorMessage: "Please enter your country of residence"
  },
  {
    id: "legalMatter",
    question: "What is the nature of your legal matter?",
    type: "text",
    placeholder: "E.g., Property dispute, family matter, business issue",
    validation: (value: string) => value.trim().length > 0,
    errorMessage: "Please describe the nature of your legal matter"
  },
  {
    id: "caseType",
    question: "Is your case Civil or Criminal?",
    type: "radio",
    options: [
      { label: "Civil", value: "civil" },
      { label: "Criminal", value: "criminal" }
    ],
    validation: (value: string) => value === "civil" || value === "criminal",
    errorMessage: "Please select whether your case is civil or criminal"
  },
  {
    id: "issue",
    question: "Please describe your legal issue in detail (within 500 words):",
    type: "textarea",
    placeholder: "Provide details about your situation...",
    validation: (value: string) => value.trim().length > 10 && value.trim().length <= 2000,
    errorMessage: "Please provide details about your issue (between 10 and 2000 characters)"
  }
];

const Advice = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentResponse, setCurrentResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleNext = () => {
    const question = questions[currentQuestion];
    
    if (!question.validation(currentResponse)) {
      setError(question.errorMessage);
      return;
    }
    
    setError("");
    setResponses({
      ...responses,
      [question.id]: currentResponse
    });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentResponse("");
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    const finalResponses = {
      ...responses,
      [questions[currentQuestion].id]: currentResponse
    };
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your information has been submitted successfully!");
      navigate("/signup");
    }, 1500);
  };

  const handleRadioChange = (value: string) => {
    setCurrentResponse(value);
    setError("");
  };

  return (
    <Layout>
      <div className="container-custom">
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-rocket-gray-900 dark:text-white mb-6">
              Get Expert <span className="text-gradient-blue">Legal Advice</span>
            </h1>
            <p className="text-lg md:text-xl text-rocket-gray-600 dark:text-rocket-gray-300 mb-8">
              Navigate complex legal matters with confidence. Our network of qualified attorneys provides personalized guidance for your unique situation.
            </p>
            <div className="flex justify-center">
              <Link to="/signup">
                <Button 
                  size="lg"
                  className="bg-rocket-blue hover:bg-rocket-blue-600"
                >
                  Sign Up for Immediate Assistance
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-rocket-gray-50 dark:bg-rocket-gray-800 rounded-xl mb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of Professional Legal Advice</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-rocket-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center text-center animate-hover-float">
                <div className="bg-rocket-blue-50 dark:bg-rocket-blue-900/30 p-4 rounded-full mb-4">
                  <ShieldCheck className="h-8 w-8 text-rocket-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Protection of Rights</h3>
                <p className="text-rocket-gray-600 dark:text-rocket-gray-300 mb-6">
                  Ensure your legal rights are protected with expert guidance tailored to your specific situation.
                </p>
                <Link to="/signup" className="mt-auto">
                  <Button variant="outline" className="border-rocket-blue text-rocket-blue hover:bg-rocket-blue-50">
                    Get Protected
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white dark:bg-rocket-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center text-center animate-hover-float">
                <div className="bg-rocket-blue-50 dark:bg-rocket-blue-900/30 p-4 rounded-full mb-4">
                  <Scale className="h-8 w-8 text-rocket-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Risk Mitigation</h3>
                <p className="text-rocket-gray-600 dark:text-rocket-gray-300 mb-6">
                  Identify potential legal pitfalls before they become problems and develop strategies to minimize risk.
                </p>
                <Link to="/signup" className="mt-auto">
                  <Button variant="outline" className="border-rocket-blue text-rocket-blue hover:bg-rocket-blue-50">
                    Reduce Risks
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white dark:bg-rocket-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center text-center animate-hover-float">
                <div className="bg-rocket-blue-50 dark:bg-rocket-blue-900/30 p-4 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-rocket-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Time & Cost Savings</h3>
                <p className="text-rocket-gray-600 dark:text-rocket-gray-300 mb-6">
                  Resolve legal matters efficiently and avoid costly mistakes with professional legal counsel.
                </p>
                <Link to="/signup" className="mt-auto">
                  <Button variant="outline" className="border-rocket-blue text-rocket-blue hover:bg-rocket-blue-50">
                    Save Time & Money
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Lawyers Section */}
        <section className="py-12 mb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Our Legal Experts</h2>
            <p className="text-center text-rocket-gray-600 dark:text-rocket-gray-300 max-w-2xl mx-auto mb-12">
              Connect with experienced attorneys specialized in various practice areas, ready to provide personalized guidance for your case.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-rocket-gray-800 rounded-lg overflow-hidden shadow-lg border border-rocket-gray-100 dark:border-rocket-gray-700">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80" 
                    alt="Corporate Lawyer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-5 w-5 text-rocket-blue-500" />
                    <span className="text-sm text-rocket-blue-500 font-medium">Corporate Law</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Business & Corporate Experts</h3>
                  <p className="text-rocket-gray-600 dark:text-rocket-gray-300 mb-4">
                    Specialized in business formation, contracts, mergers & acquisitions, and corporate compliance matters.
                  </p>
                  <Link to="/signup">
                    <Button className="w-full bg-rocket-blue hover:bg-rocket-blue-600">
                      Consult a Corporate Lawyer
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white dark:bg-rocket-gray-800 rounded-lg overflow-hidden shadow-lg border border-rocket-gray-100 dark:border-rocket-gray-700">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80" 
                    alt="Family Lawyer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-5 w-5 text-rocket-blue-500" />
                    <span className="text-sm text-rocket-blue-500 font-medium">Family Law</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Family Law Specialists</h3>
                  <p className="text-rocket-gray-600 dark:text-rocket-gray-300 mb-4">
                    Expert guidance for divorce, child custody, adoption, estate planning, and other family matters.
                  </p>
                  <Link to="/signup">
                    <Button className="w-full bg-rocket-blue hover:bg-rocket-blue-600">
                      Consult a Family Lawyer
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white dark:bg-rocket-gray-800 rounded-lg overflow-hidden shadow-lg border border-rocket-gray-100 dark:border-rocket-gray-700">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80" 
                    alt="Criminal Lawyer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-5 w-5 text-rocket-blue-500" />
                    <span className="text-sm text-rocket-blue-500 font-medium">Criminal Defense</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Criminal Defense Attorneys</h3>
                  <p className="text-rocket-gray-600 dark:text-rocket-gray-300 mb-4">
                    Protecting your rights in criminal cases with aggressive defense strategies and expert legal representation.
                  </p>
                  <Link to="/signup">
                    <Button className="w-full bg-rocket-blue hover:bg-rocket-blue-600">
                      Consult a Defense Attorney
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/signup">
                <Button size="lg" className="bg-rocket-blue hover:bg-rocket-blue-600">
                  Sign Up to Connect with Our Legal Team
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Original Questionnaire Form */}
        <div className="max-w-3xl mx-auto section-padding">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4">Get Personalized Legal Guidance</h2>
            <p className="text-lg text-rocket-gray-500">
              Answer a few questions to get tailored legal advice for your specific situation.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg border border-rocket-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-8">
              {questions.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      index < currentQuestion
                        ? "bg-rocket-blue-500 text-white"
                        : index === currentQuestion
                        ? "bg-rocket-blue-100 text-rocket-blue-500 border-2 border-rocket-blue-500"
                        : "bg-rocket-gray-100 text-rocket-gray-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  
                  {index < questions.length - 1 && (
                    <div
                      className={`h-1 w-6 ${
                        index < currentQuestion
                          ? "bg-rocket-blue-500"
                          : "bg-rocket-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-rocket-blue-500 text-white p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="bg-rocket-gray-50 p-4 rounded-lg flex-1">
                  <h3 className="font-medium mb-2">
                    {questions[currentQuestion].question}
                  </h3>
                  {currentQuestion > 0 && (
                    <div className="text-xs text-rocket-gray-400 mb-2">
                      Previous: {questions[currentQuestion - 1].question}
                      <span className="font-medium ml-2">
                        {responses[questions[currentQuestion - 1].id]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              {questions[currentQuestion].type === "radio" ? (
                <div className="space-y-3">
                  {questions[currentQuestion].options!.map((option) => (
                    <div
                      key={option.value}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        currentResponse === option.value
                          ? "border-rocket-blue-500 bg-rocket-blue-50"
                          : "border-rocket-gray-200 hover:bg-rocket-gray-50"
                      }`}
                      onClick={() => handleRadioChange(option.value)}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            currentResponse === option.value
                              ? "border-rocket-blue-500"
                              : "border-rocket-gray-300"
                          }`}
                        >
                          {currentResponse === option.value && (
                            <div className="w-3 h-3 bg-rocket-blue-500 rounded-full" />
                          )}
                        </div>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : questions[currentQuestion].type === "textarea" ? (
                <Textarea
                  value={currentResponse}
                  onChange={(e) => {
                    setCurrentResponse(e.target.value);
                    setError("");
                  }}
                  placeholder={questions[currentQuestion].placeholder}
                  className="min-h-[150px]"
                />
              ) : (
                <Input
                  type="text"
                  value={currentResponse}
                  onChange={(e) => {
                    setCurrentResponse(e.target.value);
                    setError("");
                  }}
                  placeholder={questions[currentQuestion].placeholder}
                />
              )}
              
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (currentQuestion > 0) {
                    setCurrentQuestion(currentQuestion - 1);
                    setCurrentResponse(responses[questions[currentQuestion - 1].id] || "");
                  }
                }}
                disabled={currentQuestion === 0}
                className="border-rocket-blue text-rocket-blue hover:bg-rocket-blue-50"
              >
                Back
              </Button>

              <Link to="/signup">
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="bg-rocket-blue hover:bg-rocket-blue-600 gap-2"
                >
                  {currentQuestion === questions.length - 1 ? (
                    isSubmitting ? "Submitting..." : "Submit"
                  ) : (
                    <>
                      Next <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Advice;
