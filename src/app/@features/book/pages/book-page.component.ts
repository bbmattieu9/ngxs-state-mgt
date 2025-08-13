import { Component } from '@angular/core';
import { BookListComponent } from '../components/book-list.component';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [CommonModule, BookListComponent, NzModalModule],
  template: `
   
<section>
  <app-book-list></app-book-list>
</section>
  `,
  styles: ``
})
export class BookPageComponent {

}
