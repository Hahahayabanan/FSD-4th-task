import { SliderPointer } from './SliderPointer';
declare class SliderTemplate {
    slider: HTMLElement;
    sliderPath: HTMLElement;
    thumb0: SliderPointer;
    thumb1: SliderPointer;
    isVertical: boolean;
    isFollowerPoint: boolean;
    isRange: boolean;
    range: HTMLElement;
    lastThumbMoved: SliderPointer;
    styleClasses: {
        SLIDER: string;
        PATH: string;
        THUMB: string;
        RANGE: string;
        SLIDER_VERTICAL: string;
        SLIDER_WITH_POINT: string;
    };
    constructor(options: {
        rootElem: HTMLElement;
        isVertical?: boolean;
        isFollowerPoint?: boolean;
        isRange?: boolean;
    });
    createTemplate(): void;
    bindEventListeners(): void;
    bindThumbEventListeners(): void;
    mouseDown: (event: any) => void;
    calcMoveBorders(event: any, currentThumb: SliderPointer): {
        rightEdge: number;
        leftEdge: number;
        mouseX: any;
        mouseY: any;
    };
    sliderOnClick: (event: any) => void;
    calculateAndApplyRangeLine: () => void;
    calculatePointersRange(): number;
    destroy(): void;
}
export { SliderTemplate };
export default SliderTemplate;
