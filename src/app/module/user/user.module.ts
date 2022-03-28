import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { SharedModule } from '@shared/shared.module';
import { userModuleReducersMap } from './state';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersListEffects } from './state/users-list/users.effects';


@NgModule({
  declarations: [
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    //TODO: store the feature key in a variable
    StoreModule.forFeature('userModule', userModuleReducersMap),
    EffectsModule.forFeature([UsersListEffects])
  ]
})
export class UserModule { }
