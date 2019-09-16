import SliderPointer from './SliderPointer';
export declare class SliderTemplateRange {
  slider: any;
  isVertical: boolean;
  isFollowerPoint: boolean;
  thumb1: SliderPointer;
  thumb2: SliderPointer;
  range: any;
  constructor(elem: any, isVertical?: string, isFollowerPoint?: boolean);
  createTemplate(): void;
  initRangeLine(): void;
  addEventToSliderClick(): void;
  calculatePointersRange(): number;
  destroy(): void;
}
