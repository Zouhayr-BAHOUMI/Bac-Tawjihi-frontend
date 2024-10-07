import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentConfirmationDto } from 'src/app/dto/payment-confirmation-dto';
import { PaymentRequestDto } from 'src/app/dto/payment-request-dto';
import { Recu } from 'src/app/interfaces/recu';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private baseUrl = 'http://localhost:8082/etudiant/paiments'; 

  constructor(private http: HttpClient) {}

  createPaymentIntent(paymentRequest: PaymentRequestDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-payment`, paymentRequest);
  }

  confirmPayment(confirmationDto: PaymentConfirmationDto): Observable<Recu> {
    return this.http.post<Recu>(`${this.baseUrl}/confirm-payment`, confirmationDto);
  }
}
