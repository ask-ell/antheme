import { encrypt, wait } from "../core";
import importCarouselComponent from "./bootstrap";
import Carousel from "./carousel";
import { imagesMock } from "./carousel.mock";
import { ShiftAnimationDirection } from "./types";
import { carouselArrowComponentTag, carouselImageContainerComponentTag } from "./utils";

describe(Carousel.name, () => {
    let carousel: Carousel;

    beforeAll(() => {
        importCarouselComponent();
        carousel = new Carousel();
    });

    describe('Without images', () => {
        it('Should arrows be hidden', () => {
            const arrows = carousel.findElementsByComponentTag(carouselArrowComponentTag);
            expect(arrows.length).toBe(0);
        });
    });

    describe('With one image', () => {
        beforeAll(() => {
            carousel.setAttribute('images', encrypt([imagesMock[0]]));
            carousel.onChanges();
        });

        it('Should arrows be hidden', () => {
            const arrows = carousel.findElementsByComponentTag(carouselArrowComponentTag);
            expect(arrows.length).toBe(0);
        });
    });

    describe(`With images`, () => {
        let arrows: NodeListOf<HTMLElement>;

        beforeAll(() => {
            carousel.setAttribute('images', encrypt(imagesMock));
            carousel.onChanges();
            arrows = carousel.findElementsByComponentTag(carouselArrowComponentTag);
        });

        it('Should arrows be visible', () => {
            expect(arrows.length).toBe(2);
        });

        it('Should images be loaded', () => {
            const imageContainers = carousel.findElementsByComponentTag(carouselImageContainerComponentTag);
            expect(imageContainers.length).toBe(imagesMock.length);
        });

        describe('When user clicks on the right arrow', () => {
            beforeAll(async () => {
                arrows[1].click();
                await wait(Carousel.shiftAnimationDuration);
            });

            it('Should load next loaded image', () => {
                expect(carousel.getPreviousIndex()).toBe(0);
                expect(carousel.getCurrentIndex()).toBe(1);
                expect(carousel.getLastShiftAnimationDirection()).toBe(ShiftAnimationDirection.LEFT);
            });
        });

        describe('When user clicks on the left arrow', () => {
            beforeAll(async () => {
                arrows[0].click();
                await wait(Carousel.shiftAnimationDuration);
            });

            it('Should load first image', () => {
                expect(carousel.getPreviousIndex()).toBe(1);
                expect(carousel.getCurrentIndex()).toBe(0);
                expect(carousel.getLastShiftAnimationDirection()).toBe(ShiftAnimationDirection.RIGHT);
            });
        });

        describe('When user clicks on the left arrow from the first position', () => {
            beforeAll(async () => {
                arrows[0].click();
                await wait(Carousel.shiftAnimationDuration);
            });

            it('Should load next loaded image', () => {
                expect(carousel.getPreviousIndex()).toBe(0);
                expect(carousel.getCurrentIndex()).toBe(imagesMock.length - 1);
                expect(carousel.getLastShiftAnimationDirection()).toBe(ShiftAnimationDirection.RIGHT);
            });
        });

        describe('When user clicks on the right arrow from the last position', () => {
            beforeAll(async () => {
                arrows[1].click();
                await wait(Carousel.shiftAnimationDuration);
            });

            it('Should load first image', () => {
                expect(carousel.getPreviousIndex()).toBe(imagesMock.length - 1);
                expect(carousel.getCurrentIndex()).toBe(0);
                expect(carousel.getLastShiftAnimationDirection()).toBe(ShiftAnimationDirection.LEFT);
            });
        });

        describe('With 2 images', () => {
            beforeAll(() => {
                carousel.setAttribute('images', encrypt([imagesMock[0], imagesMock[1]]));
                carousel.onChanges();
                arrows = carousel.findElementsByComponentTag(carouselArrowComponentTag);
            });

            describe('When user clicks on the right arrow', () => {
                beforeAll(async () => {
                    arrows[1].click();
                    await wait(Carousel.shiftAnimationDuration);
                });

                it('Should load second image', () => {
                    expect(carousel.getPreviousIndex()).toBe(0);
                    expect(carousel.getCurrentIndex()).toBe(1);
                    expect(carousel.getLastShiftAnimationDirection()).toBe(ShiftAnimationDirection.LEFT);
                });
            });

            describe('When user clicks on the left arrow', () => {
                beforeAll(async () => {
                    arrows[0].click();
                    await wait(Carousel.shiftAnimationDuration);
                });

                it('Should load first image', () => {
                    expect(carousel.getPreviousIndex()).toBe(1);
                    expect(carousel.getCurrentIndex()).toBe(0);
                    expect(carousel.getLastShiftAnimationDirection()).toBe(ShiftAnimationDirection.RIGHT);
                });
            });

            describe('When user clicks on the left arrow from the first position', () => {
                beforeAll(async () => {
                    arrows[0].click();
                    await wait(Carousel.shiftAnimationDuration);
                });

                it('Should load second image', () => {
                    expect(carousel.getPreviousIndex()).toBe(0);
                    expect(carousel.getCurrentIndex()).toBe(1);
                    expect(carousel.getLastShiftAnimationDirection()).toBe(ShiftAnimationDirection.RIGHT);
                });
            });

            describe('When user clicks on the right arrow from the last position', () => {
                beforeAll(async () => {
                    arrows[1].click();
                    await wait(Carousel.shiftAnimationDuration);
                });

                it('Should load first image', () => {
                    expect(carousel.getPreviousIndex()).toBe(1);
                    expect(carousel.getCurrentIndex()).toBe(0);
                    expect(carousel.getLastShiftAnimationDirection()).toBe(ShiftAnimationDirection.LEFT);
                });
            });
        })
    });
});