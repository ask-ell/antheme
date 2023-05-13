import { ComponentTag, inject } from ".";
import CustomImage from "./custom-image";

export default class DomCacheService {
    private static instance: DomCacheService;
    private cacheDomElementTag = new ComponentTag('cache');
    private cache = inject(Window).document.createElement(this.cacheDomElementTag.toString());

    private constructor() {
        this.cache.style.position = "absolute";
        this.cache.style.zIndex = "-1000";
        this.cache.style.opacity = "0";
        inject(Window).document.body.appendChild(this.cache);
    }

    static getInstance() {
        if (!DomCacheService.instance) {
            DomCacheService.instance = new DomCacheService();
        }
        return DomCacheService.instance;
    }

    preloadImage({ src }: CustomImage) {
        return new Promise<void>((resolve, reject) => {
            const image = new Image()
            image.onload = () => {
                resolve();
            };
            image.onerror = reject
            image.src = src;
            this.cache.appendChild(image);
        });
    }
}