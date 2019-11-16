declare class ExampleParameters {
    $exampleContainer: HTMLElement;
    $controlPanel: any;
    $slider: any;
    constructor($exampleContainer: any, $slider: any);
    init(): void;
    createContainer(): void;
    createCheckbox(labelText: string, property: string): void;
    initOrientation(): void;
    createInputText(labelText: string, property: string): void;
    initValueInputs(): void;
}
declare const _default: {
    ExampleParameters: typeof ExampleParameters;
};
export default _default;
export { ExampleParameters };
