import { Subject } from 'rxjs/Subject';
import { curry, camelCase } from 'lodash';

export class Odds {
  public dispatcher$: Subject<{ type: string }>;
  constructor() {
    this.dispatcher$ = new Subject();
  }

  dispatch(action$) {
    action$.subscribe(
      res => this.dispatcher$.next(res),
      error => console.error('🔥', error)
      // () => console.log('a completed event has been sent')
    );
  }

  createAction(stream, actions, actionType) {
    this.dispatch(this.mapToActionCreator(stream, actions, actionType));
  }

  makeStateStream(reducers) {
    const getReducer = actionType => reducers[camelCase(actionType)];
    const mapReducer = action => curry(getReducer(action.type))(action);
    return this.dispatcher$
      .filter(action => !!getReducer(action.type))
      .map(mapReducer)
      .scan((state: [{}], reducer: (state: [{}]) => [{}]) => reducer(state), [])
      .publishReplay(1).refCount();
  }

  mapToActionCreator(stream, actions, actionType) {
    const actionCreator = actions[camelCase(actionType)];
    if (!!actionCreator === false) {
      throw new Error('No action creator defined for this action.');
    }
    return stream.map(actionCreator);
  }
}
