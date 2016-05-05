import { Injectable } from 'angular2/core';
import { Odds } from '../odds';
import { DraftsService } from '../service/drafts';

@Injectable()
export class DraftsActions {
  constructor(
    private odds: Odds,
    private draftsService: DraftsService
  ) {}

  dispatchAction(stream, actionType) {
    const streamWithOrWithoutFx = this.addSideEffects(stream, actionType);
    this.odds.dispatch(streamWithOrWithoutFx, actionType);
  }

  addSideEffects(stream, actionType) {
    let streamUpdated;
    switch (actionType) {
      case 'DELETE_DRAFT':
        streamUpdated = stream.do(id => this.draftsService.deleteDraft(id));
        break;
      case 'ADD_DRAFT':
        streamUpdated = stream.do(draft => this.draftsService.saveDraft(draft));
        break;
      case 'FLAG_DRAFT':
        streamUpdated = stream.do(id => this.draftsService.flagDraft(id));
        break;
      case 'GET_DRAFTS':
        streamUpdated = stream.do(id => this.draftsService.getDrafts());
        break;
      default:
        streamUpdated = stream;
        break;
    }
    return streamUpdated;
  }
}
