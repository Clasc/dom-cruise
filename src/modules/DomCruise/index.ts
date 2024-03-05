import dragToScroll from "../dragToScroll";

export type DomCruiseContext = { next: () => void, previous: () => void };
export type DomCruiseOptions = { gap?: number, scrollFactor?: number, onScroll?: (percentage: number) => void };
const defaultOptions: Required<DomCruiseOptions> = { gap: 20, scrollFactor: 1, onScroll: () => null };

export const DomCruise = (carousel: HTMLElement, options: DomCruiseOptions = defaultOptions): DomCruiseContext => {
  const { gap, scrollFactor, onScroll } = { ...defaultOptions, ...options };
  carousel.style.setProperty("--gap", `${gap}px`);

  const scrollDistance = () => {
    return carousel.getBoundingClientRect().width * scrollFactor + gap;
  };

  const percentage = () => ((carousel.scrollLeft + carousel.getBoundingClientRect().width) / carousel.scrollWidth) * 100;
  carousel.addEventListener("scrollend", () => {
    onScroll(percentage());
  });

  const next = () => carousel.scrollLeft += scrollDistance();
  const previous = () => carousel.scrollLeft -= scrollDistance();

  dragToScroll({
    el: carousel
  });

  return { next, previous };
};
