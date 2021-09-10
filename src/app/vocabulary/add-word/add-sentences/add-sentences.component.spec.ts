import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSentencesComponent } from './add-sentences.component';

describe('AddSentencesComponent', () => {
  let component: AddSentencesComponent;
  let fixture: ComponentFixture<AddSentencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSentencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSentencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
