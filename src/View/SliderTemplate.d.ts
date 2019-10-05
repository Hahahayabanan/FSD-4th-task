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
    sliderOnClick: (event: any) => void;
    calculateAndApplyRangeLine: () => void;
    calculatePointersRange(): number;
    destroy(): void;
}
export { SliderTemplate, };
export default SliderTemplate;
