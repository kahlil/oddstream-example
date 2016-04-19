import { Component, OnInit, Output, EventEmitter } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Scheduler } from 'rxjs/Rx';
// Flux Services
import { DraftsService } from './service/drafts';
import { DraftsStore } from './store/drafts-store';
import { DraftsActions } from './action/drafts-actions';
// Components
import { DraftEditorComponent } from './draft-editor.component';

@Component({
  selector: 'drafts-list',
  template: `
    <div class="menu">
      <button (click)="openEditor$.next()">add draft</button>
      <button (click)="filterHearted$.next()">show hearted</button>
    </div>
    <div class="flex-container">
        <div *ngFor="#draft of drafts | async" class="draft flex-item" [ngClass]="{ hide: draft?.hide }">
          <span class="delete-draft" (click)="deleteDraft$.next(draft.id)">&times;</span>
          <span class="draft-id">{{draft?.id}}</span>
          <span class="heart" [ngClass]="{ hearted: draft?.hearted }" (click)="heartDraft$.next(draft.id)">&hearts;</span>
          {{draft?.text}}
        </div>
    </div>
  `,
  styleUrls: ['app/drafts-list.component.css'],
  directives: [
    DraftEditorComponent,
    ROUTER_DIRECTIVES
  ]
})
export class DraftsListComponent implements OnInit {
  public drafts: any;

  deleteDraft$ = new EventEmitter();
  openEditor$ = new EventEmitter();
  heartDraft$ = new EventEmitter();
  filterHearted$ = new EventEmitter();

  constructor(
    private draftsService: DraftsService,
    private draftsActions: DraftsActions,
    public draftsStore: DraftsStore
  ) {}

  ngOnInit() {
    // Set state from the drafts store.
    this.drafts = this.draftsStore.state$;

    // Create delete draft action by passing the
    // deleteDraft clickstream.
    this.draftsActions.deleteDraft(this.deleteDraft$);
    // Create an open editor action by passing
    // the openEditor clickstream.
    this.draftsActions.openEditor(this.openEditor$);
    // The hearting clickstream.
    this.draftsActions.heartDraft(this.heartDraft$)
    // The filter hearted drafts click stream.
    this.draftsActions.filterHearted(this.filterHearted$)
  }
}
