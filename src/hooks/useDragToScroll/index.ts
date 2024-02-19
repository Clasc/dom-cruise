import { useState, MouseEventHandler, useEffect } from "react";
import { cssVar } from "../../utils/styler/cssVar";
type NativeMouseEventListener = (this: Document, ev: MouseEvent) => unknown;

const useDragToScroll = ({ onMouseMove, onGrabChange, currentScroll }: {
    onMouseMove: (distance: { x: number, y: number }, pos: { top: number, left: number, x: number, y: number }) => void,
    onGrabChange: (style: Record<string, unknown>) => void,
    currentScroll: () => { left: number, top: number }
}) => {
    const [pos, setPos] = useState<{ x: number, y: number, left: number, top: number }>({ x: 0, y: 0, left: 0, top: 0 });
    const [isGrabbing, setIsGrabbing] = useState(false);

    const mousePos = (e: { clientX: number, clientY: number }) => ({
        x: e.clientX,
        y: e.clientY,
    });


    const mouseUpHandler: MouseEventHandler<HTMLUListElement> = (e) => {
        e.preventDefault();
        setIsGrabbing(false);
        document.removeEventListener('mouseup', mouseUpHandler as unknown as NativeMouseEventListener);
    };

    const mouseDownHandler: MouseEventHandler<HTMLUListElement> = (e) => {
        e.preventDefault();
        setPos({
            ...currentScroll(),
            ...mousePos(e),
        });
        setIsGrabbing(true);
        document.addEventListener('mouseup', mouseUpHandler as unknown as NativeMouseEventListener);
    };


    const mouseMoveHandler: MouseEventHandler<HTMLUListElement> = (e) => {
        if (!isGrabbing) return;
        e.preventDefault();

        const mouseMoveDistance = {
            x: e.clientX - pos.x,
            y: e.clientY - pos.y,
        };

        onMouseMove(mouseMoveDistance, pos)
    };

    useEffect(() => {
        const cursor = isGrabbing ? { cursor: 'grabbing' } : {};
        const snapping = isGrabbing ? cssVar({ 'scroll-behaviour': 'none' }) : {};
        const res = { ...cursor, ...snapping };
        onGrabChange(res);
    }, [isGrabbing]);
    return { mouseDownHandler, mouseMoveHandler, mouseUpHandler }
}

export default useDragToScroll;