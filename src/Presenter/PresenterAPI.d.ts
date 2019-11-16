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
    static getValues(numberCurrent?: number): number[] | number;
    static setValues(newVal: number[] | number, numberCurrent?: number): void;
    static checkValuesSetterType(oneOfTwoValues: any, value: any): number | number[];
}
export { PresenterAPI };
export default PresenterAPI;
