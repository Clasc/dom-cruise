import React, { MouseEventHandler, useRef, useState } from 'react';
import './index.css';
const classNames = (...classes: string[]) => classes.join(' ');

type CarouselProps = {
  children: React.ReactNode[],
  left: number, right: number,
  distance?: number,
  noScrollBar?: boolean,
  scrollDistance?: number,
};
const Carousel = ({
  children,
  left,
  right,
  distance = 20,
  noScrollBar = false,
  scrollDistance = 2,
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


  const mouseMoveHandler: MouseEventHandler<HTMLUListElement> = (e) => {
    if (!isGrabbing || !carouselRef.current) return;
    e.preventDefault();
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    carouselRef.current.scrollTop = pos.top - dy;
    carouselRef.current.scrollLeft = pos.left - dx;
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

  return (
    <div className='carousel-wrapper' style={{ '--distance': `${distance}px`, '--slideWidth': `${distance}px` } as any}>
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
        {children.map((c, i) => <li key={i} className="carousel-element">{c}</li>)}
      </ul>
      <div className='arrow right' onClick={moveNext}>{right}</div>
    </div>
  );
};

export default Carousel;
