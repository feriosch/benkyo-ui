import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-kanji-form-submit-field',
  templateUrl: './add-submit.component.html',
})
export class AddKanjiFormSubmitFieldComponent implements OnInit {
  @Input()
  form!: FormGroup;

  @Input()
  isLoading!: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  async onClickCancel() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }
}
