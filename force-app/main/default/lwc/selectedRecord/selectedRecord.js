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

    placementData;
    placementCol = [
        {
            type: 'url',
            fieldName: 'Id',
            label: 'ID',
            hideDefaultActions: true,
            typeAttributes: {
                label: 'Id',
                target: '_blank',
                tooltip: { fieldName: 'website' }
            },
            initialWidth: 80
        },
        {
            type: 'text',
            fieldName: 'Name',
            label: 'Name',
            hideDefaultActions: true
        },
        {
            type: 'text',
            fieldName: 'Placement_Status__c',
            label: 'Placement Status',
            hideDefaultActions: true
        },
        {
            type: 'text',
            fieldName: 'Placement_Stage__c',
            label: 'Placeement Stage',
            hideDefaultActions: true
        },
        {
            type: 'url',
            fieldName: 'Service_Requirements__c',
            label: 'Service Requirements',
            hideDefaultActions: true,
            typeAttributes: {
                label: 'Requirement Detail',
                target: '_blank',
                tooltip: { fieldName: 'website' }
            },
        }
    ];
    getTypeAttributes(rowData, column) {
        const link = rowData[column.fieldName].substring(66, 84);

        return {
          label: link,
          target: '_blank'
        }
    }

    connectedCallback() {
        this.recordUrl = '/lightning/r/Account/' + this.recordid + '/view';
    }

    fetchContactPlacement() {
        getContactPlacement({Id: this.recordid}).then(result => {
            if (result && result.length > 0) {
                const data = result[0];
                if (data['Placements__r']) {
                    let allResult = data['Placements__r'];
                    allResult.forEach(p => {
                        p.Id = 'https://tinyeyetech.lightning.force.com/lightning/r/Placement__c/' + p['Id'] + '/view';
                        p.Service_Requirements__c = 'https://tinyeyetech.lightning.force.com/lightning/r/Service_Requirements__c/' + p['Service_Requirements__c'] + '/view';
                    });
                    this.placementData = allResult;
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
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