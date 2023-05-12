export default class _Image {
    private src?: string | undefined = undefined;

    getSrc() {
        return this.src;
    }

    setSrc(src: string) {
        this.src = src;
        return this;
    }
}