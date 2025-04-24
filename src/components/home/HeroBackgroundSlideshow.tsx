
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useState, useEffect } from "react";

const HeroBackgroundSlideshow = () => {
  const [api, setApi] = useState<any>();
  
  const images = [
    "/lovable-uploads/b869bc73-691a-43d6-91bb-9c7ef26c4cdf.png",
    "/lovable-uploads/48591f7b-0a7c-4a3e-8d9f-f801c572f6e4.png",
    "/lovable-uploads/0f29654a-6c00-4bdb-978c-91e16948faf8.png",
    "/lovable-uploads/49954e32-483e-447d-ba03-570ecb16dcaa.png",
    "/lovable-uploads/c20ec661-23e3-4fff-bd02-54badc8b2dca.png",
    "/lovable-uploads/0f2430fd-a1bc-47ab-a2f7-2d0459002225.png",
    "/lovable-uploads/c00b81b1-8cbd-47a6-86b4-3e99402ecbf5.png"
  ];

  useEffect(() => {
    if (!api) return;
    
    // Reduced interval from 5000ms to 2000ms to make the slideshow faster
    const interval = setInterval(() => {
      api.next();
    }, 2000);
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="absolute inset-0 z-0">
      <Carousel setApi={setApi} className="h-full w-full" opts={{ loop: true }}>
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative h-full w-full">
                <img 
                  src={image}
                  alt={`Legal background ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-rocket-blue-600/95 to-rocket-blue-900/95"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HeroBackgroundSlideshow;
