import React, { MouseEventHandler, useMemo, useRef, useState } from 'react';
import './index.css';

const classNames = (...classes: string[]) => classes.join(' ');
type StyleProp = { [key: string]: string | number };

const makeCssVariables = <TVars extends StyleProp>(style: TVars) => {
  const result: StyleProp = {};
  for (const key in style) {
    if (Object.prototype.hasOwnProperty(key)) {
      result[`--${key}`] = style[key];
    }
  }

  return result as {[Property in keyof TVars as `--${string & Property}`]: TVars[Property]};
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

  const scrollBy=({ x, y }:{ x: number, y: number })=>{
    if (!carouselRef.current) return;
    carouselRef.current.scrollTop = pos.top - y;
    carouselRef.current.scrollLeft = pos.left - x;
  };

  const mouseMoveHandler: MouseEventHandler<HTMLUListElement> = (e) => {
    if (!isGrabbing) return;
    e.preventDefault();

    const mouseMoveDistance = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };

    scrollBy(mouseMoveDistance);
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
  }, [slidesPerPage]);

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
