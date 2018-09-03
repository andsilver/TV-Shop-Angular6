import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'htmlSanitize' })
export class HtmlSantitizerPipe implements PipeTransform {
   constructor(private domSanitizer: DomSanitizer) {

   }
   transform(html: string): SafeHtml {
        if (!html) {
            return null;
        }
        return this.domSanitizer.bypassSecurityTrustHtml(html);
   }
}
