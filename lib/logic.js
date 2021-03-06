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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Record a granted degree
 * @param  {org.upnetwork.RecordDegree} recordDegree - the record degree transaction
 * @transaction
 */
function RecordDegree(recordDegree) {
    recordDegree.titulo.student = recordDegree.graduando;
    return getAssetRegistry('org.upnetwork.Degree')
      .then(function (assetRegistry) {
        return assetRegistry.update(recordDegree.titulo);
      });
}

/**
 * Record a granted degree
 * @param  {org.upnetwork.VerifyDegree} verifyDegree - the record degree transaction
 * @transaction
 */
function VerifyDegree(verifyDegree) {
  verifyDegree.titulo.employer = verifyDegree.empl;
  return getAssetRegistry('org.upnetwork.Degree')
    .then(function (assetRegistry) {
      return assetRegistry.update(verifyDegree.titulo);
    });
}
