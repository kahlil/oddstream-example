import { Injectable } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { Odds } from '../odds';
import { DraftsService } from '../service/drafts';
import { actionCreators } from './drafts-action-creators';

@Injectable()
export class DraftsActions {
  constructor(
    private dispatcher: Dispatcher,
    private odds: Odds,
    private draftsService: DraftsService
  ) {}

  fireAction(stream, actionType) {
    this.odds.dispatch(this.odds.mapToActionCreator(stream, actionCreators, actionType));
  }

  fireActionWithDeleteDraftEffect(stream, actionType) {
    const streamWithFx = stream.do(id => this.draftsService.deleteDraft(id));
    this.fireAction(streamWithFx, actionType);
  }

  fireActionWithAddDraftEffect(stream, actionType) {
    const streamWithFx = stream.do(draft => this.draftsService.saveDraft(draft));
    this.fireAction(streamWithFx, actionType);
  }

  fireActionWithFlagDraftEffect(stream, actionType) {
    const streamWithFx = stream.do(id => this.draftsService.flagDraft(id));
    this.fireAction(streamWithFx, actionType);
  }

  fireActionWithGetDraftsEffect(stream, actionType) {
    const streamWithFx = stream.do(() => this.draftsService.getDrafts());
    this.fireAction(streamWithFx, actionType);
  }
}
