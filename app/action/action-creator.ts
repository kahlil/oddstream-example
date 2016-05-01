import { Injectable, Inject } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { mapToActionCreator } from '../util';

@Injectable()
export class ActionCreator {
  constructor(
    private dispatcher: Dispatcher,
    @Inject('DraftsActions') private actions
  ) {}

  createAction(stream, actionType) {
    this.dispatcher.dispatch(
      mapToActionCreator(stream, this.actions, actionType)
    );
  }
}
