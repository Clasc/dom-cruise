import React, { useMemo, useState } from 'react';
import './index.css';
import { pixel } from '../../utils/styler/pixel';
import { cssVar } from '../../utils/styler/cssVar';
import { classNames } from '../../utils/styler/classNames';
import { useCarousel } from '../../hooks/useCarousel';
import useDragToScroll from '../../hooks/useDragToScroll';


const defaultLables = { left: 'Left', right: 'Right' };

type CarouselProps = {
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
  const {
    currentScroll,
    scrollBy,
    carouselRef, moveNext,
    movePrevious, setScrollPos } = useCarousel();


  const [containerStyle, setContainerStyle] = useState({});

  const { mouseDownHandler, mouseMoveHandler, mouseUpHandler } = useDragToScroll({
    onMouseMove: scrollBy,
    onGrabChange: setContainerStyle,
    currentScroll
  });


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



export default Carousel;
