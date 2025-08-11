import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Word } from 'src/models/responses/vocabulary/word.model';
import { VocabularyService } from '../../services/vocabulary.service';

@Component({
  selector: 'app-edit-word-view',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditWordViewComponent implements OnInit {
  id: string;
  isLoading: boolean;
  word?: Word | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vocabularyService: VocabularyService,
  ) {
    this.id = this.route.snapshot.params['id'];
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.vocabularyService.getWordById(this.id).subscribe((response) => {
      this.isLoading = false;
      this.word = response;
    });
  }

  async onClickCancel() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }
}
