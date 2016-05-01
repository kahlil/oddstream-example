// import { SimpleChange } from 'angular2/core';
import { Observable, Observer } from 'rxjs/Rx';
import { curry, camelCase } from 'lodash';

export function makeStateStream(dispatcher$: Observable<{ type: string }>, reducers: Object) {
  const getReducer = actionType => reducers[camelCase(actionType)];
  const mapReducer = action => curry(getReducer(action.type))(action);

  return dispatcher$
    .filter(action => !!getReducer(action.type))
    .map(mapReducer)
    .scan((state: [{}], reducer) => reducer(state), [])
    .publishReplay(1).refCount();
}

export function mapToActionCreator(stream, actions, actionType) {
  const actionCreator = actions[camelCase(actionType)];
  if (actionCreator === undefined) {
    throw new Error('No action creator defined for this action.');
  }
  return stream.map(actionCreator);
}

export function makeObservableFunction<T>(target: any, functionName: string) {
    let observer: Observer<any>;
    const observable = Observable.create(obs => observer = obs);
    target[functionName] = function() {
        const len = arguments.length;
        if (len === 1) {
            observer.next(arguments[0]);
        } else {
            const args = new Array(len);
            for (let i = 0; i < len; i++) {
                args[i] = arguments[i];
            }
            observer.next(args);
        }
    };
    return observable;
}
