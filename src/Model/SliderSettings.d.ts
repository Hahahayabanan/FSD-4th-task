import { ISliderSettings } from './ISliderSettings';
declare class SliderSettings {
    protected defaultSettings: ISliderSettings;
    settings: ISliderSettings;
    errors: {
        minBiggerMax: string;
        stepBiggerMaxMin: string;
        stepInteger: string;
        valueBiggerMax: string;
        valueSmallerMin: string;
        firstValueSmallerMin: string;
        secondValueBiggerMax: string;
        firstValueBiggerSecond: string;
        secondValueBiggerFirst: string;
        rangeValuesInSingle: string;
        notValidOrientation: string;
    };
    constructor(settings: ISliderSettings);
    setSettings(settings: ISliderSettings): void;
    setDefaultSettings(): void;
    setSetting(setting: string, newValue: number | number[] | string | boolean, currentValueNumber?: number): void;
    getSetting(setting: string): any;
    setMin(newMin: number): void;
    setMax(newMax: number): void;
    setStep(tmp: number): void;
    setValue(newValue: number): void;
    setValues(newValue: number[] | number, currentValueNumber?: number): void;
    setOrientation(newOrientation: string): void;
}
export { SliderSettings };
export default SliderSettings;
