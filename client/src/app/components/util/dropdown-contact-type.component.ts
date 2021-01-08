import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactTypeService } from 'src/app/services/contact-type.service';

@Component({
  selector: 'util-dropdown-contact-type',
  template: `
    <util-dropdown
      [allowEmpty]="true"
      placeholder="Contact Type"
      i18n-placeholder
      [options]="types"
      [selected]="selected"
      (selectedChange)="selectedChange.emit($event)"
      icon="globe"
      [invalid]="invalid"
    ></util-dropdown>
  `,
  styles: [],
})
export class DropdownContactTypeComponent implements OnInit {
  types: { id: string; name: string }[] = [];

  @Input() selected!: string;
  @Output() selectedChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() invalid?: boolean;

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
