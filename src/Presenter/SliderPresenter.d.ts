import { Slider } from '../Model/Slider';
import { ISliderSettings } from '../Model/ISliderSettings';
import { SliderPointer } from '../View/SliderPointer';
declare class SliderPresenter {
    model: Slider;
    view: any;
    constructor(rootElement: HTMLElement, options: ISliderSettings);
    onChangePointer(event: any): void;
    createView(rootElement: any): void;
    initStartValue(): void;
    render(curThumb: SliderPointer, curPos: number): void;
    setFollowerPointValue(curThumb: SliderPointer, currPosInValWithStep: number): void;
    calculateFromPercentsToValue(curPosInPercents: number): number;
    calculateFromValueToPercents(curPosInValue: number): number;
    checkOrientationIsVertical(): boolean;
}
export { SliderPresenter, };
export default SliderPresenter;
