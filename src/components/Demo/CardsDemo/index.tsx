/* eslint-disable new-cap */
import React, { useEffect, useRef } from 'react';
import './index.css';
import { DomCruise } from '../../../modules/DomCruise';

const CardsDemo = () => {
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

            <div ref={carouselRef}>
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



export default CardsDemo;
