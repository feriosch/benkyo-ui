import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiModalComponent } from './kanji-modal.component';

describe('KanjiModalComponent', () => {
  let component: KanjiModalComponent;
  let fixture: ComponentFixture<KanjiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjiModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
