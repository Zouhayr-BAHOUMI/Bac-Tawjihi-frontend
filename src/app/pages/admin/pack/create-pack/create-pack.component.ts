import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackService } from 'src/app/shared/services/pack.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PackFiliere } from 'src/app/enums/pack-filiere';
import { StatusPack } from 'src/app/enums/status-pack';
import { TypePack } from 'src/app/enums/type-pack';
import { Pack } from 'src/app/interfaces/pack';

@Component({
  selector: 'app-create-pack',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-pack.component.html',
  styleUrls: ['./create-pack.component.scss']
})
export class CreatePackComponent {

  createPackForm: FormGroup;
  filieres: string[] = Object.values(PackFiliere); 
  selectedFilieres: string[] = [];

  statusPack = Object.values(StatusPack);
  typesPacks = Object.values(TypePack);

  constructor(
    private packService: PackService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createPackForm = this.formBuilder.group({
      nomPack: ['', Validators.required],
      typePack: ['', Validators.required],
      contenu: ['', Validators.required],
      filierePack : ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      dateLimit: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFiliereChange(event: any): void {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedFilieres.push(value);
    } else {
      this.selectedFilieres = this.selectedFilieres.filter(f => f !== value);
    }
  }

  onSubmit(): void {
    if (this.createPackForm.valid) {

      const packToAdd = {
        ...this.createPackForm.value,
          packFilieres: this.selectedFilieres
      };

      console.log(packToAdd)
      this.packService.addPack(packToAdd).subscribe(
        response => {
          console.log('Pack created successfully', response);
          this.router.navigate(['/admin/admin-dashboard/pack']);
        },
        error => {
          console.error('Error creating pack', error);
        }
      );
    }
  }

}
