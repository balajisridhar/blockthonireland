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

/* global getAssetRegistry getFactory emit */

/**
 * Transfers the responsibility of asset
 * @param {org.blockathon.hse.changePicTransaction} tx The sample transaction instance.
 * @transaction
 */
async function changePicTransaction(tx) {  // eslint-disable-line no-unused-vars

    // Save the old value of the asset.
    const oldValue = tx.asset.pic;

    // Update the asset with the new value.
    tx.asset.pic = tx.newPIC;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.blockathon.hse.MedicalAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.blockathon.hse', 'HandOverEvent');
    event.asset = tx.asset;
    event.oldPIC = oldValue;
    event.newPIC = tx.newPIC;
    emit(event);
}



/**
 * Transfers the responsibility of asset
 * @param {org.blockathon.hse.changeWardTransaction} tx The sample transaction instance.
 * @transaction
 */
async function changePicAndWardTransaction(tx) {  // eslint-disable-line no-unused-vars

    // Save the old value of the asset.
    const oldValue = tx.asset.wardId;

    // Update the asset with the new value.
    tx.asset.wardId = tx.newWardId;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.blockathon.hse.MedicalAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.blockathon.hse', 'ChangeWardEvent');
    event.asset = tx.asset;
    event.oldWardId = oldValue;
    event.newWardId = tx.newWardId;
    emit(event);
}