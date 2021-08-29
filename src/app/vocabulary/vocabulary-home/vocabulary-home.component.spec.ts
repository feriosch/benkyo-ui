import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyHomeComponent } from './vocabulary-home.component';

describe('VocabularyHomeComponent', () => {
  let component: VocabularyHomeComponent;
  let fixture: ComponentFixture<VocabularyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocabularyHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
