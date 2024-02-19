import React, { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import './index.css';
import { pixel } from '../../utils/styler/pixel';
import { cssVar } from '../../utils/styler/cssVar';
import { classNames } from '../../utils/styler/classNames';
import { useCarousel } from '../../hooks/useCarousel';

type NativeMouseEventListener = (this: Document, ev: MouseEvent) => unknown;

type CarouselProps = {
  children: undefined | null,
  labels?: { left: string, right: string },
  distance?: number,
  noScrollBar?: boolean,
  slidesPerPage?: number,
  scrollDistance?: number,
  classNameLeftArrow?: string,
  classNameRightArrow?: string
  slides?: React.ReactNode[]
};

const Carousel = ({
  labels = defaultLables,
  classNameLeftArrow = '',
  classNameRightArrow = '',
  distance = 20,
  noScrollBar = false,
  slides
}: CarouselProps) => {
  const [pos, setPos] = useState<{ x: number, y: number, left: number, top: number }>({ x: 0, y: 0, left: 0, top: 0 });

  const [isGrabbing, setIsGrabbing] = useState(false);

  const mouseUpHandler: MouseEventHandler<HTMLUListElement> = (e) => {
    e.preventDefault();
    setIsGrabbing(false);
    document.removeEventListener('mouseup', mouseUpHandler as unknown as NativeMouseEventListener);
  };

  const mousePos = (e: { clientX: number, clientY: number }) => ({
    x: e.clientX,
    y: e.clientY,
  });

  const {
    currentScroll,
    scrollBy,
    carouselRef, moveNext,
    movePrevious, setScrollPos } = useCarousel();

  const mouseDownHandler: MouseEventHandler<HTMLUListElement> = (e) => {
    e.preventDefault();
    setPos({
      ...currentScroll(),
      ...mousePos(e),
    });
    setIsGrabbing(true);
    document.addEventListener('mouseup', mouseUpHandler as unknown as NativeMouseEventListener);
  };


  const mouseMoveHandler: MouseEventHandler<HTMLUListElement> = (e) => {
    if (!isGrabbing) return;
    e.preventDefault();

    const mouseMoveDistance = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };

    scrollBy(mouseMoveDistance, pos);
  };


  const [containerStyle, setContainerStyle] = useState({});
  useEffect(() => {
    const cursor = isGrabbing ? { cursor: 'grabbing' } : {};
    const snapping = isGrabbing ? cssVar({ 'scroll-behaviour': 'none' }) : {};
    const res = { ...cursor, ...snapping };
    setContainerStyle(res);
  }, [isGrabbing]);
  const keys = useMemo(() => slides?.map(s => Math.random()), [slides?.length]);
  return (
    <div className='carousel-wrapper' style={cssVar(
      { distance: pixel(distance), slideWidth: pixel(distance) },
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
        onScroll={(e) => setScrollPos(e.currentTarget.scrollLeft)}
        style={containerStyle}>
        {slides && keys &&
          slides?.map((s, idx) => <li key={keys[idx]}> {s} </li>)}
      </ul>
      <button className={classNames('arrow right', classNameRightArrow)} onClick={moveNext} tabIndex={2}>
        {labels.right}
      </button>
    </div>
  );
};


const defaultLables = { left: 'Left', right: 'Right' };

export default Carousel;
