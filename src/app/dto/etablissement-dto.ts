import { Province } from "../enums/province";
import { Region } from "../enums/region";
import { TypeEtablissement } from "../enums/type-etablissement";
import { Ville } from "../enums/ville";
import { Universite } from "../interfaces/universite";

export interface EtablissementDto {

    id: number;
    nomEtablissement: string;
    imageUrl?: string;  
    localisation?: string;  
    condition: string;
    proceduresCandidature?: string;  
    calendrier?: string;  
    typeEtablissement: TypeEtablissement;
    universite?: Universite; 
    adresse: {
        region: Region;
        province: Province;
        ville: Ville;
    };
}
