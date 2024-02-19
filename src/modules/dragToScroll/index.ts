import { cssVar } from "../../utils/styler/cssVar";
import toCss from "../../utils/styler/toCss";
import state from "../state";
const dragToScroll = ({ el }: {
    el: HTMLElement,
}) => {
    const [startX, setStartX] = state(0);
    const [scrollLeft, setScrollLeft] = state(0);

    const [isGrabbing, setIsGrabbing] = state(false, [(grabs) => {
        const cursor = grabs ? { cursor: 'grabbing' } : {};
        const snapping = grabs ? cssVar({ 'scroll-behaviour': 'none' }) : {};
        el.setAttribute('style', toCss({ ...cursor, ...snapping }));
    }]);

    el.addEventListener("mouseup", (e) => setIsGrabbing(false));
    el.addEventListener("mouseleave", (e) => setIsGrabbing(false));

    el.addEventListener("mousedown", (e) => {
        setIsGrabbing(true);
        setStartX(e.pageX - el.offsetLeft);
        setScrollLeft(el.scrollLeft);
    });

    el.addEventListener("mousemove", (e) => {
        if (!isGrabbing.ref) { return }
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walkX = (x - startX.ref);
        el.scrollLeft = scrollLeft.ref - walkX;
    });
}

export default dragToScroll;