import FollowerPoint from './FollowerPoint';
declare class SliderPointer {
    thumbHTMLElem: any;
    sliderHTMLElem: any;
    _curPos: number;
    isVertical: boolean;
    followerPoint: FollowerPoint;
    constructor(elemHTML: any, sliderHTML: any, isVertical: boolean);
    currPos: number;
    createEventListeners(anotherPointer?: SliderPointer): void;
    renderCurrentPosInPixels(newPos: number): string;
    renderCurrentPosInPercents(newPos: number): string;
    createFollowerPoint(): void;
    deleteFollowerPoint(): void;
}
export { SliderPointer };
export default SliderPointer;
