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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MedicalAssetService } from './MedicalAsset.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-medicalasset',
  templateUrl: './MedicalAsset.component.html',
  styleUrls: ['./MedicalAsset.component.css'],
  providers: [MedicalAssetService]
})
export class MedicalAssetComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  assetId = new FormControl('', Validators.required);
  value = new FormControl('', Validators.required);
  equipType = new FormControl('', Validators.required);
  equipName = new FormControl('', Validators.required);
  pic = new FormControl('', Validators.required);
  wardId = new FormControl('', Validators.required);
  hospital = new FormControl('', Validators.required);

  constructor(public serviceMedicalAsset: MedicalAssetService, fb: FormBuilder) {
    this.myForm = fb.group({
      assetId: this.assetId,
      value: this.value,
      equipType: this.equipType,
      equipName: this.equipName,
      pic: this.pic,
      wardId: this.wardId,
      hospital: this.hospital
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceMedicalAsset.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.blockathon.hse.MedicalAsset',
      'assetId': this.assetId.value,
      'value': this.value.value,
      'equipType': this.equipType.value,
      'equipName': this.equipName.value,
      'pic': this.pic.value,
      'wardId': this.wardId.value,
      'hospital': this.hospital.value
    };

    this.myForm.setValue({
      'assetId': null,
      'value': null,
      'equipType': null,
      'equipName': null,
      'pic': null,
      'wardId': null,
      'hospital': null
    });

    return this.serviceMedicalAsset.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'assetId': null,
        'value': null,
        'equipType': null,
        'equipName': null,
        'pic': null,
        'wardId': null,
        'hospital': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.blockathon.hse.MedicalAsset',
      'value': this.value.value,
      'equipType': this.equipType.value,
      'equipName': this.equipName.value,
      'pic': this.pic.value,
      'wardId': this.wardId.value,
      'hospital': this.hospital.value
    };

    return this.serviceMedicalAsset.updateAsset(form.get('assetId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceMedicalAsset.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceMedicalAsset.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'assetId': null,
        'value': null,
        'equipType': null,
        'equipName': null,
        'pic': null,
        'wardId': null,
        'hospital': null
      };

      if (result.assetId) {
        formObject.assetId = result.assetId;
      } else {
        formObject.assetId = null;
      }

      if (result.value) {
        formObject.value = result.value;
      } else {
        formObject.value = null;
      }

      if (result.equipType) {
        formObject.equipType = result.equipType;
      } else {
        formObject.equipType = null;
      }

      if (result.equipName) {
        formObject.equipName = result.equipName;
      } else {
        formObject.equipName = null;
      }

      if (result.pic) {
        formObject.pic = result.pic;
      } else {
        formObject.pic = null;
      }

      if (result.wardId) {
        formObject.wardId = result.wardId;
      } else {
        formObject.wardId = null;
      }

      if (result.hospital) {
        formObject.hospital = result.hospital;
      } else {
        formObject.hospital = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'assetId': null,
      'value': null,
      'equipType': null,
      'equipName': null,
      'pic': null,
      'wardId': null,
      'hospital': null
      });
  }

}
