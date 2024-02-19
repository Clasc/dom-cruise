/* eslint-disable new-cap */
import React, { useEffect, useRef } from 'react';
import './index.css';
import { DomCruise } from '../../../modules/DomCruise';



const LinksDemo = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (carouselRef.current && prevRef.current && nextRef.current) {
      DomCruise(carouselRef.current, { prev: prevRef.current, next: nextRef.current, gap: "100px" });
    }
  }, []);

  const els = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className='carousel-wrapper'>
      <button className='arrow left' ref={prevRef} tabIndex={1}>
        Left
      </button >
      <div ref={carouselRef} className='carousel'>
        <div style={{ minWidth: 400, display: 'block', height: 300, background: 'orange' }} key="test">
          Test element
        </div>
        {els.map((e) => <a href="www.google.com" key={e}>
          <img src={`https://picsum.photos/seed/${e}/200`} />
        </a>)}
      </div>
      <button className='arrow right' ref={nextRef} tabIndex={2}>
        Right
      </button>
    </div >
  );
};



export default LinksDemo;
