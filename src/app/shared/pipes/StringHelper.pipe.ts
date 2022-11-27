import { Pipe, PipeTransform } from '@angular/core';
import { StringHelperService } from 'src/app/services/string-helper.service';

@Pipe({
    name: 'string'
})
export class StringHelperPipe implements PipeTransform {
    transform(str: string){
        return new StringHelperService().urlFriendly(str);
    }

    // public normalizeString(str: string): string {
    //     return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    // }


    // public urlFriendly(str: string): string {
    //     return this.normalizeString(str).replace(/ /g, '-').toLowerCase();
    // }
}