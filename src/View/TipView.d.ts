declare class TipView {
    tipHTML: HTMLElement;
    parentHTML: HTMLElement;
    constructor(parentHTML: HTMLElement);
    createTemplate(): void;
    setValue(value: number): void;
    destroy(): void;
}
export { TipView };
export default TipView;
