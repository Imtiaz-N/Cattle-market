import { Component, OnInit } from '@angular/core';
import { CattleService } from '../../core/services/cattle.service';
import { Cattle } from '../../models/cattle.model';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { environment } from '../../../environments/environment';
import { BdtPipe } from '../../shared/pipes/bdt.pipe';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cattle-list',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    BdtPipe,
    TableModule,
    TagModule,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './cattle-list.component.html',
  styleUrl: './cattle-list.component.scss',
})
export class CattleListComponent implements OnInit {
  cattleList: Cattle[] = [];
  isLoading = true;
  constructor(
    private cattleService: CattleService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.cattleService.getAllCattle().subscribe({
      next: (cattle) => {
        this.cattleList = cattle.map((c) => {
          const fullImageUrl = `${environment.apiUrl}/${c.image}`;
          console.log('Constructed Image URL:', fullImageUrl);
          return {
            ...c,
            image: fullImageUrl,

            price: Number(c.price),
            weight: Number(c.weight),
          };
        });
        console.log('Full Cattle Data:', this.cattleList);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        const errorMessage =
          err.error?.message ||
          'Failed to load cattle data. Please try again later.';
        this.alert.error(errorMessage);
        console.error('Error fetching cattle:', err);
      },
    });
  }
  editCattle(id: number): void {
    this.router.navigate(['/cattle/edit', id]);
  }
}
