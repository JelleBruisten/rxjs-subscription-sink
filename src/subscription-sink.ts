import { Subscription } from 'rxjs';

const isFunction = (fn: any) => typeof fn === 'function';

export class SubscriptionSink {

  /**
   * container for subscriptions
   */
  protected subscriptions: Subscription[] = [];

  /**
   * Initialize the subsc
   */
  constructor() {
  }

  /**
   * Add subscriptions to the tracked subscriptions
   * @param sub subscriptions to add to our container
   * @example this.subSink.add(observable$.subscribe(...));
   */
  add(... sub: Subscription[]) : void {
    this.subscriptions = this.subscriptions.concat(sub);
  }

  /**
   * Assign subscription to this sink to add it to the tracked subscriptions
   * @param sub a subscription to add to tracker subscriptions
   * @example this.subs.sink = observable$.subscribe(...);
   */
  set sink(sub : Subscription) {
    this.subscriptions.push(sub);
  }

  /**
   * Getter for getting the length of the subscriptions
   * @example this.subs.count
   */
  get count() : Number {
    return this.subscriptions.length;
  }

  /**
   * Getter for getting tracked subscriptions, used for testing
   * @example this.subs.tracked
   */
  get tracked() : Subscription[] {
    return this.subscriptions;
  }

  /**
   * Unsubscribe from all tracker subscriptions
   * @example this.subs.unsubscribe();
   */
  unsubscribe() : void {

    // for each subscription, check if its closed, and if unsubscribe is an function
    for (const sub of this.subscriptions) {
      if (sub && !sub.closed && isFunction(sub.unsubscribe)) {
        sub.unsubscribe();
      }
    }

    // make empty
    this.subscriptions = [];
  }

  /**
   * Allias for Unsubscribe 
   * @alias unsubscribe()
   */
  flush() : void {
    this.unsubscribe();
  }
}
