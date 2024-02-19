/* eslint-disable new-cap */
import React, { useEffect, useMemo, useRef } from 'react';
import './index.css';
import { pixel } from '../../utils/styler/pixel';
import { cssVar } from '../../utils/styler/cssVar';
import { classNames } from '../../utils/styler/classNames';
import { DomCruise } from '../../modules/DomCruise';

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
  const carouselRef = useRef<HTMLUListElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (carouselRef.current && prevRef.current && nextRef.current) {
      DomCruise(carouselRef.current, { prev: prevRef.current, next: nextRef.current });
    }
  }, []);

  const keys = useMemo(() => slides?.map(s => Math.random()), [slides?.length]);

  return (
    <div className='carousel-wrapper' style={cssVar(
      { distance: pixel(distance), slideWidth: pixel(distance) },
    ) as React.CSSProperties}>

      <button className={classNames('arrow left', classNameLeftArrow)} ref={prevRef} tabIndex={1}>
        {labels.left}
      </button>

      <ul
        tabIndex={3}
        className={classNames('carousel', (noScrollBar ? 'hide-scrollbar' : ''))}
        ref={carouselRef}>
        {slides && keys &&
          slides?.map((s, idx) => <li key={keys[idx]}> {s} </li>)}
      </ul>
      <button className={classNames('arrow right', classNameRightArrow)} ref={nextRef} tabIndex={2}>
        {labels.right}
      </button>
    </div>
  );
};



export default Carousel;
