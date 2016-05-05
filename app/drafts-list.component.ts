import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
// Flux Services
import { Store } from './store/store';
import { DraftsActions } from './action/drafts-actions';
// Helpers
import { makeObservableFunction } from './util';

@Component({
  selector: 'drafts-list',
  template: `
    <div class="menu">
      <button (click)="openEditor()">add draft</button>
      <button (click)="filterFlagged()">show sparkled</button>
    </div>
    <div class="flex-container">
        <div *ngFor="#draft of drafts | async" class="draft flex-item" [ngClass]="{ hide: draft?.hide }">
          <span class="delete-draft" (click)="deleteDraft(draft.id)">&times;</span>
          <span class="draft-id">{{draft?.id}}</span>
          <span class="heart" [ngClass]="{ flagged: draft?.flagged }" (click)="flagDraft(draft.id)"></span>
          {{draft?.text}}
        </div>
    </div>
  `,
  styleUrls: ['app/drafts-list.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class DraftsListComponent implements OnInit {
  public drafts: any;

  constructor(
    private draftsActions: DraftsActions,
    public store: Store
  ) {}

  ngOnInit() {
    // Set state from the drafts store.
    this.drafts = this.store.draftsState$;

    // Create delete draft action by passing the
    // deleteDraft clickstream.
    const deleteDraft$ = makeObservableFunction(this, 'deleteDraft').share();
    this.draftsActions.dispatchAction(deleteDraft$, 'DELETE_DRAFT');
    // Create an open editor action by passing
    // the openEditor clickstream.
    const openEditor$ = makeObservableFunction(this, 'openEditor').share();
    this.draftsActions.dispatchAction(openEditor$, 'OPEN_EDITOR');
    // The hearting clickstream.
    const flagDraft$ = makeObservableFunction(this, 'flagDraft').share();
    this.draftsActions.dispatchAction(flagDraft$, 'FLAG_DRAFT');
    // The filter flagged drafts click stream.
    const filterFlagged$ = makeObservableFunction(this, 'filterFlagged').share();
    this.draftsActions.dispatchAction(filterFlagged$, 'FILTER_FLAGGED');
  }
}
