import { Injectable } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { mapToActionCreator } from '../util';
import { storageActionCreators } from './storage-action-creators';

@Injectable()
export class StorageActions {
  constructor(private dispatcher: Dispatcher) {}

  fireAction(stream, actionType) {
    this.dispatcher.dispatch(mapToActionCreator(stream, storageActionCreators, actionType));
  }
}
