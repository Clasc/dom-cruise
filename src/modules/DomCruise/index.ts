import dragToScroll from "../dragToScroll";
import state from "../state";


export type DomCruiseContext = { next: () => void, previous: () => void };

export const DomCruise = (carousel: HTMLElement): DomCruiseContext => {
  const slides = carousel.children;
  const [currentScroll, setCurrentScroll] = state(0);

  const scrollDistance = (nextSlide: "forwards" | "backwards") => {
    const carouselRect = carousel.getBoundingClientRect();
    const nextIndex = nextSlide === "forwards" ? 1 : -1;
    const slideOffsets = Array.from(slides).map(s => {
      return Math.abs((carouselRect.x - s.getBoundingClientRect().x) + currentScroll.ref);
    });

    const index = slideOffsets.indexOf(Math.min(...slideOffsets));
    const currentSlideWidth = (slides.item(index)?.clientWidth ?? 0);
    return currentSlideWidth + (slides.item(index + nextIndex)?.clientWidth ?? 0);
  };

  carousel.addEventListener('scrollend', (e) => {
    const scrollPos = (e.currentTarget as Element)?.scrollLeft ?? 0;
    setCurrentScroll(scrollPos);
  });

  const next = () => {
    console.log("next called");
    carousel.scrollLeft += scrollDistance("forwards");
  };

  const previous = () => {
    console.log("previous called");
    carousel.scrollLeft -= scrollDistance("backwards");
  };

  dragToScroll({
    el: carousel,
  });

  return { next, previous };
};
