import { api, LightningElement} from 'lwc';

// Oppurtunity objects
// import OPPO_OBJECT from '@salesforce/schema/Opportunity';
// import OPPO_NAME from '@salesforce/schema/Opportunity.Name';
// import OPPO_AMOUNT from '@salesforce/schema/Opportunity.Amount';

export default class MyFirstWebComponent extends LightningElement {

    // The current record ID
    @api recordId;
    objName = 'Opportunity'
    displayFields = 
    [
        'Name',
        'Annual_SPED_Budget__c',
        'CurrencyIsoCode',
        'School_Year__c',
        'CloseDate'
    ]


    // The input change will affect the look up for the related record
    handleInputChange(event) {
        
    }
}