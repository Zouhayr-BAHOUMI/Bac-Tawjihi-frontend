import { Province } from "../enums/province";
import { Region } from "../enums/region";
import { Sexe } from "../enums/sexe";
import { Specialite } from "../enums/specialite";
import { Ville } from "../enums/ville";
import { Adresse } from "./adresse";
import { User } from "./user";

export interface Etudiant extends User{

    id: number;
    nom: string;
    prenom: string;
    cin: string;
    imageUrl: string;
    sexe: Sexe; 
    dateNaissence: string; 
    lieuNaissence: string;
    tele: string;
    specialite: Specialite; 
    codeMassar: string;
    adresse: {
        region : Region
        province: Province;
        ville: Ville;

    };

}
