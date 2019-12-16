import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from 'time-ago-pipe';
import { EllipsisPipe } from './ellipsis.pipe'


@NgModule({
    declarations: [TimeAgoPipe, EllipsisPipe],
    imports: [
        CommonModule
    ],
    exports: [TimeAgoPipe, EllipsisPipe]
})
export class PipeModule { }
