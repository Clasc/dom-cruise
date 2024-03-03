import { StateMachine } from "../StateMachine";

const dragToScroll = ({ el }: {
    el: HTMLElement,
}) => {
    const startX = new StateMachine(0);
    const scrollLeft = new StateMachine(0);

    el.style.scrollSnapType = "mandatory";
    el.style.scrollBehavior = "smooth";

    const isGrabbing = new StateMachine(false);

    isGrabbing.onChange((newVal) => {
        el.style.cursor = newVal ? 'grabbing' : "pointer";
        el.style.scrollBehavior = newVal ? 'unset' : "smooth";
    });

    el.addEventListener("mouseup", () => isGrabbing.mutate(false));
    el.addEventListener("mouseleave", () => isGrabbing.mutate(false));
    el.addEventListener("mousedown", (e) => {
        isGrabbing.mutate(true);
        startX.mutate(e.pageX - el.offsetLeft);
        scrollLeft.mutate(el.scrollLeft);
    });

    el.addEventListener("mousemove", (e) => {
        if (!isGrabbing.state) return
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walkX = (x - startX.state);
        el.scrollLeft = scrollLeft.state - walkX;
    });
}

export default dragToScroll;