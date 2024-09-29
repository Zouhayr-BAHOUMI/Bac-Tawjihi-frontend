import { Routes } from '@angular/router';
import { WarraperComponent } from './shared/compenants/landing-page/warraper/warraper.component';
import { LoginComponent } from './auth/login/login.component';
import { MainContentComponent } from './shared/compenants/dashboard/main-content/main-content.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ListUniversiteComponent } from './pages/admin/universite/list-universite/list-universite.component';

export const routes: Routes = [

    { path: '', component: WarraperComponent },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'admin/admin-dashboard', component: AdminDashboardComponent, children : [
        { path: '', component: MainContentComponent },
        { path: 'universite', component: ListUniversiteComponent },
    ] }

];
