import { Component } from '@angular/core';
import { BookListComponent } from '../components/book-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-page',
  imports: [BookListComponent, CommonModule],
  template: `
   
<section>
  <app-book-list></app-book-list>
</section>
  `,
  styles: ``
})
export class BookPageComponent {

}
