import { Observable } from "rxjs";
import { SubscriptionSink } from "../src/subscription-sink";

describe('SubscriptionSink', () => {

  let subSink: SubscriptionSink;
  let observable : Observable<any>;

  it('should create an instance', () => {
    expect(new SubscriptionSink()).toBeTruthy();
  });

  beforeEach(() => {
    observable = new Observable((observer) => {});
    subSink = new SubscriptionSink();
  });

  it('should close all Subscription on unsubscribe', () => {

    // adding 10 subscribtions
    const subs = [];
    for (let i = 0; i < 10; i++) {
      const newSub = observable.subscribe(() => {});
      subSink.add(newSub);
      subs.push(newSub);
    }

    for (const sub of subSink.tracked) {
      expect(sub.closed).toBeFalsy();
    }

    subSink.unsubscribe();
    for (const sub of subs) {
      expect(sub.closed).toBeTruthy();
    }

    expect(subSink.tracked).toEqual([]);
  });

  it('should add subscriptions on add', () => {
    expect(subSink.count).toBe(0);
    
    const subs = [];
    for (let i = 0; i < 10; i++) {
      const newSub = observable.subscribe(() => {});
      subSink.add(newSub);
      subs.push(newSub);

      expect(subSink.count).toBe(i + 1);
      expect(subSink.tracked).toEqual(subs);  
    }          
  });


  it('should add multiple subscriptions on providing more then one subscription', () => {

    expect(subSink.count).toBe(0);
    
    const subs = [];
    for (let i = 0; i < 10; i++) {
      const newSub = observable.subscribe(() => {});
      subs.push(newSub);
    }          
    subSink.add(... subs);
    expect(subSink.count).toBe(10);
    expect(subSink.tracked).toEqual(subs);  
  });  

  it('should add subscription on assigning to the sink property', () => {

    expect(subSink.count).toBe(0);
    const newSub = observable.subscribe(() => {});
    subSink.sink = newSub;

    expect(subSink.count).toBe(1);
    expect(subSink.tracked).toEqual([newSub]);
  });

  it('should have a allias `flush` for unsubscribe', () => {
    spyOn(subSink, 'unsubscribe');
    subSink.flush();
    expect(subSink.unsubscribe).toHaveBeenCalled();
  });  
});
