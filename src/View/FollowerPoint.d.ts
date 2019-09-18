declare class FollowerPoint {
    elemHTMLElement: any;
    isVertical: boolean;
    thumbHTMLElement: any;
    constructor(thumbHTML: any, isVertical: boolean);
    createTemplate(): void;
    setValue(value: number): void;
    destroy(): void;
}
export { FollowerPoint, };
export default FollowerPoint;
