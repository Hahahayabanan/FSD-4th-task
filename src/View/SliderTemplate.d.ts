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
        THUMB_SELECTED: string;
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
    private mouseDown;
    private calcMoveBorders;
    private sliderOnClick;
    calculateAndApplyRangeLine: () => void;
    calculatePointersRange(): number;
    setDataAttribute(attr: string, value: string): void;
    updateZIndex(curThumb: SliderPointer): void;
    destroy(): void;
}
export { SliderTemplate };
export default SliderTemplate;
