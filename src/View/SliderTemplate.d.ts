import SliderPointer from './SliderPointer';
declare class SliderTemplate {
    slider: any;
    thumb: SliderPointer;
    isVertical: boolean;
    isFollowerPoint: boolean;
    constructor(elem: any, isVertical?: boolean, isFollowerPoint?: boolean);
    private sliderOnClick;
    createTemplate(): void;
    addEventToSliderClick(): void;
    destroy(): void;
}
export { SliderTemplate, };
export default SliderTemplate;
