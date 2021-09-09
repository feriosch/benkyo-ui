import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { WordExistsValidator } from '../word-exists-validator.service';


@Component({
  selector: 'app-add-word-form',
  templateUrl: './add-word-form.component.html',
  styleUrls: ['./add-word-form.component.scss']
})
export class AddWordFormComponent implements OnInit {

  addWordForm!: FormGroup;

  constructor(private wordExistsValidator: WordExistsValidator) { }

  ngOnInit(): void {
    this.addWordForm = new FormGroup({
      'basic': new FormGroup({
        'word': new FormControl(null, [Validators.required], [this.wordExistsValidator.validate.bind(this.wordExistsValidator)])
      })
    })
  }

}
