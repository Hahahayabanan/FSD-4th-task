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
}
export { PresenterAPI };
export default PresenterAPI;
