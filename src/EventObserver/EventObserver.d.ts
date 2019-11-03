declare class EventObserver {
    private observers;
    constructor();
    subscribe(fn: Function): void;
    unsubscribe(fn: Function): void;
    broadcast(data: any): void;
}
export { EventObserver };
export default EventObserver;
