import { SliderPresenter } from './SliderPresenter';
declare class SliderPresenterAPI {
    static slider: SliderPresenter;
    static enterPoint(options: {
        slider: SliderPresenter;
        option: string;
        setting: string;
        value?: string | number | number[] | boolean;
        valuesOneOfTwoVals?: number;
    }): string | number | boolean | number[];
    static getFollowerPoint(): boolean;
    static setFollowerPoint(newVal: boolean): boolean;
    static getRange(): boolean;
    static setRange(newVal: boolean): boolean;
    static getMinVal(): number;
    static setMinVal(newVal: number): number;
    static getMaxVal(): number;
    static setMaxVal(newVal: number): number;
    static getStepVal(): number;
    static setStepVal(newVal: number): number;
    static getValue(): number;
    static setValue(newVal: number): number;
    static getOrientation(): string;
    static setOrientation(newVal: string): string;
    static getValues(numberCurrent?: number): number[] | number;
    static setValues(newVal: number[] | number, numberCurrent?: number): number[] | number;
    static checkValuesSetterType(valuesOneOfTwoVals: any, value: any): number | number[];
}
export { SliderPresenterAPI, };
export default SliderPresenterAPI;
