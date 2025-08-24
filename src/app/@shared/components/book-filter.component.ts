import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { AppButtonComponent } from './app-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzDividerModule,
    AppButtonComponent
  ],
  template: `
    <div class="filter-container">
      <h3>Filter Books</h3>
      <p class="filter-description">Use the filters below to narrow down the book list.</p>
      
      <nz-divider></nz-divider>
      
      <form nz-form nzLayout="vertical" [formGroup]="filterForm">
        <nz-form-item>
          <nz-form-label>Search by Title</nz-form-label>
          <nz-form-control>
            <input nz-input formControlName="title" placeholder="Enter book title..." />
          </nz-form-control>
        </nz-form-item>
        
        <nz-form-item>
          <nz-form-label>Author</nz-form-label>
          <nz-form-control>
            <input nz-input formControlName="author" placeholder="Enter author name..." />
          </nz-form-control>
        </nz-form-item>
        
        <nz-form-item>
          <nz-form-label>Category</nz-form-label>
          <nz-form-control>
            <nz-select formControlName="category" nzPlaceHolder="Select category" nzAllowClear>
              <nz-option nzValue="programming" nzLabel="Programming"></nz-option>
              <nz-option nzValue="fiction" nzLabel="Fiction"></nz-option>
              <nz-option nzValue="science" nzLabel="Science"></nz-option>
              <nz-option nzValue="business" nzLabel="Business"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>
        
        <nz-form-item>
          <nz-form-label>Price Range</nz-form-label>
          <nz-form-control>
            <div class="price-range">
              <input nz-input formControlName="minPrice" placeholder="Min" type="number" />
              <span class="price-separator">to</span>
              <input nz-input formControlName="maxPrice" placeholder="Max" type="number" />
            </div>
          </nz-form-control>
        </nz-form-item>
      </form>
      
      <nz-divider></nz-divider>
      
      <div class="filter-actions">
        <app-button type="primary" (clicked)="applyFilters()">
          Apply Filters
        </app-button>
        <app-button type="default" customStyle="margin-left: 8px;" (clicked)="clearFilters()">
          Clear All
        </app-button>
      </div>
      
      <div class="filter-info">
        <p><small><strong>Note:</strong> This is a placeholder component for future filter functionality.</small></p>
      </div>
    </div>
  `,
  styles: `
    .filter-container {
      padding: 4px 0;
    }
    
    .filter-description {
      color: #666;
      margin-bottom: 16px;
    }
    
    .price-range {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .price-range input {
      flex: 1;
    }
    
    .price-separator {
      color: #999;
      font-size: 14px;
    }
    
    .filter-actions {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 16px;
    }
    
    .filter-info {
      background-color: #f6ffed;
      border: 1px solid #b7eb8f;
      border-radius: 6px;
      padding: 12px;
      margin-top: 16px;
    }
    
    .filter-info p {
      margin: 0;
      color: #389e0d;
    }
    
    h3 {
      margin: 0 0 8px 0;
      color: #1890ff;
      font-size: 18px;
      font-weight: 600;
    }

    /* Form Controls - Border Radius */
input[nz-input],
.ant-input,
.ant-picker,
.ant-input-number {
  border-radius: 6px !important;
}

/* NZ Select specific styling with ::ng-deep */
::ng-deep .ant-select-selector {
  border-radius: 6px !important;
}

::ng-deep nz-select .ant-select-selector {
  border-radius: 6px !important;
}

::ng-deep .ant-select .ant-select-selector {
  border-radius: 6px !important;
}

/* Select dropdown with ::ng-deep */
::ng-deep .ant-select-dropdown {
  border-radius: 6px !important;
}

/* Date picker dropdown with ::ng-deep */
::ng-deep .ant-picker-dropdown {
  border-radius: 6px !important;
}
  `
})
export class BookFilterComponent implements OnInit {
  filterForm: FormGroup;
  
  private drawerRef = inject(NzDrawerRef, { optional: true });
  private fb = inject(FormBuilder);

  constructor() {
    this.filterForm = this.fb.group({
      title: [null],
      author: [null],
      category: [null],
      minPrice: [null],
      maxPrice: [null]
    });
  }

  ngOnInit(): void {
    // Future: Initialize with existing filters if available
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    console.log('Applied filters:', filters);
    
    // Future: Emit filters to parent component or service
    // For now, just close the drawer
    this.drawerRef?.close(filters);
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.drawerRef?.close({});
  }
}
