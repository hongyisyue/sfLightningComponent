import { LightningElement, api, wire, track } from 'lwc';

export default class SelectedRecord extends LightningElement {
    handleRemove = (event) => {
        event.preventDefault();
        const closeEvent = new CustomEvent('close', {
            bubbles    : true,
            composed   : true,
            cancelable : true,
            detail: {
                data : {
                    record     : undefined,
                    recordId   : undefined
                }
            }
        });
        this.dispatchEvent(closeEvent);
    }

    @api obj;
    @api recordid;
    // not working yet, can dynamic update fields to display
    @api fields;
    // @track dfields
    // = [
    //     "Name",
    //     'AccountId',
    //     "Email",
    //     'Max_Hourly_Rate__c',
    //     'Active_Credentials__c',
    //     'Remaining_Hours_per_Week__c',
    // ];

    connectedCallback() {
        this.template.addEventListener(
            'selected',
            this.handleEvent.bind(this) 
        )
    }

    handleEvent(event) {
        // this.selectedObjName = event.objName;
        // this.selectedRecordId = event.recordId;
        // this.selectDisplayFields = event.fields;
    }
}