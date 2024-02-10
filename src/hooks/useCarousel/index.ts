import { useRef } from 'react';

export const useCarousel=(distance:number, scrollDistance:number)=>{
  const carouselRef = useRef<HTMLUListElement>(null);

  const getCenter = ()=>{
    if (!carouselRef.current) return null;
    carouselRef.current;
  };
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
    carouselRef.current.scrollLeft += distance * scrollDistance;
  };

  const movePrevious = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft -= distance * scrollDistance;
  };
  return { currentScroll, getCenter, scrollBy, carouselRef, moveNext, movePrevious };
};
