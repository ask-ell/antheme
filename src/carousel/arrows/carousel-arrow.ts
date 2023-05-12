import { inject } from "../../common";

export default class CarouselArrow {
    public readonly element: HTMLSpanElement;

    constructor(symbol: string) {
        const element = inject(Window).document.createElement('span');
        element.innerText = symbol;
        element.classList.add('carousel-arrow');
        this.element = element;
    }
}