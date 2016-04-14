import { Component, Output, EventEmitter, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
// import { DraftsService } from './service/drafts.service';
import { DraftsActions } from './action/drafts-actions';
import { DraftsStore } from './store/drafts-store';

@Component({
  selector: 'draft-editor',
  template: `
    <p>Draft Editor</p>
    <textarea name="textarea" rows="10" cols="50" [(ngModel)]="text">Write something here</textarea>
    <button (click)="newDraft.next(text)">Add Draft</button>
  `
})
export class DraftEditorComponent implements OnInit {
	@Output() newDraft = new EventEmitter();
  private text: string;

  constructor(
    // private draftsService: DraftsService,
    private draftsActions: DraftsActions,
    private draftsStore: DraftsStore,
    private router: Router
  ) {}

	ngOnInit() {
		this.draftsActions.addDraft(this.newDraft);
		this.newDraft.subscribe(x => {
      this.router.navigate(['/DraftsList']);
    })
	}

  addDraft(draft: Object) {
    // this.draftsService.addDraft(text);
    // this.newDraft.next(draft);
		// this.newDraft.subscribe(x => console.log('🔥', x));
    // this.draftsActions.addDraft(this.newDraft);
    // this.router.navigate(['/DraftsList']);

  }
}
