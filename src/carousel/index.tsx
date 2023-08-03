import React, { MouseEventHandler, StyleHTMLAttributes, useMemo, useRef, useState } from 'react';
import './index.css';
const classNames = (...classes: string[]) => classes.join(' ');


type StyleProp = { [key: string]: string | number };
type StyleVariable<TVar extends string> = `--${TVar}`;

// makeCssVariables takes an object and returns the same object but with the keys prefixed with '--'
const makeCssVariables = <TVars extends StyleProp>(style: TVars) => {
  const result: StyleProp = {};
  for (const key in style) {
    if (Object.prototype.hasOwnProperty(key)) {
      result[`--${key}`] = style[key];
    }
  }

  return result as Record<StyleVariable<Exclude<keyof TVars, symbol|number>>, TVars[string]>;
};

type Pixel<TVal extends number | string> = `${TVal}px`;
const pixel: <TVal extends string | number>(val: TVal) => Pixel<TVal> = (val) => `${val}px`;

type CarouselProps = {
  children: React.ReactNode[],
  left: number, right: number,
  distance?: number,
  noScrollBar?: boolean,
  slidesPerPage?: number,
  scrollDistance?: number,
};

const Carousel = ({
  children,
  left,
  right,
  distance = 20,
  noScrollBar = false,
  scrollDistance = 2,
  slidesPerPage = 1,
}: CarouselProps) => {
  const [pos, setPos] = useState<{ x: number, y: number, left: number, top: number }>({ x: 0, y: 0, left: 0, top: 0 });
  const carouselRef = useRef<HTMLUListElement>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const mouseUpHandler = function() {
    setIsGrabbing(false), document.removeEventListener('mouseup', mouseUpHandler);
  };

  const mouseDownHandler: MouseEventHandler<HTMLUListElement> = (e) => {
    e.preventDefault();
    setPos({
      // The current scroll
      left: carouselRef.current?.scrollLeft ?? 0,
      top: carouselRef.current?.scrollTop ?? 0,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    });
    setIsGrabbing(true);
    document.addEventListener('mouseup', mouseUpHandler);
  };


  const mouseMoveHandler: MouseEventHandler<HTMLUListElement> = (e) => {
    if (!isGrabbing || !carouselRef.current) return;
    e.preventDefault();
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    carouselRef.current.scrollTop = pos.top - dy;
    carouselRef.current.scrollLeft = pos.left - dx;
  };

  const moveNext = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft += distance * scrollDistance;
  };

  const movePrevious = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft -= distance * scrollDistance;
  };

  const getContainerStyle = () => (isGrabbing ? { cursor: 'grabbing' } : {});
  const carouselWidth = useMemo(() => {
    if (!carouselRef.current) return { slideWith: 0 };
    return { slideWith: pixel(carouselRef.current.clientWidth / slidesPerPage) };
  }
  , [slidesPerPage]);

  return (
    <div className='carousel-wrapper' style={makeCssVariables(
        { distance: pixel(distance), slideWidth: pixel(distance), ...carouselWidth },
    ) as React.CSSProperties}>
      <div className='arrow left' onClick={movePrevious}>
        {left}
      </div>
      <ul
        className={classNames('carousel', (noScrollBar ? 'hide-scrollbar' : ''))}
        ref={carouselRef}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        style={getContainerStyle()}>
        {children}
      </ul>
      <div className='arrow right' onClick={moveNext}>{right}</div>
    </div>
  );
};

export default Carousel;
