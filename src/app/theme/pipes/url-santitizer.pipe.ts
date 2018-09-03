import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({ name: 'urlSanitize' })
export class UrlSantitizerPipe implements PipeTransform {
   constructor(private domSanitizer: DomSanitizer) {

   }
   transform(url: string): SafeUrl {
        if (!url) {
            return null;
        }
        return this.domSanitizer.bypassSecurityTrustUrl(url);
   }
}
