import { StateMachine } from "../StateMachine";


const dragToScroll = ({ el }: {
    el: HTMLElement,
}) => {
    el.style.scrollSnapType = "mandatory";
    el.style.scrollBehavior = "smooth";



    const scrollLeft = new StateMachine(0);
    const startX = new StateMachine(0);
    const mousePos = (e: MouseEvent) => e.pageX - el.offsetLeft;
    el.addEventListener("mousedown", (e) => {
        isGrabbing.mutate(true);
        startX.mutate(mousePos(e));
        scrollLeft.mutate(el.scrollLeft);
    });

    el.addEventListener("mousemove", (e) => {
        if (!isGrabbing.state) return
        e.preventDefault();
        velocity.mutate(mousePos(e) - startX.state);
        el.scrollLeft = scrollLeft.state - velocity.state;
    });

    const isGrabbing = new StateMachine(false);
    const velocity = new StateMachine(0);
    isGrabbing.onChange((grabbing) => {
        if (grabbing) {
            el.style.cursor = 'grabbing';
            el.style.scrollBehavior = 'unset';
            return;
        }

        el.style.cursor = "pointer";
        el.style.scrollBehavior = "smooth";

    });

    const endDrag = () => {
        isGrabbing.mutate(false);
        const lastVelocity = velocity.state
        velocity.mutate(0);
        requestAnimationFrame(() => {
            el.scrollLeft -= lastVelocity;
        });
    };

    el.addEventListener("mouseup", endDrag);
    el.addEventListener("mouseleave", endDrag);


}

export default dragToScroll;