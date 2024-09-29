import { Adresse } from "./adresse";

export interface Universite {
    id: number;
    imageUrl: string;
    nomUniversite: string;
    adresse: Adresse;
}
