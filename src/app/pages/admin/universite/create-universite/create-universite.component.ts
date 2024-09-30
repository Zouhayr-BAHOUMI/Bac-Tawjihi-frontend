import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UniversiteService } from 'src/app/shared/services/universite.service';
import { Region } from 'src/app/enums/region';

@Component({
  selector: 'app-create-universite',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-universite.component.html',
  styleUrls: ['./create-universite.component.scss']
})
export class CreateUniversiteComponent {
onSubmit() {
throw new Error('Method not implemented.');
}

  createUniversiteForm: FormGroup ;
  selecteFile: File | null = null;

  regions = Object.values(Region);

  constructor(
    private universiteService: UniversiteService,
    private formbuilder : FormBuilder,
    private router : Router
  ){
    this.createUniversiteForm = this.formbuilder.group({
      nom: ['', Validators.required],
      imageUrl: ['', Validators.required] 
    });
  }

  ngOnInit(): void {}

  onSelectFile(e: Event): void {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selecteFile = file;
      this.createUniversiteForm.patchValue({ imageUrl: file.name });
    }
  }

}
