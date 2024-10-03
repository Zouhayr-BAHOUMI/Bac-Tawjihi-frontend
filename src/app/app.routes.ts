import { Routes } from '@angular/router';
import { WarraperComponent } from './shared/compenants/landing-page/warraper/warraper.component';
import { LoginComponent } from './auth/login/login.component';
import { MainContentComponent } from './shared/compenants/dashboard/main-content/main-content.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ListUniversiteComponent } from './pages/admin/universite/list-universite/list-universite.component';
import { CreateUniversiteComponent } from './pages/admin/universite/create-universite/create-universite.component';
import { EditUniversiteComponent } from './pages/admin/universite/edit-universite/edit-universite.component';
import { ListEtablissementComponent } from './pages/admin/etablissement/list-etablissement/list-etablissement.component';
import { CreateEtablissementComponent } from './pages/admin/etablissement/create-etablissement/create-etablissement.component';
import { EditEtablissementComponent } from './pages/admin/etablissement/edit-etablissement/edit-etablissement.component';

export const routes: Routes = [

    { path: '', component: WarraperComponent },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'admin/admin-dashboard', component: AdminDashboardComponent, children : [
        { path: '', component: MainContentComponent },
        { path: 'universite', component: ListUniversiteComponent },
        { path: 'universite/create', component: CreateUniversiteComponent },
        { path: 'universite/edit/:idUniversite', component: EditUniversiteComponent },
        { path: 'etablissement', component: ListEtablissementComponent },
        { path: 'etablissement/create', component: CreateEtablissementComponent },
        { path: 'etablissement/edit/:idetablissement', component: EditEtablissementComponent }
    ] }

];
