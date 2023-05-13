import { inject } from "../../core";
import { carouselArrowComponentTag } from "../utils";

export default class CarouselArrow {
    public readonly element: HTMLSpanElement;

    constructor(symbol: string) {
        const element = inject(Window).document.createElement('span');
        element.innerText = symbol;
        element.classList.add(carouselArrowComponentTag.toString());
        this.element = element;
    }
}