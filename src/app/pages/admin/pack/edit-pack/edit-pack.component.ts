import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pack } from 'src/app/interfaces/pack';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PackFiliere } from 'src/app/enums/pack-filiere';
import { StatusPack } from 'src/app/enums/status-pack';
import { TypePack } from 'src/app/enums/type-pack';
import { PackService } from 'src/app/shared/services/pack.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-pack',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-pack.component.html',
  styleUrls: ['./edit-pack.component.scss']
})
export class EditPackComponent implements OnInit {


  editPackForm: FormGroup;
  filieres: string[] = Object.values(PackFiliere); 
  selectedFilieres: string[] = [];
  statusPack = Object.values(StatusPack);
  typesPacks = Object.values(TypePack);

  idPack!: number;
  pack: Pack = {} as Pack;

  constructor(
    private packService: PackService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editPackForm = this.formBuilder.group({
      nomPack: ['', Validators.required],
      typePack: ['', Validators.required],
      contenu: ['', Validators.required],
      filierePack: [[], Validators.required], 
      prix: [0, [Validators.required, Validators.min(0)]],
      dateLimit: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.idPack = +params['idPack'];

      this.packService.getPackWithFilieres(this.idPack).subscribe(
        (response: Pack) => {
          console.log(response)
          this.pack = response;
          this.selectedFilieres = response.packFilieres;
          
          const formattedDateLimit = this.formatDate(response.dateLimit);
          
          this.editPackForm.patchValue({
            nomPack: response.nomPack,
            typePack: response.typePack,
            contenu: response.contenu,
            filierePack: response.packFilieres,
            prix: response.prix,
            dateLimit: formattedDateLimit
          });
        },
        error => {
          console.log('Error fetching pack:', error);
        }
      );
    });
  }

  onFiliereChange(event: any): void {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedFilieres.push(value);
    } else {
      this.selectedFilieres = this.selectedFilieres.filter(f => f !== value);
    }
  }

  formatDate(dateArray: any): string {
    const [year, month, day] = dateArray;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  onSubmit(): void {
    if (this.editPackForm.valid) {
      
      
  
      const packToUpdate = {
        ...this.editPackForm.value,
        packFilieres: this.selectedFilieres,
      };

      console.log(this.editPackForm.value)
  
      this.packService.updatePack(this.idPack, packToUpdate).subscribe(
        response => {
          console.log('Pack updated successfully', response);
          this.router.navigate(['/admin/admin-dashboard/pack']);
        },
        error => {
          console.error('Error updating pack', error);
        }
      );
    }
  }
  

}
