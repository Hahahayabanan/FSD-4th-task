import './View/styles.scss';
declare global {
    interface Window {
        $: JQuery;
    }
    interface JQuery {
        slider: () => JQuery<Element> | void;
    }
}
