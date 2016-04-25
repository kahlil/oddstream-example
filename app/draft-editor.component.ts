import { Component, Output, EventEmitter, OnInit } from 'angular2/core';
import { NgClass } from 'angular2/common';
import { Router } from 'angular2/router';
// import { DraftsService } from './service/drafts.service';
import { DraftsActions } from './action/drafts-actions';
import { DraftsStore } from './store/drafts-store';
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
  // @Output() newDraft$ = new EventEmitter();
  private text: string;
  editorState: Object;

  constructor(
    private draftsActions: DraftsActions,
    private draftsEditorStore: DraftsEditorStore
  ) {}

  ngOnInit() {
    this.draftsEditorStore.state$.subscribe(state => this.editorState = state);
    const newDraft$ = makeObservableFunction(this, 'newDraft').share();
    this.draftsActions.addDraft(newDraft$);
    newDraft$.subscribe(() => this.text = '')
  }
}
