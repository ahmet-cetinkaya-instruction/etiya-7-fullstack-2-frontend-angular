import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandsMockService } from '../../services/brands-mock.service';
import { AddBrandRequest } from '../../models/add-brand-request';

@Component({
  selector: 'app-brand-management-form',
  templateUrl: './brand-management-form.component.html',
  styleUrls: ['./brand-management-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandManagementFormComponent implements OnInit {
  brandForm!: FormGroup;
  // brandForm: FormGroup = new FormGroup({
  //   name: new FormControl(
  //     '', // İlk parametre default değer
  //     [Validators.required, Validators.minLength(2)] // ikinci parametre validasyonlar
  //   ),
  // });

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandsMockService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.brandForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      // description: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  add(): void {
    const request: AddBrandRequest = {
      name: this.brandForm.value.name,
    };

    this.brandService.add(request).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onFormSubmitted(): void {
    if (this.brandForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    this.add();
  }

  onDeleteClicked(): void {}
}
