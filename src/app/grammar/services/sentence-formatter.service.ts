import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SentenceFormatterService {
  constructor() {}

  getFrontFormattedSentence(backendComponents: string[]): string {
    let sentence: string = '';
    backendComponents.forEach((component: string) => {
      if (component.charAt(1) === '/') {
        component = component.slice(0, 1) + component.slice(2);
        component += component.charAt(0);
      }
      sentence += component;
    });
    return sentence;
  }
}
