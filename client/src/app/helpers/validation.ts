import * as moment from 'moment';
import { languageFormatSettings } from 'src/config';

const phoneRegex = new RegExp(
  languageFormatSettings.phoneMaskFormat
    .replace(/[(]/g, '[(]')
    .replace(/[)]/g, '[)]')
    .replace(/0/g, '\\d')
);

export function phoneIsValid(str: string) {
  return phoneRegex.test(str);
}

export function dateIsValid(str: string) {
  return moment(str, languageFormatSettings.dateMomentFormat, true).isValid();
}
