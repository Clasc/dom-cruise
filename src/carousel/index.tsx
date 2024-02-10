import React, { MouseEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
import { pixel } from '../utils/styler/pixel';
import { cssVar } from '../utils/styler/cssVar';
import { classNames } from '../utils/styler/classNames';


type CarouselProps = {
  children: React.ReactNode[],
  labels?:{left:string, right:string},
  distance?: number,
  noScrollBar?: boolean,
  slidesPerPage?: number,
  scrollDistance?: number,
  classNameLeftArrow?:string,
  classNameRightArrow?:string
};

const Carousel = ({
  children,
  labels=defaultLables,
  classNameLeftArrow='',
  classNameRightArrow='',
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

  const currentScroll = ()=>({
    left: carouselRef.current?.scrollLeft ?? 0,
    top: carouselRef.current?.scrollTop ?? 0,
  });

  const mousePos=(e:{clientX:number, clientY:number})=>({
    x: e.clientX,
    y: e.clientY,
  });

  const mouseDownHandler: MouseEventHandler<HTMLUListElement> = (e) => {
    e.preventDefault();
    setPos({
      ...currentScroll(),
      ...mousePos(e),
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

  const [containerStyle, setContainerStyle] = useState({});
  useEffect(()=>{
    const cursor = isGrabbing ? { cursor: 'grabbing' }:{};
    const snapping = isGrabbing? cssVar({ 'scroll-snap': 'none', 'scroll-behaviour': 'none' }):{};
    const res = { ...cursor, ...snapping };
    setContainerStyle(res );
  }, [isGrabbing]);


  const carouselWidth = useMemo(() => {
    if (!carouselRef.current) return { slideWith: 0 };
    return { slideWith: pixel(carouselRef.current.clientWidth / slidesPerPage) };
  }, [slidesPerPage]);

  return (
    <div className='carousel-wrapper' style={cssVar(
        { distance: pixel(distance), slideWidth: pixel(distance), ...carouselWidth },
    ) as React.CSSProperties}>

      <button className={classNames('arrow left', classNameLeftArrow)} onClick={movePrevious} tabIndex={1}>
        {labels.left}
      </button>

      <ul
        tabIndex={3}
        className={classNames('carousel', (noScrollBar ? 'hide-scrollbar' : ''))}
        ref={carouselRef}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
        style={containerStyle}>
        {children}
      </ul>
      <button className={classNames('arrow right', classNameRightArrow )} onClick={moveNext} tabIndex={2}>
        {labels.right}
      </button>
    </div>
  );
};


const defaultLables = { left: 'Left', right: 'Right' };

export default Carousel;
