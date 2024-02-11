import { useMemo, useRef, useState } from 'react';

export const useCarousel = () => {
  const carouselRef = useRef<HTMLUListElement>(null);


  const slides = useMemo(() => {
    if (!carouselRef.current) return null;
    return carouselRef.current.children;
  }, [carouselRef.current?.innerHTML]);

  const [scrollPos, setScrollPos] = useState(0);
  const wholeWidth = carouselRef.current?.scrollWidth ?? 0;
  const currentSlideWith = useMemo(() => {
    if (!slides) return 0;
    const centeredSlide = Math.round(wholeWidth / scrollPos);
    return (slides?.item(centeredSlide) as HTMLElement)?.offsetWidth ?? 0;
  }, [carouselRef.current?.innerHTML]);

  const currentScroll = () => ({
    left: carouselRef.current?.scrollLeft ?? 0,
    top: carouselRef.current?.scrollTop ?? 0,
  });

  const scrollBy = ({ x, y }: { x: number, y: number }, pos: { top: number, left: number }) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollTop = pos.top - y;
    carouselRef.current.scrollLeft = pos.left - x;
  };

  const moveNext = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft += currentSlideWith;
  };

  const movePrevious = () => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollLeft -= currentSlideWith;
  };

  return { currentScroll, scrollBy, carouselRef, moveNext, movePrevious, setScrollPos };
};
