import { printersButton } from './buttons/printers';
import { teamLocals } from './buttons/teamLocals';
import { locatePerson } from './buttons/locatePerson';

require('./styles.css');

export function overlay(w, h) {
    printersButton(w, h);
    teamLocals(w, h);
    locatePerson(w, h);
}
