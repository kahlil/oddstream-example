import { Component, OnInit } from 'angular2/core';
import { NgClass } from 'angular2/common';
// Flux
import { OddStream } from './oddstream';
import { Store } from './store/store';
// Helper
import { makeObservableFunction } from './util';
import { ADD_DRAFT } from './action/action-constants';

@Component({
  selector: 'draft-editor',
  template: `
    <div class="draft-editor hidden" [ngClass]="{ enabled: editorState?.isEnabled }">
      <textarea name="textarea" rows="10" cols="50" [(ngModel)]="text"></textarea><br>
      <button class="add-draft-button" (click)="newDraft({ text: text, id: editorState?.newId })">Add Draft</button>
    </div>
  `,
  styleUrls: ['app/draft-editor.component.css'],
  directives: [NgClass]
})
export class DraftEditorComponent implements OnInit {
  private text: string;
  editorState: Object;

  constructor(
    // private draftsActions: DraftsActions,
    private store: Store,
    private odds: OddStream
  ) {}

  ngOnInit() {
    // Receive state stream from store and pass the values to the template.
    this.store.draftsEditorState$.subscribe(state => this.editorState = state);

    // Create action stream from the user sending the send button.
    const addDraft$ = makeObservableFunction(this, 'newDraft').share();
    this.odds.dispatch(addDraft$, ADD_DRAFT);
    addDraft$.subscribe(() => this.text = '');
  }
}
