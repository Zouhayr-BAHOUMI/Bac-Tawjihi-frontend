import { TypeEtablissement } from "../enums/type-etablissement";
import { Adresse } from "./adresse";
import { Universite } from "./universite";

export interface Etablissement {

    id: number;
    nomEtablissement: string;
    imageUrl?: string;  
    localisation?: string;  
    condition: string;
    proceduresCandidature?: string;  
    calendrier?: string;  
    typeEtablissement: TypeEtablissement;
    universite?: Universite; 
    adresse?: Adresse;
}
