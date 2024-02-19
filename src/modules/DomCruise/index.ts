import dragToScroll from "../dragToScroll";
import state from "../state";


export const DomCruise = (carousel: HTMLUListElement, options: { prev: HTMLElement, next: HTMLElement }) => {
  const { prev, next } = options;

  const slides = carousel.children;
  const [currentScroll, setCurrentScroll] = state(0);

  const currentSlideWidth = () => {
    const carouselRect = carousel.getBoundingClientRect();
    const slideOffsets = Array.from(slides).map(s => {
      return Math.abs((carouselRect.x - s.getBoundingClientRect().x) + currentScroll.ref);
    });
    const index = slideOffsets.indexOf(Math.min(...slideOffsets));
    return slides.item(index)?.clientWidth ?? 0;
  };

  carousel.addEventListener('scrollend', (e) => {
    setCurrentScroll((e.currentTarget as any)?.scrollLeft ?? 0);
  });

  next.addEventListener('click', () => {
    carousel.scrollLeft += currentSlideWidth();
  });

  prev.addEventListener('click', () => {
    carousel.scrollLeft -= currentSlideWidth();
  });

  dragToScroll({
    el: carousel,
  });
};
