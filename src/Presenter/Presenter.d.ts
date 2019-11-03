import { Model } from '../Model/Model';
import { ISliderSettings } from '../Model/ISliderSettings';
import { EventObserver } from '../EventObserver/EventObserver';
declare class Presenter {
    model: Model;
    view: any;
    observer: EventObserver;
    constructor(rootElement: HTMLElement, options: ISliderSettings);
    init(): void;
    initStartValue(): void;
    updateViewWithNewPointerPosition(data: any): void;
    updateViewWithNewSettings(data: any): void;
    updateModelWithNewPointerPosition(data: any): void;
    checkOrientationIsVertical(): boolean;
    updateDataAttributes(): void;
    updateValueDataAttributes(): void;
}
export { Presenter };
export default Presenter;
