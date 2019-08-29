import { SliderSettings } from './SliderSettings';
export declare class Slider {
    settings: SliderSettings;
    constructor(sett?: object);
    setSettings(sett: object): void;
    setPointerPosition(pos: number[]): number[];
    setPointerPosition(pos: number): number;
}
export default Slider;
