import { Component, Input, inject, OnInit, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Book } from '../../@features/book/types/books.interface';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [
    CommonModule,
    NzDescriptionsModule,
    NzTagModule,
    NzDividerModule
  ],
  template: `
    <div class="book-view-container" *ngIf="book">
      <div class="book-header">
        <h2>{{ book.title }}</h2>
        <nz-tag [nzColor]="'blue'">{{ book.category }}</nz-tag>
      </div>
      
      <nz-divider></nz-divider>
      
      <nz-descriptions nzBordered [nzColumn]="1" nzSize="middle">
        <nz-descriptions-item nzTitle="Author">
          {{ book.author }}
        </nz-descriptions-item>
        
        <nz-descriptions-item nzTitle="ISBN">
          <code>{{ book.isbn }}</code>
        </nz-descriptions-item>
        
        <nz-descriptions-item nzTitle="Price">
          <span class="price">\${{ book.price | number:'1.2-2' }}</span>
        </nz-descriptions-item>
        
        <nz-descriptions-item nzTitle="Published Date">
          {{ book.published | date:'mediumDate' }}
        </nz-descriptions-item>
        
        <nz-descriptions-item nzTitle="Book ID">
          <nz-tag [nzColor]="'green'">#{{ book.id }}</nz-tag>
        </nz-descriptions-item>
      </nz-descriptions>
      
      <nz-divider></nz-divider>
      
      <div class="book-footer">
        <p><strong>Category:</strong> {{ book.category }}</p>
        <p><small>Use the edit action from the table to modify this book's information.</small></p>
      </div>
    </div>
    
    <div class="no-book-message" *ngIf="!book">
      <p>No book data available.</p>
    </div>
  `,
  styles: `
    .book-view-container {
      padding: 4px 0;
    }
    
    .book-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    
    .book-header h2 {
      margin: 0;
      color: #1890ff;
      font-size: 24px;
      font-weight: 600;
    }
    
    .price {
      font-size: 18px;
      font-weight: 600;
      color: #52c41a;
    }
    
    .book-footer {
      background-color: #fafafa;
      padding: 16px;
      border-radius: 6px;
      border-left: 4px solid #1890ff;
    }
    
    .book-footer p {
      margin: 4px 0;
    }
    
    .no-book-message {
      text-align: center;
      padding: 40px 20px;
      color: #999;
    }
    
    code {
      background-color: #f6f8fa;
      padding: 2px 8px;
      border-radius: 4px;
      // font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    }
  `
})
export class ViewBookComponent implements OnInit {
  @Input() book?: Book;
  
  private drawerRef = inject(NzDrawerRef, { optional: true });

  constructor(@Optional() @Inject(NZ_DRAWER_DATA) private drawerData: any) {
    // Get book data from drawer injection
    if (this.drawerData && this.drawerData.book) {
      this.book = this.drawerData.book;
    }
  }

  ngOnInit(): void {
    // Additional initialization if needed
  }
}
