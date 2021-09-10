import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss']
})
export class AddTagsComponent implements OnInit {

  form?: FormGroup;
  tags: string[];

  constructor(private rootFormGroup: FormGroupDirective) {
    this.tags = [];
  }

  getTagValue(tag: string): boolean {
    if (this.form!.controls.hasOwnProperty(tag)) {
      return this.form!.controls[tag].value;
    }
    return false;
  }

  getPrintingValue(tag: string): string {
    switch (tag) {
      case 'ateji': return 'Ateji';
      case 'common': return 'Common';
      case 'expression': return 'Expression';
      case 'honorific': return 'Honorific';
      case 'humble': return 'Humble';
      case 'intransitive': return 'Intransitive';
      case 'jlptN1': return 'JLPT N1';
      case 'notJoyo': return 'Not Joyo';
      case 'onomatopeic': return 'Onomatopoeic';
      case 'transitive': return 'Transitive';
      case 'usuallyKana': return 'Usually Kana';
      default: return '?';
    }
  }

  onClickTag(tag: string): void {
    if (this.form!.controls.hasOwnProperty(tag)) {
      let control = this.form!.controls[tag];
      control.setValue(!control.value);
    }
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get('tags') as FormGroup;
    for (const [key] of Object.entries(this.form.controls)) {
      this.tags.push(key);
    }
  }

}
