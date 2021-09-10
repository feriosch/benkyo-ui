import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-add-type-table',
  templateUrl: './add-type-table.component.html',
  styleUrls: ['./add-type-table.component.scss']
})
export class AddTypeTableComponent implements OnInit {

  form?: FormGroup;
  subTypes: string[];

  constructor(private rootFormGroup: FormGroupDirective) {
    this.subTypes = [];
  }

  getCellValue(name: string): number {
    if (this.form!.controls.hasOwnProperty(name)) {
      return this.form!.controls[name].value;
    }
    return 0;
  }

  getPrintingValue(subType: string): string {
    switch (subType) {
      case 'noun': return '名';
      case 'suruVerb': return 'する';
      case 'noAdjective': return 'の形';
      case 'naAdjective': return 'な形';
      case 'iAdjective': return 'い形';
      case 'adverb': return '副';
      case 'verb': return '動';
      case 'adjectivalNoun': return '名形';
      case 'adverbialNoun': return '副名';
      case 'counter': return '回';
      default: return '?';
    }
  }

  getMappedValue(value: number, defaultName: string): string {
    switch (value) {
      case 0:
      case 1:
      case 2: return defaultName;
      case 3: return 'に';
      case 4: return 'と';
      case 5: return '的';
      case 6: return '的に';
      case 7: return 'たる';
      case 8: return 'を';
      default: return defaultName;
    }
  }

  onClickCell(cell: string) {
    if (this.form!.controls.hasOwnProperty(cell)) {
      let control = this.form!.controls[cell];
      control.setValue((control.value + 1) % 9);
    }
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get('type') as FormGroup;
    for (const [key] of Object.entries(this.form.controls)) {
      this.subTypes.push(key);
    }
  }

}
