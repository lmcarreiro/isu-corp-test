import { Component, OnInit } from '@angular/core';
import * as ckeditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'util-rich-textarea',
  template: `
    <div>
      <ckeditor [editor]="editor" data="<p>Hello, world!</p>"></ckeditor>
    </div>
  `,
  styles: [],
})
export class RichTextareaComponent implements OnInit {
  editor = ckeditor;

  constructor() {}

  ngOnInit(): void {}
}
