import { Injectable } from 'angular2/core';
import { snakeCase, upperCase } from 'lodash';
import { Dispatcher } from '../dispatcher/dispatcher'

@Injectable()
export class Util {
  makeActionCreator(actionName: string, dispatcher: Dispatcher) {
    return (stream) => {
      dispatcher.dispatch(
        stream.map(data => ({
          type: upperCase(snakeCase(actionName)),
          data
        }))
      );
    }
  }
}
