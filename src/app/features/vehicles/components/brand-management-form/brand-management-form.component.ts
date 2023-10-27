import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandsMockService } from '../../services/brands-mock.service';
import { AddBrandRequest } from '../../models/add-brand-request';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { GetBrandByIdRequest } from '../../models/get-brand-by-id-request';
import { GetBrandByIdResponse } from '../../models/get-brand-by-id-response';
import { UpdateBrandRequest } from '../../models/update-brand-request';
import { DeleteBrandRequest } from '../../models/delete-brand-request';

@Component({
  selector: 'app-brand-management-form',
  templateUrl: './brand-management-form.component.html',
  styleUrls: ['./brand-management-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandManagementFormComponent implements OnInit {
  brandForm!: FormGroup;
  brandToUpdate: GetBrandByIdResponse | null = null;
  // brandForm: FormGroup = new FormGroup({
  //   name: new FormControl(
  //     '', // İlk parametre default değer
  //     [Validators.required, Validators.minLength(2)] // ikinci parametre validasyonlar
  //   ),
  // });

  get isEditMode(): boolean {
    return this.brandToUpdate !== null;
  }

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandsMockService,
    private activatedRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBrandIdFromRoute();
    this.createForm();
  }

  getBrandIdFromRoute(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      if (params['brandId']) this.getById({ id: params['brandId'] });
    });
  }

  getById(request: GetBrandByIdRequest): void {
    this.brandService.getById(request).subscribe({
      next: (response) => {
        this.brandToUpdate = response;
        this.brandForm.patchValue(response);

        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  createForm(): void {
    this.brandForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      // description: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.changeDetector.detectChanges();
  }

  add(): void {
    const request: AddBrandRequest = {
      name: this.brandForm.value.name,
    };

    this.brandService.add(request).subscribe({
      next: () => {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  update(): void {
    const request: UpdateBrandRequest = {
      id: this.brandToUpdate!.id,
      name: this.brandForm.value.name,
    };
    this.brandService.update(request).subscribe((response) => {
      this.brandForm.patchValue(response);

      this.changeDetector.detectChanges();
    });
  }

  delete(): void {
    const request: DeleteBrandRequest = {
      id: this.brandToUpdate!.id,
    };
    this.brandService.delete(request).subscribe((response) => {
      this.router.navigate([this.isEditMode ? '../../' : '../'], {
        relativeTo: this.activatedRoute,
      });
    });
  }

  onFormSubmitted(): void {
    if (this.brandForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    if (this.isEditMode) this.update();
    else this.add();
  }

  onDeleteClicked(): void {
    this.delete();
  }
}
