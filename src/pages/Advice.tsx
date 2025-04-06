
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MessageSquare, ChevronRight, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    
    // Include the final response
    const finalResponses = {
      ...responses,
      [questions[currentQuestion].id]: currentResponse
    };
    
    // In a real scenario, this is where we'd send the data to Supabase
    // const { data, error } = await supabase
    //   .from("legal_advice_responses")
    //   .insert([finalResponses]);
    
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
      <div className="container-custom section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-md mb-4">Get Legal Advice</h1>
            <p className="text-lg text-rocket-gray-500">
              Answer a few questions to get personalized legal guidance for your situation.
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Advice;
