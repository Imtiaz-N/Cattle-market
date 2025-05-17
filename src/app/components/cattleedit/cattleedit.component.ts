import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CattleService } from '../../core/services/cattle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-cattleedit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cattleedit.component.html',
  styleUrl: './cattleedit.component.scss',
})
export class CattleeditComponent implements OnInit {
  cattleForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  cattleId!: number;

  constructor(
    private fb: FormBuilder,
    private cattleService: CattleService,
    public router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {
    this.cattleForm = this.fb.group({
      breed: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      status: ['available', Validators.required],
      image: [null],
    });
  }

  ngOnInit(): void {
    this.cattleId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCattleData();
  }

  loadCattleData(): void {
    this.cattleService.getCattleById(this.cattleId).subscribe({
      next: (cattle) => {
        this.cattleForm.patchValue({
          breed: cattle.breed,
          weight: cattle.weight,
          price: cattle.price,
          status: cattle.status,
        });
        // Set image preview with existing image
        this.imagePreview = cattle.image;
      },
      error: (err) => console.error('Error loading cattle:', err),
    });
  }

  onFileSelect(event: any): void {
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

  onSubmit(): void {
    if (this.cattleForm.valid) {
      const formData = new FormData();
      formData.append('breed', this.cattleForm.get('breed')?.value);
      formData.append('weight', this.cattleForm.get('weight')?.value);
      formData.append('price', this.cattleForm.get('price')?.value);
      formData.append('status', this.cattleForm.get('status')?.value);

      // Only append image if a new one was selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.cattleService.updateCattle(this.cattleId, formData).subscribe({
        next: () => {
          this.alert.success('updated successfully!');
          this.router.navigate(['/cattle']);
        },
        error: (err) => {
          this.alert.error('Error occured in update!');
        },
      });
    }
  }
}
