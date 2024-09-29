import { Routes } from '@angular/router';
import { WarraperComponent } from './shared/compenants/landing-page/warraper/warraper.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [

    { path: '', component: WarraperComponent },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },

];
