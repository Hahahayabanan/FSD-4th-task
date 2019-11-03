declare class ExampleParameters {
    exampleContainer: HTMLElement;
    $container: JQuery<Object>;
    $slider: JQuery<Object>;
    constructor(exampleContainer: HTMLElement);
    createContainer(): void;
    initTipCheckboxes(): void;
    initRange(): void;
    initOrientation(): void;
    initMinMax(): void;
    initStep(): void;
    initValueInputs(): void;
}
declare const _default: {
    ExampleParameters: typeof ExampleParameters;
};
export default _default;
export { ExampleParameters };
