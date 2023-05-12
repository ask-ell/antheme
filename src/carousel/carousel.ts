import { decrypt, inject } from "../common";
import { CarouselLeftArrow, CarouselRightArrow } from "./arrows";
import DomCacheService from "./dom-cache-service";
import _Image from "./image";
import { carouselComponentTag, carouselImageContainerComponentTag } from "./utils";

const hiddenElementClass = `${carouselImageContainerComponentTag.toString()}-hidden`;
const fromMiddleToLeftAnimationClass = `${carouselImageContainerComponentTag.toString()}-from-middle-to-left`;
const fromMiddleToRightAnimationClass = `${carouselImageContainerComponentTag.toString()}-from-middle-to-right`;
const fromLeftToMiddleAnimationClass = `${carouselImageContainerComponentTag.toString()}-from-left-to-middle`;
const fromRightToMiddleAnimationClass = `${carouselImageContainerComponentTag.toString()}-from-right-to-middle`;

export default class Carousel extends HTMLElement {
    private currentIndex = 0;
    private previousIndex = this.currentIndex + 1;
    private imageContainers = new Array<HTMLDivElement>();
    private timeOut?: NodeJS.Timeout;

    constructor() {
        super();
        this.classList.add(carouselComponentTag.toString());

        const encodedImages = this.getAttribute('images');
        if (!!encodedImages) {
            const images = decrypt<Array<_Image>>(encodedImages);
            this.createImageContainers(images);
        }
    }

    private createImageContainers(images: Array<_Image>) {
        const imagesPreloaders = new Array<Promise<unknown>>();
        const domCacheService = DomCacheService.getInstance();

        images.forEach((image, index) => {
            const imageContainer = inject(Window).document.createElement('div');
            imageContainer.classList.add(carouselImageContainerComponentTag.toString());
            if (index != this.currentIndex) {
                imageContainer.classList.add(hiddenElementClass);
            }
            imageContainer.style.backgroundImage = `url("${image.src}")`

            this.imageContainers.push(imageContainer);
            this.appendChild(imageContainer);

            imagesPreloaders.push(domCacheService.preloadImage(image).catch(() => {
                this.imageContainers[index].innerText = "Error: unreachable resource"
            }));
        });

        Promise.all(imagesPreloaders);

        if (this.imageContainers.length > 1) {
            this.createArrows();
        }
    }

    private createArrows() {
        const leftArrow = new CarouselLeftArrow(this);
        this.appendChild(leftArrow.element);
        leftArrow.element.addEventListener('click', () => {
            if (this.timeOut) {
                return;
            }
            this.setCurrentIndex(this.currentIndex === 0 ? this.imageContainers.length - 1 : this.currentIndex - 1);
        });

        const rightArrow = new CarouselRightArrow(this);
        this.appendChild(rightArrow.element);
        rightArrow.element.addEventListener('click', () => {
            if (this.timeOut) {
                return;
            }
            this.setCurrentIndex(this.currentIndex === this.imageContainers.length - 1 ? 0 : this.currentIndex + 1);
        });
    }

    private setCurrentIndex(currentIndex: number) {
        this.previousIndex = this.currentIndex;
        this.currentIndex = currentIndex;
        this.runAnimations();
    }

    private runAnimations() {
        this.imageContainers[this.currentIndex].classList.remove(hiddenElementClass);
        const isToTheRight = this.currentIndex === this.previousIndex + 1 || this.currentIndex === 0 && this.previousIndex === this.imageContainers.length - 1;

        const previousImageContainerClass = isToTheRight ? fromMiddleToLeftAnimationClass : fromMiddleToRightAnimationClass;
        this.imageContainers[this.previousIndex].classList.add(previousImageContainerClass);

        const currentImageContainerClass = isToTheRight ? fromRightToMiddleAnimationClass : fromLeftToMiddleAnimationClass;
        this.imageContainers[this.currentIndex].classList.add(currentImageContainerClass);

        this.timeOut = setTimeout(() => {
            this.imageContainers[this.previousIndex].classList.remove(previousImageContainerClass);
            this.imageContainers[this.previousIndex].classList.add(hiddenElementClass);

            this.imageContainers[this.currentIndex].classList.remove(currentImageContainerClass)

            clearTimeout(this.timeOut);
            this.timeOut = undefined;
        }, 500);
    }
}