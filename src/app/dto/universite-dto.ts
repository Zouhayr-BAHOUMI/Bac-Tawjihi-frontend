import { Province } from "../enums/province";
import { Region } from "../enums/region";
import { Ville } from "../enums/ville";

export interface UniversiteDto {
    id?: number; 
    imageUrl: string;
    nomUniversite: string;
    adresse: {
        region: Region;
        province: Province;
        ville: Ville;
    };
}
