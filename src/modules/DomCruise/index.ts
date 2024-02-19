/* eslint-disable require-jsdoc */

import dragToScroll from "../dragToScroll";
import state from "../state";


export const DomCruise = (carousel: HTMLUListElement, { prev, next }: { prev: HTMLElement, next: HTMLElement }) => {
  const slides = carousel.children;
  const [scrollPos, setScrollPos] = state(0);

  const wholeWidth = carousel.scrollWidth ?? 0;
  const currentSlideWith = () => {
    const centeredSlide = Math.round(wholeWidth / scrollPos.ref);
    return (slides?.item(centeredSlide) as HTMLElement)?.offsetWidth ?? 0
  };

  next.addEventListener('click', () => {
    carousel.scrollLeft += currentSlideWith();
  });

  prev.addEventListener('click', () => {
    carousel.scrollLeft -= currentSlideWith();
  });

  carousel.addEventListener('scroll', (e) => {
    setScrollPos((e.currentTarget as any)?.scrollLeft ?? 0)
  });


  dragToScroll({
    el: carousel,
  });
};
