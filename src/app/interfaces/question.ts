import { Domain } from "../enums/domain";
import { Choix } from "./choix";

export interface Question {

    id?: number;
    contenuQuestion: string;
    domain: Domain;
    choix: Choix[];

}
