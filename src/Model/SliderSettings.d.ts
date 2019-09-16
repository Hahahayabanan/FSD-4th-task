import { ISliderSettings } from './ISliderSettings';
declare class SliderSettings {
    protected defaultSettings: ISliderSettings;
    settings: ISliderSettings;
    constructor(setts: ISliderSettings);
    checkValidValues(): void;
    setValidValue(): void;
    setRange(tmp: boolean): boolean;
    setMinVal(tmp: number): number;
    setMaxVal(tmp: number): number;
    setStepVal(tmp: number): number;
    setValue(tmp: number): number;
    setValues(tmp: number[]): number[];
    setOrientation(tmp: string): string;
    setFollowerPoint(tmp: boolean): boolean;
}
export { SliderSettings };
export default SliderSettings;
