import { SliderSettings } from './SliderSettings';
declare class Slider {
    settings: SliderSettings;
    constructor(sett?: object);
    setSettings(sett: object): void;
    calcPointerPosition(pos: number[]): number[];
    calcPointerPosition(pos: number): number;
    calculateFromPercentsToValue(curPosInPercents: number): number;
    calculateFromValueToPercents(curPosInValue: number): number;
}
export { Slider };
export default Slider;
