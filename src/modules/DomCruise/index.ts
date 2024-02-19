import dragToScroll from "../dragToScroll";
import state from "../state";


export const DomCruise = (carousel: HTMLElement, options: { prev: HTMLElement, next: HTMLElement }) => {
  const { prev, next } = options;

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
    setCurrentScroll((e.currentTarget as any)?.scrollLeft ?? 0);
  });

  next.addEventListener('click', () => {
    carousel.scrollLeft += scrollDistance("forwards");
  });

  prev.addEventListener('click', () => {
    carousel.scrollLeft -= scrollDistance("backwards");
  });

  dragToScroll({
    el: carousel,
  });
};
