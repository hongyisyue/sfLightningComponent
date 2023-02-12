import { api, LightningElement} from 'lwc';

// Oppurtunity objects
import OPPO_OBJECT from '@salesforce/schema/Opportunity';
import OPPO_NAME from '@salesforce/schema/Opportunity.Name';
import OPPO_AMOUNT from '@salesforce/schema/Opportunity.Amount';

export default class MyFirstWebComponent extends LightningElement {

    // The current record ID
    @api recordId;
    fieldsToCreate = ['Name','Rating','Phone','Industry']
    fields        = ['Name'];

    // @api recordId;
    oppoObj = OPPO_OBJECT;
    oppoFields = [
        OPPO_NAME,
        OPPO_AMOUNT
    ];


    // The input change will affect the look up for the related record
    handleInputChange(event) {
        
    }
}