import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./module/auth/auth.module').then(m => m.AuthModule) },
  { path: 'account', loadChildren: () => import('./module/account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard] },
  { path: 'users', loadChildren: () => import('./module/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
