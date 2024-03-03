import dragToScroll from "../dragToScroll";
import { StateMachine } from "../StateMachine";


export type DomCruiseContext = { next: () => void, previous: () => void };
export type DomCruiseOptions = { gap: number };

export const DomCruise = (carousel: HTMLElement, options: DomCruiseOptions = { gap: 20 }): DomCruiseContext => {
  const slides = carousel.children;
  const currentScroll = new StateMachine(0);

  const { gap } = options;
  carousel.style.setProperty("--gap", `${gap}px`);

  const scrollDistance = (nextSlide: "forwards" | "backwards") => {
    const carouselRect = carousel.getBoundingClientRect();
    const nextIndex = nextSlide === "forwards" ? 1 : -1;
    const slideOffsets = Array.from(slides).map(s => Math.abs((carouselRect.x - s.getBoundingClientRect().x) + currentScroll.state));
    const index = slideOffsets.indexOf(Math.min(...slideOffsets));
    const currentSlideWidth = (slides.item(index)?.clientWidth ?? 0);
    return currentSlideWidth + (slides.item(index + nextIndex)?.clientWidth ?? 0);
  };

  carousel.addEventListener('scrollend', (e) => {
    const scrollPos = (e.currentTarget as Element)?.scrollLeft ?? 0;
    currentScroll.mutate(scrollPos);
  });


  const next = () => carousel.scrollLeft += scrollDistance("forwards");
  const previous = () => carousel.scrollLeft -= scrollDistance("backwards");

  dragToScroll({
    el: carousel,
  });

  return { next, previous };
};
