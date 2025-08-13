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
    <form nz-form [formGroup]="bookForm" (ngSubmit)="submitForm()">
      <h3>{{ data.mode === 'add' ? 'Add New Book' : 'Edit Book' }}</h3>

      <nz-form-item>
        <nz-form-label nzFor="title">Title</nz-form-label>
        <nz-form-control>
          <input nz-input formControlName="title" id="title" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button nz-button [nzType]="'primary'" [disabled]="!bookForm.valid">
            Submit
          </button>
          <button nz-button (click)="cancel()">Cancel</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: ``,
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
}
