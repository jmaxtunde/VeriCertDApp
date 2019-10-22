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
import { DegreeService } from './Degree.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-degree',
  templateUrl: './Degree.component.html',
  styleUrls: ['./Degree.component.css'],
  providers: [DegreeService]
})
export class DegreeComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  degreeId = new FormControl('', Validators.required);
  title = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);
  student = new FormControl('', Validators.required);
  employer = new FormControl('', Validators.required);
  prog = new FormControl('', Validators.required);

  constructor(public serviceDegree: DegreeService, fb: FormBuilder) {
    this.myForm = fb.group({
      degreeId: this.degreeId,
      title: this.title,
      owner: this.owner,
      student: this.student,
      employer: this.employer,
      prog: this.prog
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceDegree.getAll()
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
      $class: 'org.upnetwork.Degree',
      'degreeId': this.degreeId.value,
      'title': this.title.value,
      'owner': this.owner.value,
      'student': this.student.value,
      'employer': this.employer.value,
      'prog': this.prog.value
    };

    this.myForm.setValue({
      'degreeId': null,
      'title': null,
      'owner': null,
      'student': null,
      'employer': null,
      'prog': null
    });

    return this.serviceDegree.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'degreeId': null,
        'title': null,
        'owner': null,
        'student': null,
        'employer': null,
        'prog': null
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
      $class: 'org.upnetwork.Degree',
      'title': this.title.value,
      'owner': this.owner.value,
      'student': this.student.value,
      'employer': this.employer.value,
      'prog': this.prog.value
    };

    return this.serviceDegree.updateAsset(form.get('degreeId').value, this.asset)
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

    return this.serviceDegree.deleteAsset(this.currentId)
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

    return this.serviceDegree.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'degreeId': null,
        'title': null,
        'owner': null,
        'student': null,
        'employer': null,
        'prog': null
      };

      if (result.degreeId) {
        formObject.degreeId = result.degreeId;
      } else {
        formObject.degreeId = null;
      }

      if (result.title) {
        formObject.title = result.title;
      } else {
        formObject.title = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      if (result.student) {
        formObject.student = result.student;
      } else {
        formObject.student = null;
      }

      if (result.employer) {
        formObject.employer = result.employer;
      } else {
        formObject.employer = null;
      }

      if (result.prog) {
        formObject.prog = result.prog;
      } else {
        formObject.prog = null;
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
      'degreeId': null,
      'title': null,
      'owner': null,
      'student': null,
      'employer': null,
      'prog': null
      });
  }

}
