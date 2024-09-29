import { Province } from "../enums/province";
import { Region } from "../enums/region";
import { Ville } from "../enums/ville";

export interface Adresse {
    id: number;
    region: Region;
    province: Province;
    ville: Ville;
}
