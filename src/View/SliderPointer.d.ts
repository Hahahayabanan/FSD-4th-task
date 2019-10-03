import { FollowerPoint } from './FollowerPoint';
declare class SliderPointer {
    thumbHTMLElem: HTMLElement;
    sliderHTMLElem: HTMLElement;
    curPos: number;
    isVertical: boolean;
    followerPoint: FollowerPoint;
    anotherPointer: SliderPointer;
    mouseMoveParameters: {
        rightEdge: number;
        leftEdge: number;
        mouseX: number;
        mouseY: number;
    };
    endPos: number;
    constructor(elemHTML: HTMLElement, sliderHTML: HTMLElement, isVertical: boolean);
    setCurPosInPercents(newCurrPos: number): void;
    setCurPosInPixels(newCurrPos: number): void;
    getCurPosInPixels(): number;
    bindEventListeners(anotherPoint?: SliderPointer): void;
    mouseDown: (event: any) => void;
    mouseUp: () => void;
    mouseMove: (event: any) => void;
    calcMoveBorders(event: any): {
        rightEdge: number;
        leftEdge: number;
        mouseX: any;
        mouseY: any;
    };
    getPathLength(): number;
    calcPixelsToPercents(valueInPixels: number): number;
    calcPercentsToPixels(valueInPercents: number): number;
    renderCurrentPosInPixels(newPos: number): string;
    renderCurrentPosInPercents(newPos: number): string;
    createFollowerPoint(): void;
    deleteFollowerPoint(): void;
}
export { SliderPointer, };
export default SliderPointer;
