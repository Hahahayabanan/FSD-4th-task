declare class FollowerPoint {
    elemHTMLElement: HTMLElement;
    isVertical: boolean;
    thumbHTMLElement: HTMLElement;
    constructor(thumbHTML: HTMLElement, isVertical: boolean);
    createTemplate(): void;
    setValue(value: number): void;
    destroy(): void;
}
export { FollowerPoint, };
export default FollowerPoint;
