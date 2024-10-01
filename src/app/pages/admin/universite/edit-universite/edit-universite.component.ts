import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UniversiteDto } from 'src/app/dto/universite-dto';
import { UniversiteService } from 'src/app/shared/services/universite.service';
import { Region } from 'src/app/enums/region';

@Component({
  selector: 'app-edit-universite',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-universite.component.html',
  styleUrls: ['./edit-universite.component.scss']
})
export class EditUniversiteComponent {



  editUniversiteForm: FormGroup;
  universite: UniversiteDto = {} as UniversiteDto;
  selecteFile: File | null = null;
  idUniversite!: number;
  regions = Object.values(Region);


  constructor(
    private universiteService: UniversiteService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editUniversiteForm = this.formBuilder.group({
      nomUniversite: ['', Validators.required],
      imageUrl: ['', Validators.required],
      adresse: this.formBuilder.group({
        region: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idUniversite = +params['idUniversite'];
      this.universiteService.getUniversiteById(this.idUniversite).subscribe(
        response => {
          this.universite = response;
          this.editUniversiteForm.patchValue({
            nomUniversite: this.universite.nomUniversite,
            imageUrl: this.universite.imageUrl,
            adresse: {
              region: this.universite.adresse.region
            }
          });
        },
        error => console.log(error)
      );
    });
  }

  onSelectFile(e: Event): void {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selecteFile = file;
      this.editUniversiteForm.patchValue({ imageUrl: file.name });
    }
  }

  onSubmit(): void {
    if (this.editUniversiteForm.valid) {
      
      const universiteToUpdate : UniversiteDto = {
        ...this.editUniversiteForm.value,
        imageUrl: this.selecteFile ? this.selecteFile.name : this.editUniversiteForm.value.imageUrl
      }

      this.universiteService.updateUniversite(this.idUniversite, universiteToUpdate).subscribe(
        response => {
          console.log('University updated successfully', response);
          this.router.navigate(['/admin/admin-dashboard/universite']);
        },
        error => console.log(error)
      );
    }
  }
}
