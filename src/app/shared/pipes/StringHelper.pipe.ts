import { Pipe, PipeTransform } from '@angular/core';
import { StringHelperService } from 'src/app/services/string-helper.service';

@Pipe({
    name: 'string'
})
export class StringHelperPipe implements PipeTransform {
    transform(str: string | number, method: string = 'url'){
        if(method == 'url')
            return new StringHelperService().urlFriendly(str.toString());
        else ('capitalise')
            return new StringHelperService().portugueseTitleCase(str.toString());
    }

    // public normalizeString(str: string): string {
    //     return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    // }


    // public urlFriendly(str: string): string {
    //     return this.normalizeString(str).replace(/ /g, '-').toLowerCase();
    // }
}