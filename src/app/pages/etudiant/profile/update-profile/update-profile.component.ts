import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Etudiant } from 'src/app/interfaces/etudiant';
import { Region } from 'src/app/enums/region';
import { Province } from 'src/app/enums/province';
import { Ville } from 'src/app/enums/ville';
import { Sexe } from 'src/app/enums/sexe';
import { Specialite } from 'src/app/enums/specialite';
import { EtudiantService } from 'src/app/shared/services/etudiant.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit{

  updateProfileForm: FormGroup;
  etudiant: Etudiant = {} as Etudiant;
  regions = Object.values(Region);
  provinces = Object.values(Province);
  villes = Object.values(Ville);
  sexeOptions = Object.values(Sexe);
  specialiteOptions = Object.values(Specialite);
  selecteFile: File | null = null;
  
  constructor(
    private etudiantService: EtudiantService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateProfileForm = this.formBuilder.group({
      fullname: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', Validators.required],
      imageUrl: ['', Validators.required],
      sexe: ['', Validators.required],
      dateNaissence: ['', Validators.required],
      lieuNaissence: ['', Validators.required],
      tele: ['', Validators.required],
      specialite: ['', Validators.required],
      codeMassar: ['', Validators.required],
      adresse: this.formBuilder.group({
        region: ['', Validators.required],
        province: ['', Validators.required],
        ville: ['', Validators.required],
      })
    });
  }

  ngOnInit(): void {
      
      this.etudiantService.getEtudiantProfile().subscribe(
        (response: Etudiant) => {
          this.etudiant = response;

          const formattedDateNaissence = this.formatDate(response.dateNaissence);

          this.updateProfileForm.patchValue({
            
            fullname: this.etudiant.fullname, 
            email: this.etudiant.email,
            nom: this.etudiant.nom,
            prenom: this.etudiant.prenom,
            cin: this.etudiant.cin,
            imageUrl: this.etudiant.imageUrl,
            sexe: this.etudiant.sexe,
            dateNaissence: formattedDateNaissence,
            lieuNaissence: this.etudiant.lieuNaissence,
            tele: this.etudiant.tele,
            specialite: this.etudiant.specialite,
            codeMassar: this.etudiant.codeMassar,
            adresse: {
              region: this.etudiant.adresse?.region,
              province: this.etudiant.adresse?.province,
              ville: this.etudiant.adresse?.ville,
            }
          });
          console.log(response)
        },
        error => console.error(error)
      );

  }

  formatDate(dateArray: any): string {
    if (!dateArray) {
      return ''; 
    }
  
    if (!Array.isArray(dateArray)) {
      const date = new Date(dateArray);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
    const [year, month, day] = dateArray;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  onSelectFile(e: Event): void {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selecteFile = file;
      this.updateProfileForm.patchValue({ imageUrl: file.name });
    }
  }

  onSubmit(): void {
    if (this.updateProfileForm.valid) {
      const etudiantToUpdate: Etudiant = { 
        ...this.updateProfileForm.value, 
        imageUrl: this.selecteFile ? this.selecteFile.name : this.updateProfileForm.value.imageUrl
      };

      console.log(etudiantToUpdate)

      this.etudiantService.completeProfile( etudiantToUpdate).subscribe(
        response => {
          console.log('Etudiant updated successfully', response);
          this.router.navigate(['user/user-dashboard']);
        },
        error => console.error(error)
      );
    }
  }
}
