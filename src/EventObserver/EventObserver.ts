class EventObserver {
  private observers: any;

  constructor() {
    this.observers = [];
  }

  subscribe(fn: Function) {
    this.observers.push(fn);
  }

  unsubscribe(fn: Function) {
    this.observers = this.observers.filter((subscriber: any) => {
      return subscriber !== fn;
    });
  }

  broadcast(data: any) {
    this.observers.forEach((subscriber: any) => {
      subscriber(data);
    });
  }
}

export { EventObserver };
export default EventObserver;
