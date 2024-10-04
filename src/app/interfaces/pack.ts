import { PackFiliere } from "../enums/pack-filiere";
import { StatusPack } from "../enums/status-pack";
import { TypePack } from "../enums/type-pack";

export interface Pack {

    id: number;
    nomPack: string;
    typePack: TypePack;
    packFilieres: PackFiliere[];
    statusPack: StatusPack;
    contenu: string;
    prix: number;
    dateLimit: string;
    
}
