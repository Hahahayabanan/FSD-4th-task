import { Slider } from '../Model/Slider';
import { ISliderSettings } from '../Model/ISliderSettings';
import { SliderPointer } from '../View/SliderPointer';
declare class SliderPresenter {
    model: Slider;
    view: any;
    constructor(rootElement: any, options: ISliderSettings);
    onChangePointer(event: any): void;
    createView(rootElement: any): void;
    initStartValue(): void;
    render(curThumb: SliderPointer, curPos: number): void;
    setFollowerPointValue(curThumb: SliderPointer, currPosInValWithStep: number): void;
    calculateFromPixelsToValue(curPosInPixels: number): number;
    calculateFromValueToPercents(curPosInValue: number): number;
    calculateFromPercentsToPixels(curPosInPercents: number): number;
    checkOrientationIsVertical(): boolean;
}
export { SliderPresenter, };
export default SliderPresenter;
