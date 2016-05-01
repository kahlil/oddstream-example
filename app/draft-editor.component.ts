import { Component, OnInit } from 'angular2/core';
import { NgClass } from 'angular2/common';
// import { DraftsService } from './service/drafts.service';
import { ActionCreator } from './action/action-creator';
import { DraftsEditorStore } from './store/drafts-editor-store';
// Helper
import { makeObservableFunction } from './util';

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
    private actionCreator: ActionCreator,
    private draftsEditorStore: DraftsEditorStore
  ) {}

  ngOnInit() {
    this.draftsEditorStore.state$.subscribe(state => this.editorState = state);
    const addDraft$ = makeObservableFunction(this, 'newDraft').share();
    this.actionCreator.createAction(addDraft$, 'ADD_DRAFT');
    addDraft$.subscribe(() => this.text = '');
  }
}
