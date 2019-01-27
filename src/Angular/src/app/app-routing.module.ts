/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { MedicalAssetComponent } from './MedicalAsset/MedicalAsset.component';

import { PersonInChargeComponent } from './PersonInCharge/PersonInCharge.component';
import { HospitalComponent } from './Hospital/Hospital.component';
import { WardRfidComponent } from './WardRfid/WardRfid.component';

import { changePicTransactionComponent } from './changePicTransaction/changePicTransaction.component';
import { changeWardTransactionComponent } from './changeWardTransaction/changeWardTransaction.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'MedicalAsset', component: MedicalAssetComponent },
  { path: 'PersonInCharge', component: PersonInChargeComponent },
  { path: 'Hospital', component: HospitalComponent },
  { path: 'WardRfid', component: WardRfidComponent },
  { path: 'changePicTransaction', component: changePicTransactionComponent },
  { path: 'changeWardTransaction', component: changeWardTransactionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
