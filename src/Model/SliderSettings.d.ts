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
    checkValidSettings(): void;
    setValidValue(newValue?: number, currentValueNumber?: number): void;
    setIsRange(tmp: boolean): void;
    setMin(tmp: number): void;
    setMax(tmp: number): void;
    setStep(tmp: number): void;
    setValue(newValue: number, currentValueNumber?: number): void;
    setValues(tmp: number[]): void;
    setOrientation(tmp: string): void;
    setHasTip(tmp: boolean): void;
}
export { SliderSettings };
export default SliderSettings;
