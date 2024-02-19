import state from "../state";

const dragToScroll = ({ el }: {
    el: HTMLElement,
}) => {
    const [startX, setStartX] = state(0);
    const [scrollLeft, setScrollLeft] = state(0);

    el.style.scrollSnapType = "mandatory";
    el.style.scrollBehavior = "smooth";

    const [isGrabbing, setIsGrabbing] = state(false, [(grabs) => {
        el.style.cursor = grabs ? 'grabbing' : "pointer";
        el.style.scrollBehavior = grabs ? 'unset' : "smooth";
    }]);

    el.addEventListener("mouseup", () => setIsGrabbing(false));
    el.addEventListener("mouseleave", () => setIsGrabbing(false));
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