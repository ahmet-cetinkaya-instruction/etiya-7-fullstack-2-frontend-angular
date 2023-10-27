import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.brandForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      // description: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmitForm(): void {
    console.log(this.brandForm.value);
  }
}
