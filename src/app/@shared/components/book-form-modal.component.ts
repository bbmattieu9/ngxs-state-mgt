import { Component, Input, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { Book } from '../../@features/book/types/books.interface';
import { CATEGORY_OPTIONS } from '../../@features/book/data-access/mock-data';
import { AppButtonComponent } from './app-button.component';




interface ModalData {
  mode: 'add' | 'edit';
  book?: Book;
}

@Component({
  selector: 'app-book-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzInputNumberModule,
    AppButtonComponent,
  ],
  template: `

<form nz-form nzLayout="vertical" [formGroup]="bookForm">

  <!-- Title - Full Width First Row -->
  <nz-form-item>
    <nz-form-label nzFor="title">Title</nz-form-label>
    <nz-form-control>
      <input nz-input formControlName="title" id="title" placeholder="Enter book title" />
    </nz-form-control>
  </nz-form-item>

  <!-- Other Form Fields Grid -->
  <div class="form-grid">

    <div class="grid-item">
      <nz-form-item>
        <nz-form-label nzFor="author">Author</nz-form-label>
        <nz-form-control>
          <input nz-input formControlName="author" id="author" placeholder="Enter author name" />
        </nz-form-control>
      </nz-form-item>
    </div>

    <div class="grid-item">
      <nz-form-item>
        <nz-form-label nzFor="category">Category</nz-form-label>
        <nz-form-control>
          <nz-select formControlName="category" id="category" nzShowSearch nzAllowClear nzPlaceHolder="Select a category">
            @for (option of categoryOptions; track option.value) {
              <nz-option [nzLabel]="option.name" [nzValue]="option.value"></nz-option>
            }
          </nz-select>
        </nz-form-control>
      </nz-form-item>
    </div>

    <div class="grid-item">
      <nz-form-item>
        <nz-form-label nzFor="isbn">ISBN</nz-form-label>
        <nz-form-control>
          <input nz-input formControlName="isbn" id="isbn" placeholder="Enter ISBN" />
        </nz-form-control>
      </nz-form-item>
    </div>

    <div class="grid-item">
      <nz-form-item>
        <nz-form-label nzFor="price">Price</nz-form-label>
        <nz-form-control>
          <nz-input-number formControlName="price" id="price" placeholder="0.00" [nzMin]="0" [nzStep]="0.01" style="width: 100%"></nz-input-number>
        </nz-form-control>
      </nz-form-item>
    </div>

    <div class="grid-item">
      <nz-form-item>
        <nz-form-label nzFor="published">Published Date</nz-form-label>
        <nz-form-control>
          <nz-date-picker formControlName="published" id="published" nzPlaceHolder="Select date" style="width: 100%"></nz-date-picker>
        </nz-form-control>
      </nz-form-item>
    </div>

  </div>

  <!-- Submit Buttons -->
  <div class="form-actions">
    <app-button 
      type="primary" 
      (clicked)="submitForm()"
    >
      Submit
    </app-button>
    <app-button 
      type="default" 
      customStyle="margin-left: 8px;" 
      (clicked)="cancel()"
    >
      Cancel
    </app-button>
  </div>

</form>

  `,
  styles: `

/* Form Container */
form {
  max-height: none;
  overflow: visible;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 24px;
  background-color: #fafafa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Form Grid Layout */
.form-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.grid-item {
  flex: 1 1 calc(50% - 8px);
  min-width: 220px;
}

/* Form Items - Compact spacing */
nz-form-item {
  margin-bottom: 16px;
}

/* Form Actions */
.form-actions {
  border-top: 1px solid #e8e8e8;
  padding-top: 16px;
  margin-top: 16px;
  text-align: right;
  margin-left: -24px;
  margin-right: -24px;
  margin-bottom: -24px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 16px;
  background-color: #ffffff;
  border-radius: 0 0 7px 7px;
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid-item {
    flex: 1 1 100%;
    min-width: auto;
  }
  
  .form-grid {
    gap: 12px;
  }
  
  nz-form-item {
    margin-bottom: 12px;
  }
  
  form {
    padding: 16px;
  }
  
  .form-actions {
    margin-left: -16px;
    margin-right: -16px;
    margin-bottom: -16px;
    padding-left: 16px;
    padding-right: 16px;
  }
}

  `
})
export class BookFormModalComponent implements OnInit {
  @Input() data!: { mode: 'add' | 'edit'; book?: Book };
  bookForm!: FormGroup;
  private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef);
  modalData: ModalData = inject(NZ_MODAL_DATA).data;

  ngOnInit(): void {
    console.log('Modal Data:', this.modalData);
    this.initForm();
    if (this.modalData.mode === 'edit' && this.modalData.book) {
      this.patchFormWithBookData(this.modalData.book);
    }
  }

  initForm() {
    this.bookForm = this.fb.group({
      title: [null, Validators.required],
      author: [null, Validators.required],
      category: [null, Validators.required],
      isbn: [null, Validators.required],
      price: [null, Validators.required],
      published: [null, Validators.required],
    });
  }

  patchFormWithBookData(book: Book): void {
    // Convert published date string to Date object for nz-date-picker
    const publishedDate = book.published ? new Date(book.published) : null;
    
    this.bookForm.patchValue({
      title: book.title,
      author: book.author,
      category: book.category,
      isbn: book.isbn,
      price: book.price,
      published: publishedDate
    });
  }

  submitForm(): void {
    if (this.bookForm.valid) {
      const bookData: Book = {
        ...this.bookForm.value,
        id: this.modalData.mode === 'edit' && this.modalData.book ? this.modalData.book.id : Date.now(),
        published: this.bookForm.value.published.toISOString().slice(0, 10),
      };
      this.modalRef.destroy(bookData);
    }
  }

  cancel(): void {
    this.modalRef.destroy(null);
  }

  categoryOptions  = CATEGORY_OPTIONS;
}
