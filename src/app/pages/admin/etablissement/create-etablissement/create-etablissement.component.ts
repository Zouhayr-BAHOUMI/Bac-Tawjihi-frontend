import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Universite } from 'src/app/interfaces/universite';
import { EtablissementService } from 'src/app/shared/services/etablissement.service';
import { UniversiteService } from 'src/app/shared/services/universite.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Province } from 'src/app/enums/province';
import { Ville } from 'src/app/enums/ville';
import { TypeEtablissement } from 'src/app/enums/type-etablissement';
import { EtablissementDto } from 'src/app/dto/etablissement-dto';

@Component({
  selector: 'app-create-etablissement',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-etablissement.component.html',
  styleUrls: ['./create-etablissement.component.scss']
})
export class CreateEtablissementComponent implements OnInit {

  createEtablissementForm: FormGroup;
  selectedFile: File | null = null;
  universites: Universite[] = [];

  provinces = Object.values(Province);
  villes = Object.values(Ville);
  typesEtablissements = Object.values(TypeEtablissement);


  constructor(
    private formBuilder: FormBuilder,
    private etablissementService: EtablissementService,
    private universiteService: UniversiteService,
    private router: Router
  ) {
    this.createEtablissementForm = this.formBuilder.group({
      universiteId: ['', Validators.required], 
      nomEtablissement: ['', Validators.required],
      imageUrl: ['', Validators.required],
      localisation: ['', Validators.required],
      condition: ['', Validators.required],
      proceduresCandidature: ['', Validators.required],
      calendrier: ['', Validators.required],
      typeEtablissement: ['', Validators.required],
      adresse: this.formBuilder.group({
        province: ['', Validators.required],
        ville: ['', Validators.required],
      })
    });
  }

  ngOnInit() {
    this.getUniversites();
  }


  public getUniversites(): void {
    this.universiteService.getUniversites().subscribe(
      (response: Universite[]) => {
        console.log(response);
        this.universites = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  onSelectFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      this.createEtablissementForm.patchValue({ imageUrl: file.name });
    }
  }

  onSubmit(): void {
    console.log('Form submitted');
    if (this.createEtablissementForm.valid) {
      console.log(this.createEtablissementForm.value)
      const formValue = this.createEtablissementForm.value;
      const etablissementToAdd: EtablissementDto = {
        nomEtablissement: formValue.nomEtablissement,
        imageUrl: this.selectedFile ? this.selectedFile.name : undefined,
        localisation: formValue.localisation,
        condition: formValue.condition,
        proceduresCandidature: formValue.proceduresCandidature,
        calendrier: formValue.calendrier,
        typeEtablissement: formValue.typeEtablissement,
        adresse: {
          province: formValue.adresse.province,
          ville: formValue.adresse.ville,
        }
      };
  
      const universiteId = formValue.universiteId;
  
      this.etablissementService.addEtablissement(etablissementToAdd, universiteId).subscribe(
        response => {
          console.log('Etablissement created successfully', response);
          this.router.navigate(['/admin/admin-dashboard/etablissement']);
        },
        error => {
          console.error('Error creating etablissement', error);
        }
      );
    }
  }

}
