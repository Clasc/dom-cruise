import dragToScroll from "../dragToScroll";
import state from "../state";

const styles: Partial<CSSStyleDeclaration> = {
  cursor: "grab",
  display: "flex",
  flexDirection: "row",
  overflowX: "scroll"
};

const setStyles = (el: HTMLElement, gap: string, showScrollBar = false) => {
  el.style.gap = gap;
  (el.style as any)["scrollbar-width"] = showScrollBar ? "unset" : "none";

  // eslint-disable-next-line guard-for-in
  for (const key in styles) {
    const val = styles[key]!;
    el.style[key] = val;
  }
}

export const DomCruise = (carousel: HTMLElement, options: { prev: HTMLElement, next: HTMLElement, gap: string }) => {
  const { prev, next, gap } = options;

  const slides = carousel.children;
  const [currentScroll, setCurrentScroll] = state(0);

  setStyles(carousel, gap);
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
