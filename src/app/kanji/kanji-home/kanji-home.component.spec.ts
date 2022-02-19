import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiHomeComponent } from './kanji-home.component';

describe('KanjiHomeComponent', () => {
  let component: KanjiHomeComponent;
  let fixture: ComponentFixture<KanjiHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjiHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
