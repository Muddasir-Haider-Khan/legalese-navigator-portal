
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useEffect } from "react";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Documents = lazy(() => import("./pages/Documents"));
const Advice = lazy(() => import("./pages/Advice"));
const Articles = lazy(() => import("./pages/Articles"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-rocket-blue-300 border-t-rocket-blue-600"></div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Component to handle scrolling to top when route changes
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [location]);
  
  return null;
};

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/advice" element={<Advice />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
