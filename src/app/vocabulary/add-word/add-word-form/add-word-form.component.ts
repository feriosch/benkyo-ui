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
      'word': new FormControl(
        null,
        [Validators.required],
        [this.wordExistsValidator.validate.bind(this.wordExistsValidator)]
      ),
      'hiragana': new FormControl(null),
      'spanish': new FormControl(null, [Validators.required]),
      'type': new FormGroup({
        'noun': new FormControl(0, [Validators.required]),
        'suruVerb': new FormControl(0, [Validators.required]),
        'noAdjective': new FormControl(0, [Validators.required]),
        'naAdjective': new FormControl(0, [Validators.required]),
        'iAdjective': new FormControl(0, [Validators.required]),
        'adverb': new FormControl(0, [Validators.required]),
        'verb': new FormControl(0, [Validators.required]),
        'adjectivalNoun': new FormControl(0, [Validators.required]),
        'adverbialNoun': new FormControl(0, [Validators.required]),
        'counter': new FormControl(0, [Validators.required])
      })
    })
  }

  get word() { return this.addWordForm.get('word'); }

  get spanish() { return this.addWordForm.get('spanish'); }

  isWordRepeated(): boolean {
    if (this.word?.errors) {
      return this.word!.errors!.hasOwnProperty('repeatedWord');
    }
    return false;
  }

  onSubmit(): void {
    console.log(this.addWordForm)
  }

}
