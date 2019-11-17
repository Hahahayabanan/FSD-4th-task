import { TipView } from './TipView';
import { EventObserver } from '../EventObserver/EventObserver';
declare class PointerView {
    pointerHTML: HTMLElement;
    curPos: number;
    endPos: number;
    isVertical: boolean;
    tip: TipView;
    observer: EventObserver;
    constructor(elemHTML: HTMLElement, isVertical?: boolean);
    private handlePointerMouseDown;
    dispatchPointerPosition(newCurPos: number): void;
    setPointerPosition(newCurPos: number): void;
    getCurPosInPixels(): number;
    bindEventListeners(): void;
    getPathLength(): number;
    calcPixelsToPercents(valueInPixels: number): number;
    calcPercentsToPixels(valueInPercents: number): number;
    renderCurrentPosInPercents(newPos: number): string;
    createTip(): void;
    deleteTip(): void;
    updateTipValue(newValue: number): void;
}
export { PointerView };
export default PointerView;
