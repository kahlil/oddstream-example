import { Injectable } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { mapToActionCreator } from '../util';
import { storageActionCreators } from './storage-action-creators';
import { Odds } from '../odds';

@Injectable()
export class StorageActions {
  constructor(
    private dispatcher: Dispatcher,
    private odds: Odds
  ) {}

  fireAction(stream, actionType) {
    this.odds.dispatch(mapToActionCreator(stream, storageActionCreators, actionType));
  }
}
