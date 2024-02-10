import { useMemo, useRef } from 'react';

export const useCarousel=()=>{
  const carouselRef = useRef<HTMLUListElement>(null);
  const scrollWidth = useMemo(()=>{
    if (!carouselRef.current) return 0;
    return carouselRef.current.clientWidth;
  }, [carouselRef.current]);

  const currentScroll = ()=>({
    left: carouselRef.current?.scrollLeft ?? 0,
    top: carouselRef.current?.scrollTop ?? 0,
  });

  const scrollBy=({ x, y }:{ x: number, y: number }, pos:{top:number, left:number})=>{
    if (!carouselRef.current) return;
    carouselRef.current.scrollTop = pos.top - y;
    carouselRef.current.scrollLeft = pos.left - x;
  };

  const moveNext = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft += scrollWidth;
  };

  const movePrevious = () => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollLeft -= scrollWidth;
  };
  return { currentScroll, scrollBy, carouselRef, moveNext, movePrevious };
};
