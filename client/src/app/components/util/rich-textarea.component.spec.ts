import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextareaComponent } from './rich-textarea.component';

describe('RichTextareaComponent', () => {
  let component: RichTextareaComponent;
  let fixture: ComponentFixture<RichTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RichTextareaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
