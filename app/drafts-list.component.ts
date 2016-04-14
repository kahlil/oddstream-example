import { Component, OnInit, Output, EventEmitter } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Scheduler } from 'rxjs/Rx';
// Flux Services
import { DraftsService } from './service/drafts.service';
import { DraftsStore } from './store/drafts-store';
import { DraftsActions } from './action/drafts-actions';
// Components
import { DraftEditorComponent } from './draft-editor.component';

@Component({
  selector: 'drafts-list',
  template: `
    <p>List</p>
    <draft-editor></draft-editor>
    <ul class="collection">
      <li *ngFor="#draft of drafts | async">
        Draft ID: {{draft?.id}}<br>
        Draft Text: {{draft?.text}} <span (click)="deleteDraft$.next(draft.id)">x</span>
      </li>
    </ul>
    <button (click)="openEditor.next()">Open Editor</button>
  `,
  directives: [
    DraftEditorComponent,
    ROUTER_DIRECTIVES
  ]
})
export class DraftsListComponent implements OnInit {
  public drafts: any;

  @Output() deleteDraft$ = new EventEmitter();
  @Output() openEditor = new EventEmitter();

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
  }
}
