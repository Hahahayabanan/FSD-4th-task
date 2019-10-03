import { SliderPointer } from './SliderPointer';
declare class SliderTemplateRange {
    slider: HTMLElement;
    sliderPath: HTMLElement;
    isVertical: boolean;
    isFollowerPoint: boolean;
    thumb1: SliderPointer;
    thumb2: SliderPointer;
    range: HTMLElement;
    styleClasses: {
        SLIDER: string;
        PATH: string;
        THUMB: string;
        RANGE: string;
        SLIDER_VERTICAL: string;
        SLIDER_WITH_POINT: string;
    };
    constructor(elem: HTMLElement, isVertical?: boolean, isFollowerPoint?: boolean);
    sliderOnClick: (event: any) => void;
    createTemplate(): void;
    initRangeLine(): void;
    bindEventListeners(): void;
    calculatePointersRange(): number;
    destroy(): void;
}
export { SliderTemplateRange, };
export default SliderTemplateRange;
