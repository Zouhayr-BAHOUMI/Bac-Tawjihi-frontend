import { Etudiant } from "./etudiant";
import { Pack } from "./pack";

export interface Recu {

    id: number;
  etudiant: Etudiant; 
  pack: Pack; 
  paymentIntentId: string; 
  status: string;
  paymentDate: string; 
  amountPaid: number;
}
