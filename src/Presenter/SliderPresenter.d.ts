import { Slider } from '../Model/Slider';
import { ISliderSettings } from '../Model/SliderSettings';
import { SliderPointer } from '../View/SliderPointer';
export declare class SliderPresenter {
    model: Slider;
    view: any;
    constructor(rootElement: any, options: ISliderSettings);
    initStartValue(): void;
    render(curThumb: SliderPointer, curPos: number): void;
    setFollowerPointValue(curThumb: SliderPointer, currPosInValWithStep: number): void;
    calculateCurrPosFromPixelsToValue(curPosInPixels: number): number;
    getCurrPosFromValueToPercents(curPosInValue: number): number;
    calculateFromPercentsToPixels(curPosInPercents: number): number;
}
