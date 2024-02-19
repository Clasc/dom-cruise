/* eslint-disable require-jsdoc */

import dragToScroll from "../dragToScroll";
import state from "../state";

function toCss(style: Record<string, unknown>) {
  return Object.keys(style).map(key => `${key}:${style[key]}`).join(";\n")
}

export const DomCruise = (carousel: HTMLUListElement, { prev, next }: { prev: HTMLElement, next: HTMLElement }) => {
  const slides = carousel.children;
  const [scrollPos, setScrollPos] = state(0);

  const currentScroll = () => ({
    left: carousel.scrollLeft ?? 0,
    top: carousel.scrollTop ?? 0,
  });

  const scrollBy = ({ x, y }: { x: number, y: number }, pos: { top: number, left: number }) => {
    carousel.scrollTop = pos.top - y;
    carousel.scrollLeft = pos.left - x;
  };

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [style, setStyle] = state({}, [(s) => carousel.setAttribute('style', toCss(s))]);

  dragToScroll({
    el: carousel,
    onMouseMove: scrollBy,
    onGrabChange: setStyle,
    currentScroll
  });
};
