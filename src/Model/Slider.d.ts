import { SliderSettings } from './SliderSettings';
declare class Slider {
    settings: SliderSettings;
    constructor(sett?: object);
    setSettings(sett: object): void;
    setPointerPosition(pos: number[]): number[];
    setPointerPosition(pos: number): number;
}
export { Slider, };
export default Slider;
