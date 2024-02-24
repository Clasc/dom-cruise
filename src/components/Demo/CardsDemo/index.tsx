/* eslint-disable new-cap */
import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { DomCruise, DomCruiseContext } from '../../../modules/DomCruise';

const text = "rem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque egestas diam in arcu cursus euismod quis viverra nibh. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Nec ultrices dui sapien eget mi proin sed. Auctor urna nunc id cursus metus. Est lorem ipsum dolor sit amet. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Id ornare arcu odio ut sem. Massa";

const Card = ({ seed }: { seed: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='card' onClick={() => setIsOpen(!isOpen)} style={{ maxHeight: isOpen ? "800px" : "200px" }}>
            <img src={`https://picsum.photos/seed/${seed}/200`} />
            {isOpen && <div className='card-content'>{text}</div>}
        </div>);
};

const CardsDemo = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [carouselContext, setCarouselContext] = useState<DomCruiseContext | null>(null);

    useEffect(() => {
        if (carouselRef.current) {
            setCarouselContext(DomCruise(carouselRef.current, { gap: "100px" }));
        }
    }, []);

    const els = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className='cards-demo'>
            <button className='cards-arrow' type="button" onClick={carouselContext?.previous} tabIndex={1}>
                Left
            </button >

            <div ref={carouselRef}>
                {els.map((e) => <Card seed={e} key={e} />)}
            </div>

            <button className='cards-arrow' type="button" onClick={carouselContext?.next} tabIndex={2}>
                Right
            </button>
        </div >
    );
};



export default CardsDemo;
