import { LightningElement} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';

// Oppurtunity objects
import OPPO_OBJECT from '@salesforce/schema/Opportunity';
import OPPO_NAME from '@salesforce/schema/Opportunity.Name';
import OPPO_AMOUNT from '@salesforce/schema/Opportunity.Amount';
// Contact objects
import CONTACT_OBECT from "@salesforce/schema/Contact";
// import CONTACT_ID from "@salesforce/schema/Contract.id";
import CONTACT_NAME from "@salesforce/schema/Contact.Name";
import CONTACT_EMAIL from "@salesforce/schema/Contact.Email";
import CONTACT_PROF from "@salesforce/schema/Contact.Profession__c";
import CONTACT_MAX_RATE_C from "@salesforce/schema/Contact.Max_Hourly_Rate__c";
import CONTACT_AVA_HOUR from "@salesforce/schema/Contact.Remaining_Hours_per_Week__c";

export default class MyFirstWebComponent extends LightningElement {

    fieldsToCreate = ['Name','Rating','Phone','Industry']
    fields        = ['Name'];
    handleLookup = (event) => {
        let data = event.detail.data;
        if(data && data.record){
            // populate the selected record in the correct parent Id field
            // this.allRecord[data.index][data.parentAPIName] = data.record.Id;
        }else{
            // clear the parent Id field
            //this.allRecord[data.index][data.parentAPIName] = undefined;
        }
    }

    // @api recordId;
    oppoObj = OPPO_OBJECT;
    oppoFields = [
        OPPO_NAME,
        OPPO_AMOUNT
    ];


    
    contactObj = CONTACT_OBECT;
    contactFields = [
        CONTACT_NAME,
        CONTACT_EMAIL,
        CONTACT_PROF,
        CONTACT_MAX_RATE_C,
        CONTACT_AVA_HOUR
    ]
    
    // need test
    // @wire(getRecord, { 
    //     recordId: recordId,
    //     fields: MyFirstWebComponent.oppoFields
    // })
}