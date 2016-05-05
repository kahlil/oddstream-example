import { Injectable } from 'angular2/core';
import { Odds } from '../odds';

@Injectable()
export class StorageActions {
  constructor(private odds: Odds) {}

  dispatchAction(stream, actionType) {
    this.odds.dispatch(stream, actionType);
  }
}
