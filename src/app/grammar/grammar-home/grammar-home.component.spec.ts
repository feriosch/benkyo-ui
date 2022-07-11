import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarHomeComponent } from './grammar-home.component';

describe('GrammarHomeComponent', () => {
  let component: GrammarHomeComponent;
  let fixture: ComponentFixture<GrammarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrammarHomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrammarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
