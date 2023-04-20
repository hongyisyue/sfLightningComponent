import { LightningElement, api, track, wire } from 'lwc';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// import PLACEMENT_NAME_FIELD from '@salesforce/schema/Contact.Placement__c.Name';
import getContactPlacement from '@salesforce/apex/SearchController.getContactPlacement';

export default class SelectedRecord extends LightningElement {
    @api obj;
    @api fields;
    @api
    get recordid() {
        return this._recordid;
    }
    set recordid(value) {
        this._recordid = value;
        this.fetchContactPlacement();
    }

    @track recordUrl;
    @track _recordid;

    connectedCallback() {
        this.recordUrl = '/lightning/r/Account/' + this.recordid + '/view';
    }

    fetchContactPlacement() {
        getContactPlacement({Id: this.recordid}).then(result => {
            this.placement = result;
            console.log(result);
        })
    }
    
    handleRemove = (event) => {
        event.preventDefault();
        const closeEvent = new CustomEvent('close', {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: {
                data: {
                    record: undefined,
                    recordId: undefined
                }
            }
        });
        this.dispatchEvent(closeEvent);
    }
}