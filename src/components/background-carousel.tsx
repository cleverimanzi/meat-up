'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ImagePlaceholder } from '@/lib/placeholder-images';

interface BackgroundCarouselProps {
  images: ImagePlaceholder[];
}

export default function BackgroundCarousel({ images }: BackgroundCarouselProps) {
  return (
    <Carousel
      className="absolute inset-0 w-full h-full"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="relative h-screen w-full">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                priority={images.indexOf(image) === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
