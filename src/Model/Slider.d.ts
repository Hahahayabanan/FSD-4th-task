import { SliderSettings } from './SliderSettings';
declare class Slider {
    settings: SliderSettings;
    constructor(sett?: object);
    setSettings(sett: object): void;
    calcPointerPosition(pos: number[]): number[];
    calcPointerPosition(pos: number): number;
}
export { Slider, };
export default Slider;
