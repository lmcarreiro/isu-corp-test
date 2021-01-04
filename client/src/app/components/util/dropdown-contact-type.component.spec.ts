import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownContactTypeComponent } from './dropdown-contact-type.component';

describe('DropdownContactTypeComponent', () => {
  let component: DropdownContactTypeComponent;
  let fixture: ComponentFixture<DropdownContactTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownContactTypeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownContactTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
