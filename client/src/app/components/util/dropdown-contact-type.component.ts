import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactType } from 'src/app/models/contact-type';
import { ContactTypeService } from 'src/app/services/contact-type.service';

@Component({
  selector: 'util-dropdown-contact-type',
  template: `
    <util-dropdown
      [allowEmpty]="true"
      [options]="types"
      [selected]="selected"
      (selectedChange)="selectedChange.emit($event)"
      icon="globe"
    ></util-dropdown>
  `,
  styles: [],
})
export class DropdownContactTypeComponent implements OnInit {
  types: { id: string; name: string }[] = [];

  @Input() selected!: string;
  @Output() selectedChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private contactTypeService: ContactTypeService) {}

  ngOnInit(): void {
    this.getContactTypes();
  }

  getContactTypes(): void {
    this.contactTypeService
      .getContactTypes()
      .subscribe(types => (this.types = types.map(t => ({ id: t.id.toString(), name: t.name }))));
  }
}
