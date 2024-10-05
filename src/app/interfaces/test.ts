import { Etudiant } from "./etudiant";

export interface Test {

    id: number;
    titre: string;
    description: string;
    duree: string;
    etudiant: Etudiant | number;
}
