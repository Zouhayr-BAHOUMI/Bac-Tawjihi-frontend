import { Etudiant } from "../interfaces/etudiant";
import { Pack } from "../interfaces/pack";

export interface PaymentConfirmationDto {

    paymentIntentId: string; 
    etudiant: Etudiant; 
    pack: Pack;
}
