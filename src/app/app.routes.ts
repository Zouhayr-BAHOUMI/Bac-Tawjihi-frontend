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
import { ListQuestionComponent } from './pages/admin/questions/list-question/list-question.component';
import { CreateQuestionComponent } from './pages/admin/questions/create-question/create-question.component';
import { EditQuestionComponent } from './pages/admin/questions/edit-question/edit-question.component';
import { UserDashboardComponent } from './pages/etudiant/user-dashboard/user-dashboard.component';
import { UpdateProfileComponent } from './pages/etudiant/profile/update-profile/update-profile.component';
import { ResetPasswordComponent } from './pages/etudiant/profile/reset-password/reset-password.component';
import { PackEtudiantInfoComponent } from './pages/etudiant/pack-etudiant-info/pack-etudiant-info.component';
import { QuizQuestionComponent } from './pages/etudiant/quiz-question/quiz-question.component';
import { AllEtablissementComponent } from './shared/compenants/landing-page/all-etablissement/all-etablissement.component';
import { AboutUsComponent } from './shared/compenants/landing-page/about-us/about-us.component';
import { ParticiperComponent } from './shared/compenants/landing-page/participer/participer.component';

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
        { path: 'test/edit/:idTest', component: EditTestComponent },
        { path: 'test/:idTest/questions', component: ListQuestionComponent },
        { path: 'test/:idTest/questions/create', component: CreateQuestionComponent }, 
        { path: 'test/:idTest/questions/edit/:idQuestion', component: EditQuestionComponent }
    ] },
    { path: 'user/user-dashboard', component: UserDashboardComponent, children : [
        { path: '', component: UpdateProfileComponent },
        { path: 'update-profile', component: UpdateProfileComponent },
        { path: 'reset-password', component: ResetPasswordComponent },
    ] },
    { path: 'student-details/:idPack', component: PackEtudiantInfoComponent },
    { path: 'question-list/:id', component: QuizQuestionComponent },
    { path: 'all-etablissements', component: AllEtablissementComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'participer', component: ParticiperComponent },


];
