import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { AdfsComponent } from './adfs/adfs.component';




const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: AuthComponent },
    { path: 'adfs', component: AdfsComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AuthRoutingModule { }
export const routingComponents = [LoginComponent,AuthComponent,AdfsComponent]
