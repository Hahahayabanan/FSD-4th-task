import { Presenter } from './Presenter';
declare class PresenterAPI {
    static slider: Presenter;
    static enterPoint(options: {
        slider: Presenter;
        option: string;
        setting: string;
        value?: string | number | number[] | boolean;
        oneOfTwoValues?: number;
    }): string | number | boolean | number[];
    static getHasTip(): boolean;
    static setHasTip(newVal: boolean): void;
    static getRange(): boolean;
    static setRange(newVal: boolean): void;
    static getMin(): number;
    static setMin(newVal: number): void;
    static getMax(): number;
    static setMax(newVal: number): void;
    static getStep(): number;
    static setStep(newVal: number): void;
    static getValue(): number;
    static setValue(newVal: number): void;
    static getOrientation(): string;
    static setOrientation(newVal: string): void;
    static getValues(numberCurrent?: number): number[] | number;
    static setValues(newVal: number[] | number, numberCurrent?: number): void;
    static checkValuesSetterType(oneOfTwoValues: any, value: any): number | number[];
}
export { PresenterAPI };
export default PresenterAPI;
