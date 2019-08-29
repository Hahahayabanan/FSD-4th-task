import SliderPointer from './SliderPointer';
export declare class SliderTemplate {
    slider: any;
    thumb: SliderPointer;
    isVertical: boolean;
    isFollowerPoint: boolean;
    private sliderOnClick;
    constructor(elem: any, isVertical?: string, isFollowerPoint?: boolean);
    createTemplate(): void;
    addEventToSliderClick(): void;
    destroy(): void;
}
export default SliderTemplate;
