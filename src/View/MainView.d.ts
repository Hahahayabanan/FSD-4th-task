import { PointerView } from './PointerView';
import { EventObserver } from '../EventObserver/EventObserver';
declare class MainView {
    sliderHTML: HTMLElement;
    pathHTML: HTMLElement;
    pointer0: PointerView;
    pointer1: PointerView;
    isVertical: boolean;
    hasTip: boolean;
    isRange: boolean;
    rangeHTML: HTMLElement;
    lastPointerMoved: PointerView;
    observer: EventObserver;
    styleClasses: {
        SLIDER: string;
        PATH: string;
        THUMB: string;
        THUMB_SELECTED: string;
        RANGE: string;
        SLIDER_VERTICAL: string;
        SLIDER_WITH_POINT: string;
    };
    constructor(options: {
        rootElem: HTMLElement;
        isVertical?: boolean;
        hasTip?: boolean;
        isRange?: boolean;
    });
    private createTemplate;
    private createPath;
    private createPointers;
    private setOrientationClass;
    private bindEventListeners;
    private handlePathHTMLMouseDown;
    private calculateAndApplyRangeLine;
    private calculateMidpointBetweenPoints;
    private dispatchPointerPosition;
    private addObservers;
    setPointerPosition(newCurPos: number[] | number): void;
    update(isRange: boolean, isVertical: boolean, hasTip: boolean): void;
    updateZIndex(curPointer: PointerView): void;
    createTip(): void;
    setTipValue(newValue: number | number[]): void;
    setDataAttribute(attr: string, value: string): void;
    removeDataAttribute(attr: string): void;
    setDataAttributes(attributes: any): void;
    getClear(): void;
}
export { MainView };
export default MainView;
