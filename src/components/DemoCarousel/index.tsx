/* eslint-disable new-cap */
import React, { useEffect, useRef } from 'react';
import './index.css';
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
  children?: React.ReactNode[]
};


const Carousel = ({
  labels = defaultLables,
  children
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (carouselRef.current && prevRef.current && nextRef.current) {
      DomCruise(carouselRef.current, { prev: prevRef.current, next: nextRef.current });
    }
  }, []);

  return (
    <div className='carousel-wrapper'>
      <button className={classNames('arrow left')} ref={prevRef} tabIndex={1}>
        {labels.left}
      </button >

      <div
        tabIndex={3}
        className={classNames('carousel')}
        ref={carouselRef}>
        {children}
      </div>
      <button className={classNames('arrow right')} ref={nextRef} tabIndex={2}>
        {labels.right}
      </button>
    </div >
  );
};



export default Carousel;
