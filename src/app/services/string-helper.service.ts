import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringHelperService {

  constructor() { }

  public normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }


  public urlFriendly(str: string): string {
    return this.normalizeString(str).replace(/ /g, '-').toLowerCase();
  }
}
