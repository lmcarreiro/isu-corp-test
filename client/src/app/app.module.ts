import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { RatingModule } from 'ng-starrating';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationsListComponent } from './components/route/reservations-list.component';
import { ReservationDetailComponent } from './components/route/reservation-detail.component';
import { HeaderComponent } from './components/layout/header.component';
import { DropdownComponent } from './components/util/dropdown.component';
import { InputComponent } from './components/util/input.component';
import { RichTextareaComponent } from './components/util/rich-textarea.component';
import { PaginatorComponent } from './components/util/paginator.component';
import { DropdownContactTypeComponent } from './components/util/dropdown-contact-type.component';
import { InputAutocompleteComponent } from './components/util/input-autocomplete.component';
import { InputDatepickerComponent } from './components/util/input-datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservationsListComponent,
    ReservationDetailComponent,
    HeaderComponent,
    DropdownComponent,
    InputComponent,
    RichTextareaComponent,
    PaginatorComponent,
    DropdownContactTypeComponent,
    InputAutocompleteComponent,
    InputDatepickerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    DpDatePickerModule,
    AutocompleteLibModule,
    RatingModule,
    CKEditorModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
