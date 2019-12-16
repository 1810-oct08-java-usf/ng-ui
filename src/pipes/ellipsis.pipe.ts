import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ellipsis'
})

export class EllipsisPipe implements PipeTransform {



    transform(value: any, length: any): string {

        let truncatedText = "";
        const ellipsis = "...";

        if (typeof value === "undefined") return value;
        if (value.length <= length) return value;

        truncatedText = value.slice(0, (length - 3));

        return truncatedText + ellipsis;
    }

}
