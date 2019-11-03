declare global {
    interface Window {
        $: JQuery;
    }
    interface JQuery {
        slider: (...args: any) => JQuery<Element> | string | number | number[] | boolean | undefined;
    }
}
export {};
