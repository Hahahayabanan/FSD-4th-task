import { EventObserver } from '../EventObserver/EventObserver';
import ISliderSettings from './ISliderSettings';
declare class Model {
    private settings;
    valuesObserver: EventObserver;
    settingsObserver: EventObserver;
    constructor(settings?: object);
    getSettings(): ISliderSettings;
    calculateValueWithStep(pos: number[]): number[];
    calculateValueWithStep(pos: number): number;
    calculateFromPercentsToValue(curPosInPercents: number): number;
    calculateFromValueToPercents(curPosInValue: number): number;
    setCalculatedValue(curPosInPercents: number, updateObject: string): void;
    setCalculatedStartValues(): void;
    dispatchValue(): void;
    dispatchSettings(): void;
    setSetting(setting: string, newValue: number | number[] | string | boolean, currentValueNumber?: number): void;
    getSetting(setting: string): any;
}
export { Model };
export default Model;
