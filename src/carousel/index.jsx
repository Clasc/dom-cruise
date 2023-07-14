import {useRef, useState} from 'react';
import './index.css';
const Carousel = ({children}) => {
  const [pos, setPos] = useState({x: null, y: null, left: null, top: null});
  const carouselRef = useRef(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const mouseUpHandler = () => setIsGrabbing(false);

  const mouseDownHandler = (e) => {
    setPos({
      // The current scroll
      left: carouselRef.current.scrollLeft,
      top: carouselRef.current.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    });
    setIsGrabbing(true);
  };

  const mouseMoveHandler = function(e) {
    if (!isGrabbing) return;
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;
    console.log(carouselRef.current);
    // Scroll the element
    carouselRef.current.scrollTop = pos.top - dy;
    carouselRef.current.scrollLeft = pos.left - dx;
  };

  return (
    <div>
      <ul
        onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}
        ref={carouselRef}
        onMouseMove={mouseMoveHandler}
        className="carousel"
        style={{cursor: isGrabbing && 'grab', scrollSnapType: isGrabbing && 'none'}}>
        {children.map((c) => <li className="carousel-element">{c}</li>)}
      </ul>
    </div>
  );
};

export default Carousel;
