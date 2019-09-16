import SliderPointer from './SliderPointer';
declare class SliderTemplateRange {
    slider: any;
    isVertical: boolean;
    isFollowerPoint: boolean;
    thumb1: SliderPointer;
    thumb2: SliderPointer;
    range: any;
    constructor(elem: any, isVertical?: boolean, isFollowerPoint?: boolean);
    createTemplate(): void;
    initRangeLine(): void;
    addEventToSliderClick(): void;
    calculatePointersRange(): number;
    destroy(): void;
}
export { SliderTemplateRange };
export default SliderTemplateRange;
