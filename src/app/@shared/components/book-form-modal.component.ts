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
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { Book } from '../../@features/book/types/books.interface';
import { CATEGORY_OPTIONS } from '../../@features/book/data-access/mock-data'; 


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
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule,
    NzInputNumberModule,
  ],
  template: `

<form nz-form [formGroup]="bookForm">
  <h3>{{ data.mode === 'add' ? 'Add New Book' : 'Edit Book' }}</h3>

  <div class="form-grid">

    <div class="grid-item">
      <nz-form-item>
        <nz-form-label nzFor="title">Title</nz-form-label>
        <nz-form-control>
          <input nz-input formControlName="title" id="title" />
        </nz-form-control>
      </nz-form-item>
    </div>

    <div class="grid-item">
      <nz-form-item>
        <nz-form-label nzFor="author">Author</nz-form-label>
        <nz-form-control>
          <input nz-input formControlName="author" id="author" />
        </nz-form-control>
      </nz-form-item>
    </div>

    <div class="grid-item">
      <nz-form-item>
        <nz-form-label nzFor="category">Category</nz-form-label>
        <nz-form-control>
          <nz-select formControlName="category" id="category">
            @for (option of categoryOptions; track option) {
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
          <input nz-input formControlName="isbn" id="isbn" />
        </nz-form-control>
      </nz-form-item>
    </div>

    <div class="grid-item">
      <nz-form-item>
        <nz-form-label nzFor="price">Price</nz-form-label>
        <nz-form-control>
          <nz-input-number formControlName="price" id="price"></nz-input-number>
        </nz-form-control>
      </nz-form-item>
    </div>

    <div class="grid-item">
      <nz-form-item>
        <nz-form-label nzFor="published">Published</nz-form-label>
        <nz-form-control>
          <nz-date-picker formControlName="published" id="published"></nz-date-picker>
        </nz-form-control>
      </nz-form-item>
    </div>

  </div>

  <nz-form-item>
    <nz-form-control>
      <button nz-button nzType="primary" [disabled]="!bookForm.valid">
        Submit
      </button>
      <button nz-button (click)="cancel()">Cancel</button>
    </nz-form-control>
  </nz-form-item>
</form>

  `,
  styles: `

.form-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
  
  .grid-item {
    flex: 1 1 calc(33.333% - 16px);
  }
  
  .grid-item nz-form-item {
    width: 100%;
  }
  `,
})
export class BookFormModalComponent implements OnInit {
  @Input() data!: { mode: 'add' | 'edit'; book?: Book };
  bookForm!: FormGroup;
  private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef);
  private modalData: ModalData = inject(NZ_MODAL_DATA);

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    return this.bookForm = this.fb.group({
      title: [this.data.book?.title || null, Validators.required],
      author: [this.data.book?.author || null, Validators.required],
      category: [this.data.book?.category || null, Validators.required],
      isbn: [this.data.book?.isbn || null, Validators.required],
      price: [this.data.book?.price || null, Validators.required],
      published: [this.data.book?.published || null, Validators.required],
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
