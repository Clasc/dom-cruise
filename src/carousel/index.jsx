import { useRef, useState } from 'react';
import './index.css';
const Carousel = ({ children }) => {
  const [pos, setPos] = useState({ x: null, y: null, left: null, top: null });
  const carouselRef = useRef(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const mouseUpHandler = function() {
    setIsGrabbing(false), document.removeEventListener('mouseup', mouseUpHandler);
  };

  /**
   *
   * @param {Event} e
   */
  const mouseDownHandler = (e) => {
    e.preventDefault();
    setPos({
      // The current scroll
      left: carouselRef.current.scrollLeft,
      top: carouselRef.current.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    });
    setIsGrabbing(true);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  /**
   *
   * @param {Event} e
   */
  const mouseMoveHandler = function(e) {
    if (!isGrabbing) return;
    e.preventDefault();
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;
    console.log(carouselRef.current);
    // Scroll the element
    carouselRef.current.scrollTop = pos.top - dy;
    carouselRef.current.scrollLeft = pos.left - dx;
  };

  const getContainerStyle = ()=>(isGrabbing ? { cursor: 'grab', scrollSnapType: 'none', scrollBehavior: 'smooth' }:{});

  return (
    <div>
      <ul
        onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}
        ref={carouselRef}
        onMouseMove={mouseMoveHandler}
        className="carousel"
        style={getContainerStyle()}>
        {children.map((c, i) => <li key={i} className="carousel-element">{c}</li>)}
      </ul>
    </div>
  );
};

export default Carousel;
