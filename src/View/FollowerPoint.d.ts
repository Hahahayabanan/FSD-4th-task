declare class FollowerPoint {
    elemHTMLElement: HTMLElement;
    thumbHTMLElement: HTMLElement;
    constructor(thumbHTML: HTMLElement);
    createTemplate(): void;
    setValue(value: number): void;
    destroy(): void;
}
export { FollowerPoint, };
export default FollowerPoint;
