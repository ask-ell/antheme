import { decrypt, inject } from "../common";
import { CarouselLeftArrow, CarouselRightArrow } from "./arrows";
import _Image from "./image";
import { carouselComponentTag } from "./utils";

export default class Carousel extends HTMLElement {
    private index = 0;
    private images = new Array<_Image>();
    private imageDomElement = inject(Window).document.createElement('img');
    // private sourcesLoader: { [key: number]: _Image } = {};

    constructor() {
        super();
        this.appendChild(this.imageDomElement);
        this.classList.add(carouselComponentTag.toString());
        const encodedImages = this.getAttribute('images');
        if (!!encodedImages) {
            this.images = decrypt(encodedImages);
            this.run();
        }
    }

    private run() {
        const leftArrow = new CarouselLeftArrow(this);
        this.appendChild(leftArrow.element);
        leftArrow.element.addEventListener('click', () => {
            this.index = this.index === 0 ? this.images.length - 1 : this.index - 1;
            this.renderIndexedImage();
        });

        const rightArrow = new CarouselRightArrow(this);
        this.appendChild(rightArrow.element);
        rightArrow.element.addEventListener('click', () => {
            this.index = this.index === this.images.length - 1 ? 0 : this.index + 1;
            this.renderIndexedImage();
        });

        this.renderIndexedImage();
    }

    private renderIndexedImage() {
        let imageToLoad = this.images[this.index];
        this.imageDomElement.src = imageToLoad.src;
        // TODO: fetch prev
        // TODO: fetch next
    }
}