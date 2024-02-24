/* eslint-disable new-cap */
import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { DomCruise, DomCruiseContext } from '../../../modules/DomCruise';

const LinksDemo = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselContext, setCarouselContext] = useState<DomCruiseContext | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselContext(DomCruise(carouselRef.current, { gap: "100px" }));
    }
  }, []);

  const els = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className='carousel-wrapper'>
      <button className='arrow left' tabIndex={1} type="button" onClick={carouselContext?.previous}>
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
      <button className='arrow right' type="button" onClick={carouselContext?.next} tabIndex={2}>
        Right
      </button>
    </div >
  );
};



export default LinksDemo;
