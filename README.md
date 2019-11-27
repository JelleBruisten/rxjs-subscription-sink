# rxjs-subscription-sink
**RxJS subscription sink for unsubscribing gracefully in a component.**

SubSink is a dead simple class to track RxJS subscriptions.

Call `unsubscribe()` to unsubscribe all of them, as you would do 
in your component library's `unmount`/`onDestroy` lifecycle event.

## Angular example
```
export class SomeComponent implements OnDestroy {
  private subs = new SubscriptionSink();

  ...

  // short and easy syntax
  this.subs.sink = observable$.subscribe(...);  

  // normal syntax
  this.subs.add(observable$.subscribe(...)); 

  // can add multiple subcriptions
  this.subs.add( 
    observable$.subscribe(...),
    anotherObservable$.subscribe(...)
  ); 

  ...

  // Unsubscribe when the component dies
  ngOnDestroy() {

    // normal way
    this.subs.unsubscribe();

    // using the allias
    this.subs.flush();
  }
}
```
