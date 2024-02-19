import { cssVar } from "../../utils/styler/cssVar";
import state from "../state";

const dragToScroll = ({ el, onMouseMove, onGrabChange, currentScroll }: {
    el: HTMLElement,
    onMouseMove: (distance: { x: number, y: number }, pos: { top: number, left: number, x: number, y: number }) => void,
    onGrabChange: (style: Record<string, unknown>) => void,
    currentScroll: () => { left: number, top: number }
}) => {

    const [pos, setPos] = state<{ x: number, y: number, left: number, top: number }>({ x: 0, y: 0, left: 0, top: 0 });

    const [isGrabbing, setIsGrabbing] = state(false, [(s) => {
        const cursor = s ? { cursor: 'grabbing' } : {};
        const snapping = s ? cssVar({ 'scroll-behaviour': 'none' }) : {};
        const res = { ...cursor, ...snapping };
        onGrabChange(res);
    }]);

    const mousePos = (e: { clientX: number, clientY: number }) => ({
        x: e.clientX,
        y: e.clientY,
    });


    el.addEventListener('mouseup', (e) => {
        e.preventDefault();
        setIsGrabbing(false);
    });

    el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        setPos({
            ...currentScroll(),
            ...mousePos(e),
        });
        setIsGrabbing(true);
    });


    el.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if (!isGrabbing) return;

        const mouseMoveDistance = {
            x: e.clientX - pos.ref.x,
            y: e.clientY - pos.ref.y,
        };

        onMouseMove(mouseMoveDistance, pos.ref)
    });
}

export default dragToScroll;