import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbNav, NgbNavbar } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    SweetAlert2Module
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    SweetAlert2Module
  ]
})
export class SharedModule { }

