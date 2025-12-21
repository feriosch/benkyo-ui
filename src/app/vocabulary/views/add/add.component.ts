import { Component, OnInit } from '@angular/core';
import { AddWordFormComponent } from '../../components/add/form/add-form.component';

@Component({
  selector: 'app-add-word-view',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  imports: [AddWordFormComponent],
})
export class AddWordViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
