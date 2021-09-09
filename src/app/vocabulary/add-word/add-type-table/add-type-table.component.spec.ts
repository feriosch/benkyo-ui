import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeTableComponent } from './add-type-table.component';

describe('AddTypeTableComponent', () => {
  let component: AddTypeTableComponent;
  let fixture: ComponentFixture<AddTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
