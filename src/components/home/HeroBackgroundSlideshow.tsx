
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

const HeroBackgroundSlideshow = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  
  // Updated to include approximately 40 images from Unsplash
  const images = [
    // Original uploaded images
    "/lovable-uploads/697f8a63-6e9a-41a0-9995-812ce5ce9381.png",
    "/lovable-uploads/74a69ce1-a6bf-4425-b520-90e996d23567.png",
    "/lovable-uploads/895c7048-27af-4849-a014-fb3c7e9d698c.png",
    "/lovable-uploads/8eb9991b-1c75-4153-bbc1-83cbb5662538.png",
    "/lovable-uploads/cbdc3394-18f6-4530-a367-764e9851d995.png",
    "/lovable-uploads/f5b383f8-da64-467e-904b-2578ce595c8a.png",
    "/lovable-uploads/da854a04-d4c5-4d08-90c5-64874c1fd0e9.png",
    // Additional Unsplash images to reach around 40
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    "https://images.unsplash.com/photo-1518770660439-4636190af475",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    // Additional legal/business-themed images
    "https://images.unsplash.com/photo-1521791055366-0d553872125f",
    "https://images.unsplash.com/photo-1549923746-c502d488b3ea",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    "https://images.unsplash.com/photo-1664575602554-2087b04935a5",
    "https://images.unsplash.com/photo-1543286386-2e659306cd6c",
    "https://images.unsplash.com/photo-1680706513339-160bf3dfa151",
    "https://images.unsplash.com/photo-1636132644063-5658c8e7c298",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    "https://images.unsplash.com/photo-1575320854760-bffcb3c3f1b7",
    "https://images.unsplash.com/photo-1529539795054-3c162aab037a",
    "https://images.unsplash.com/photo-1588702547919-26089e690ecc",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    "https://images.unsplash.com/photo-1611095790444-1dfa35e37b52",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
  ];

  useEffect(() => {
    if (!api) return;
    
    console.log("Carousel API loaded:", api);
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 2000);
    
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="absolute inset-0 z-0">
      <Carousel setApi={setApi} className="h-full w-full" opts={{ loop: true }}>
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative h-full w-full transition-all duration-700 transform">
                <img 
                  src={image}
                  alt={`Legal background ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out transform scale-105 hover:scale-100 blur-[0.5px] hover:blur-0"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-rocket-blue-600/95 to-rocket-blue-900/95 transition-opacity duration-700 ease-in-out backdrop-blur-[2px]"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HeroBackgroundSlideshow;
