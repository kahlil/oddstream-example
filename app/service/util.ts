import { Injectable } from 'angular2/core';
import { snakeCase } from 'lodash';
import { Dispatcher } from '../dispatcher/dispatcher'

@Injectable()
export class Util {
	constructor(private dispatcher: Dispatcher) {}

  makeActionCreator(actionName: string, sideEffect?: any) {
    return (stream) => {
			const action$ = stream
				.map(data => {
					// CONVENTION: only action creators are allowed
					// to trigger side effects.
					if (typeof sideEffect === 'function') {
						sideEffect(data);
					}
					return {
						type: snakeCase(actionName).toUpperCase(),
						data
					}
				});

      this.dispatcher.dispatch(action$);
    }
  }
}
