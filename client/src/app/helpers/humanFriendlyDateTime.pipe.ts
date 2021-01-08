import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'humanFriendlyDateTime' })
export class humanFriendlyDateTime implements PipeTransform {
  transform(value: string): string {
    return moment(value).format('dddd, MMMM Do YYYY \\a\\t h:mm a');
  }
}
