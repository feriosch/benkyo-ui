import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-kanji-form-submit-field',
  templateUrl: './add-submit.component.html',
  styleUrls: ['./add-submit.component.scss'],
})
export class AddKanjiFormSubmitFieldComponent implements OnInit {
  @Input()
  form!: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  async onClickCancel() {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }
}
