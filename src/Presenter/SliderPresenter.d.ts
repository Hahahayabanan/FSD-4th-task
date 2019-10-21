import { Slider } from '../Model/Slider';
import { ISliderSettings } from '../Model/ISliderSettings';
import { SliderPointer } from '../View/SliderPointer';
declare class SliderPresenter {
    model: Slider;
    view: any;
    constructor(rootElement: HTMLElement, options: ISliderSettings);
    onChangePointer(event: any): void;
    createView(rootElement: any): void;
    updateValue(): void;
    render(curThumb: SliderPointer, curPos: number): void;
    setFollowerPointValue(curThumb: SliderPointer, currPosInValWithStep: number): void;
    checkOrientationIsVertical(): boolean;
    updateDataAttributes(): void;
    updateValuesDataAttributes(): void;
}
export { SliderPresenter };
export default SliderPresenter;
