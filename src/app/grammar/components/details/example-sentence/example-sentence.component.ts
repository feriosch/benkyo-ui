import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-sentence',
  templateUrl: './example-sentence.component.html',
  styleUrls: ['./example-sentence.component.scss'],
})
export class ExampleSentenceComponent implements OnInit {
  @Input()
  components: string[];

  @Input()
  sizeClass: string;

  constructor() {
    this.components = [];
    this.sizeClass = 'is-size-4';
  }

  isRed(component: string): boolean {
    return component.split('|')[0] === '*';
  }

  isBold(component: string): boolean {
    return component.split('|')[0] === '_';
  }

  isIncorrect(component: string): boolean {
    return component.split('|')[0] === '$';
  }

  getWords(component: string): string {
    let words: string | undefined = component.split('|').pop();
    if (this.isIncorrect(component)) words! = `*${words!}`;
    return words!;
  }

  ngOnInit(): void {}
}
