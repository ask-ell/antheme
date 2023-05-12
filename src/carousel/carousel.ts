import { decrypt } from "../common";
import { CarouselLeftArrow, CarouselRightArrow } from "./arrows";
import _Image from "./image";

export default class Carousel extends HTMLElement {
    private index = 0;
    private images = new Array<_Image>();
    private sourcesLoader: { [key: number]: HTMLImageElement | undefined } = {};

    constructor() {
        super();
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
        let imageSource = this.sourcesLoader[this.index];
        if (!imageSource) {
            imageSource = document.createElement('img');
            const image = this.images.find((_, index) => index === this.index);
            imageSource.src = image['src'];
            this.sourcesLoader[this.index] = imageSource;
        }

        this.appendChild(imageSource);

        // TODO: fetch prev
        // TODO: fetch next
    }
}