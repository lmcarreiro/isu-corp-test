import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as ckeditor from '@ckeditor/ckeditor5-build-classic';

ckeditor.defaultConfig = {
  ...ckeditor.defaultConfig,
  toolbar: {
    ...ckeditor.defaultConfig.toolbar,
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      // Remove image upload because need to add an Upload adapter for it to work
      //'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ],
  },
};

@Component({
  selector: 'util-rich-textarea',
  template: `
    <div>
      <ckeditor
        [ngModel]="text"
        (ngModelChange)="textChange.emit($event)"
        [editor]="editor"
      ></ckeditor>
    </div>
  `,
  styles: [],
})
export class RichTextareaComponent implements OnInit {
  editor = ckeditor;

  @Input() text!: string;
  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}
