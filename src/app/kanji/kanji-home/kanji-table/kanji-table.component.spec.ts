import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiTableComponent } from './kanji-table.component';

describe('KanjiTableComponent', () => {
  let component: KanjiTableComponent;
  let fixture: ComponentFixture<KanjiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjiTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
