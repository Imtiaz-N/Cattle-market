import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CattleService } from '../../core/services/cattle.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-cattle-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cattle-form.component.html',
  styleUrl: './cattle-form.component.scss',
})
export class CattleFormComponent {
  cattleForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  constructor(
    private fb: FormBuilder,
    private cattleService: CattleService,
    private router: Router,
    private alert: AlertService
  ) {
    this.cattleForm = this.fb.group({
      breed: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      status: ['available', Validators.required],
      image: [null, Validators.required],
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      this.cattleForm.patchValue({ image: this.selectedFile });
      this.cattleForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
          console.log('Image preview:', reader.result);
        };
      }
    }
  }

  onSubmit() {
    if (this.cattleForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('breed', this.cattleForm.get('breed')?.value);
      formData.append('weight', this.cattleForm.get('weight')?.value);
      formData.append('price', this.cattleForm.get('price')?.value);
      formData.append('status', this.cattleForm.get('status')?.value);
      formData.append('image', this.selectedFile);

      this.cattleService.addCattle(formData).subscribe({
        next: () => {
          this.alert.success('added successfully!');
          this.router.navigate(['/cattle']);
        },
        error: (err) => {
          this.alert.error('error in adding');
        },
      });
    }
  }
}
