import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-add-sentences',
  templateUrl: './add-sentences.component.html',
  styleUrls: ['./add-sentences.component.scss']
})
export class AddSentencesComponent implements OnInit {

  form?: FormGroup;
  sentencesFormArray?: FormArray;

  constructor(private rootFormGroup: FormGroupDirective) { }

  get controls() { return this.sentencesFormArray!.controls; }

  getJapaneseControl(index: number): FormControl {
    return this.controls[index].get('japanese') as FormControl;
  }

  getTranslationControl(index: number): FormControl {
    return this.controls[index].get('translation') as FormControl;
  }

  pushSentence(): void {
    this.sentencesFormArray!.push(
      new FormGroup({
        'japanese': new FormControl('', [Validators.required]),
        'translation': new FormControl('', [Validators.required])
      })
    );
  }

  popSentence(): void {
    if (this.sentencesFormArray!.length > 0) {
      this.sentencesFormArray!.removeAt(this.sentencesFormArray!.length - 1);
    }
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control as FormGroup;
    this.sentencesFormArray = this.rootFormGroup.control.get('sentences') as FormArray;
  }

}
