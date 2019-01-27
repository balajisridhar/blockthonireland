import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.blockathon.hse{
   export class MedicalAsset extends Asset {
      assetId: string;
      value: string;
      equipType: string;
      equipName: string;
      pic: PersonInCharge;
      wardId: WardRfid;
      hospital: Hospital;
   }
   export class PersonInCharge extends Participant {
      participantId: string;
      firstName: string;
      lastName: string;
      participantRole: string;
   }
   export class Hospital extends Participant {
      hospitalId: string;
      address: string;
      name: string;
   }
   export class WardRfid extends Participant {
      emitterId: string;
      hospital: Hospital;
   }
   export class changePicTransaction extends Transaction {
      asset: MedicalAsset;
      newPIC: PersonInCharge;
   }
   export class changeWardTransaction extends Transaction {
      asset: MedicalAsset;
      newWardId: WardRfid;
   }
   export class HandOverEvent extends Event {
      asset: MedicalAsset;
      newPIC: PersonInCharge;
      oldPIC: PersonInCharge;
   }
   export class ChangeWardEvent extends Event {
      asset: MedicalAsset;
      oldWardId: WardRfid;
      newWardId: WardRfid;
   }
// }
