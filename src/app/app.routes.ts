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
import { ListPackComponent } from './pages/admin/pack/list-pack/list-pack.component';
import { CreatePackComponent } from './pages/admin/pack/create-pack/create-pack.component';
import { EditPackComponent } from './pages/admin/pack/edit-pack/edit-pack.component';
import { ListTestComponent } from './pages/admin/test/list-test/list-test.component';
import { CreateTestComponent } from './pages/admin/test/create-test/create-test.component';
import { EditTestComponent } from './pages/admin/test/edit-test/edit-test.component';

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
        { path: 'etablissement/edit/:idEtablissement', component: EditEtablissementComponent },
        { path: 'pack', component: ListPackComponent },
        { path: 'pack/create', component: CreatePackComponent },
        { path: 'pack/edit/:idPack', component: EditPackComponent },
        { path: 'test', component: ListTestComponent },
        { path: 'test/create', component: CreateTestComponent },
        { path: 'test/edit/:idTest', component: EditTestComponent }
    ] }

];
