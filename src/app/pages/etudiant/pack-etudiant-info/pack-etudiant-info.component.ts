import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PackService } from 'src/app/shared/services/pack.service';
import { Pack } from 'src/app/interfaces/pack';
import { Etudiant } from 'src/app/interfaces/etudiant';
import { ReactiveFormsModule } from '@angular/forms';
import { EtudiantService } from 'src/app/shared/services/etudiant.service';
import { StripeService } from 'src/app/shared/services/stripe.service';
import { PaymentConfirmationDto } from 'src/app/dto/payment-confirmation-dto';
import { PaymentRequestDto } from 'src/app/dto/payment-request-dto';

declare var Stripe: any;

@Component({
  selector: 'app-pack-etudiant-info',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './pack-etudiant-info.component.html',
  styleUrls: ['./pack-etudiant-info.component.scss']
})
export class PackEtudiantInfoComponent implements OnInit {

  etudiant!: Etudiant;
  pack!: Pack;
  stripe: any; 
  cardElement: any;

  constructor(
    private route: ActivatedRoute,
    private etudiantService: EtudiantService,
    private stripeService: StripeService,
    private router: Router
  ) {
    this.stripe = Stripe('pk_test_51PzGf0P4SnkdAPO0JtNIXHM1B6jxCPDouTdmplUy8XHSsg4NPFgRbc6xjCVx9KRV8aEz7qd7NkkcVvHX6ZoQKOvj00mKpdu15c');
  }

  ngOnInit(): void {
    const idPack = this.route.snapshot.params['idPack'];
    this.selectPack(idPack);
  }

  ngAfterViewInit(): void {
    this.setupStripeElement(); 
  }

  setupStripeElement(): void {
    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element'); 
  }

  selectPack(idPack: number): void {
    this.etudiantService.selectPack(idPack).subscribe(
      (response: any) => {
        this.etudiant = response.etudiant;
        this.pack = response.pack;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  pay(): void {
    const paymentRequest: PaymentRequestDto = {
      amount: this.pack.prix,
      currency: 'mad',
      description: `Payment for ${this.pack.typePack} by ${this.etudiant.nom} ${this.etudiant.prenom}`
    };

    this.stripeService.createPaymentIntent(paymentRequest).subscribe(
      (response: { clientSecret: string }) => {
        const clientSecret = response.clientSecret;

  
        this.stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.cardElement,
            billing_details: {
              name: `${this.etudiant.nom} ${this.etudiant.prenom}`,
              email: this.etudiant.email,
            },
          }
        }).then((result: any) => { 
          if (result.error) {
            console.error(result.error.message);
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              const confirmationDto: PaymentConfirmationDto = {
                paymentIntentId: result.paymentIntent.id,
                etudiant: this.etudiant,
                pack: this.pack
              };

              console.log('Payment Confirmation DTO:', confirmationDto);

              this.stripeService.confirmPayment(confirmationDto).subscribe(
                (recu) => {
                  
                  this.router.navigate(['/recu', { idEtudiant: recu.etudiant.id, idPack: recu.pack.id }]);
                },
                (error) => {
                  console.error('Error confirming payment:', error);
                }
              );
            }
          }
        });
      },
      (error) => {
        console.error('Error creating payment intent:', error);
      }
    );
  }



  cancel(): void {
    this.router.navigate(['']); 
  }

}
