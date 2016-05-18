import { Injectable } from 'angular2/core';
import { DraftsService } from './service/drafts';
import { Odds } from './odds';

@Injectable()
export class Effects {
  dispatcher$;

  constructor(
    private draftsService: DraftsService,
    private odds: Odds
  ) {
    this.dispatcher$ = odds.getDispatcher$();
  }

  runEffects() {
    this.dispatcher$
      .subscribe(action => {
        switch (action.type) {
          case 'DELETE_DRAFT':
            this.draftsService.deleteDraft(action.data);
            break;
          case 'ADD_DRAFT':
            this.draftsService.saveDraft(action.data);
            break;
          case 'FLAG_DRAFT':
            this.draftsService.flagDraft(action.data);
            break;
          case 'GET_DRAFTS':
            this.draftsService.getDrafts();
            break;
          default:
            break;
        }
      });
  }
}
