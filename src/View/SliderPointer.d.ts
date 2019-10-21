import { FollowerPoint } from './FollowerPoint';
declare class SliderPointer {
    thumbHTMLElem: HTMLElement;
    curPos: number;
    isVertical: boolean;
    followerPoint: FollowerPoint;
    endPos: number;
    constructor(elemHTML: HTMLElement, isVertical?: boolean);
    setCurPosInPercents(newCurrPos: number): void;
    setCurPosInPixels(newCurrPos: number): void;
    getCurPosInPixels(): number;
    getPathLength(): number;
    calcPixelsToPercents(valueInPixels: number): number;
    calcPercentsToPixels(valueInPercents: number): number;
    renderCurrentPosInPixels(newPos: number): string;
    renderCurrentPosInPercents(newPos: number): string;
    createFollowerPoint(): void;
    deleteFollowerPoint(): void;
}
export { SliderPointer };
export default SliderPointer;
