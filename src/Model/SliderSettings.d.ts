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
    constructor(setts: ISliderSettings);
    checkValidSettings(): void;
    setValidValue(newValue?: number, currentValueNumber?: number): void;
    setRange(tmp: boolean): boolean;
    setMin(tmp: number): number;
    setMax(tmp: number): number;
    setStep(tmp: number): number;
    setValue(newValue: number, currentValueNumber?: number): number;
    setValues(tmp: number[]): number[];
    setOrientation(tmp: string): string;
    setHasTip(tmp: boolean): boolean;
}
export { SliderSettings };
export default SliderSettings;
