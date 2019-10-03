import { SliderPointer } from './SliderPointer';
declare class SliderTemplate {
    slider: HTMLElement;
    sliderPath: HTMLElement;
    thumb: SliderPointer;
    isVertical: boolean;
    isFollowerPoint: boolean;
    styleClasses: {
        SLIDER: string;
        PATH: string;
        THUMB: string;
        SLIDER_VERTICAL: string;
        SLIDER_WITH_POINT: string;
    };
    constructor(elem: HTMLElement, isVertical?: boolean, isFollowerPoint?: boolean);
    sliderOnClick: (event: any) => void;
    createTemplate(): void;
    bindEventListeners(): void;
    destroy(): void;
}
export { SliderTemplate, };
export default SliderTemplate;
