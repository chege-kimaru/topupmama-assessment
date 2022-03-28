import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from '@shared/shared.module';
import { accountModuleReducersMap } from './state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from './state/account.effects';


@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    //TODO: store the feature key in a variable
    StoreModule.forFeature('accountModule', accountModuleReducersMap),
    EffectsModule.forFeature([AccountEffects])
  ]
})
export class AccountModule { }
