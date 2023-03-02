import { LightningElement, api, track, wire } from 'lwc';
import search from '@salesforce/apex/SearchController.search';
import multiSearch from '@salesforce/apex/SearchController.multiSearch';
import getRecentlyCreatedRecord from '@salesforce/apex/SearchController.getRecentlyCreatedRecord';
const DELAY = 10;
import { } from 'lightning/navigation'

export default class SearchComponent extends LightningElement {
    @api valueId;
    @api valueName;

    @api objName = 'Contact';
    @api iconName = 'standard:contact';
    @api labelName;
    @api currentRecordId;
    @api placeholder = 'Search';
    @api fields = ['Name'];
    @api displayFields = 'Name, Total_Hours_Available_Per_Week__c, Remaining_Hours_per_Week__c';
    @api showLabel = false;
    @api parentAPIName = 'ParentId';
    @api createRecord = false;

    /* values to be passed to create the new record */
    @api recordTypeId;
    @api fieldsToCreate = [];

    /* Create fields for using in Datatable for Multiple In-line Edit */
    @api index;

    @track error;

    // Fields for single-field search
    searchTerm;
    // Fields for multi-field search
    searchHour;
    searchBudget;

    delayTimeout;

    searchRecords;
    selectedRecord;
    objectLabel;
    isLoading = false;
    allowShowButton = false;
    
    
    allowShowModal = false;
    allowCreateNewRecord = false;
    showModal = this.allowCreateNewRecord && this.allowShowModal;
    showButton = this.allowShowButton && this.allowCreateNewRecord;

    field;
    field1;
    field2;


    ICON_URL = '/apexpages/slds/latest/assets/icons/{0}-sprite/svg/symbols.svg#{1}';
    ICON_URL_NEW = '/apexpages/slds/latest/assets/icons/utility-sprite/svg/symbols.svg#add';
    ICON_URL_CLOSE = '/apexpages/slds/latest/assets/icons/utility-sprite/svg/symbols.svg#close';

    connectedCallback() {

        let icons = this.iconName.split(':');
        this.ICON_URL = this.ICON_URL.replace('{0}', icons[0]);
        this.ICON_URL = this.ICON_URL.replace('{1}', icons[1]);

        if (this.objName.includes('__c')) {
            let obj = this.objName.substring(0, this.objName.length - 3);
            this.objectLabel = obj.replaceAll('_', ' ');
        } else {
            this.objectLabel = this.objName;
        }

        if (this.valueId && this.valueName) {
            this.selectedRecord = {
                FIELD1: this.valueName,
                Id: this.valueId
            }
        }

        this.objectLabel = this.titleCase(this.objectLabel);
        let fieldList;
        if (!Array.isArray(this.displayFields)) {
            fieldList = this.displayFields.split(',');
        } else {
            fieldList = this.displayFields;
        }
        if (fieldList.length > 1) {
            this.field = fieldList[0].trim();
            this.field1 = fieldList[1].trim();
        }
        if (fieldList.length > 2) {
            this.field2 = fieldList[2].trim();
        }
        let combinedFields = [];
        fieldList.forEach(field => {
            if (!this.fields.includes(field.trim())) {
                combinedFields.push(field.trim());
            }
        });

        this.fields = combinedFields.concat(JSON.parse(JSON.stringify(this.fields)));

        if (this.valueId && this.valueName) {
            this.selectedRecord = {
                FIELD1: this.valueName,
                recordId: this.valueId
            }
        }

    }

    updateInputChange(event) {
        const fieldName = event.target.label;
        this[fieldName] = event.target.value;
    }

    // Triggered when user clicks on search button. Search base on multiple fields
    handleMultiSearch(event) {
        console.log('Start multi search');
        window.clearTimeout(this.delayTimeout);
        const rate = this['searchBudget']/this['searchHour'];
        const filterString = 'Remaining_Hours_per_Week__c >= ' + this['searchHour'].toString() + ' AND ' + 'Max_Hourly_Rate__c <= ' + rate.toString();
        console.log(filterString);
        // calling the search function from Apex class
        multiSearch({
            objectName: this.objName,
            fields: 'Id, Name, Max_Hourly_Rate__c, Remaining_Hours_per_Week__c',
            filters: filterString
        })
            .then(result => {
                console.log(result);

                let stringResult = JSON.stringify(result);
                let allResult = JSON.parse(stringResult);
                allResult.forEach(record => {
                    record.FIELD1 = record['Name'];
                    record.FIELD2 = ('$' + record['Max_Hourly_Rate__c']).substring(0,7);
                    record.FIELD3 = record['Remaining_Hours_per_Week__c'] +'hr';
                });
                this.searchRecords = allResult;
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                this.allowShowButton = this.createRecord;
            });
        // this.delayTimeout = setTimeout(() => {
        // }, DELAY);
    }

    handleInputChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
            //if(searchKey.length >= 2){
            search({
                objectName: this.objName,
                fields: this.fields,
                searchTerm: searchKey
            })
                .then(result => {
                    console.log(result);
                    let stringResult = JSON.stringify(result);
                    let allResult = JSON.parse(stringResult);
                    allResult.forEach(record => {
                        record.FIELD1 = record[this.field];
                        record.FIELD2 = record[this.field1];
                        if (this.field2) {
                            record.FIELD3 = record[this.field2];
                        } else {
                            record.FIELD3 = '';
                        }
                    });
                    this.searchRecords = allResult;
                })
                .catch(error => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    this.allowShowButton = this.createRecord;
                });
            //}
        }, DELAY);
    }

    handleSelect(event) {

        let recordId = event.currentTarget.dataset.recordId;
        let selectRecord = this.searchRecords.find((item) => {
            return item.Id === recordId;
        });
        this.selectedRecord = selectRecord;
        const selectedEvent = new CustomEvent('lookup', {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: {
                data: {
                    record: selectRecord,
                    recordId: recordId,
                    currentRecordId: this.currentRecordId,
                    parentAPIName: this.parentAPIName,
                    index: this.index
                }
            }
        });
        this.dispatchEvent(selectedEvent);
    }

    handleClose() {
        this.selectedRecord = undefined;
        this.searchRecords = undefined;
        this.allowShowButton = false;
        const selectedEvent = new CustomEvent('lookup', {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: {
                data: {
                    record: undefined,
                    recordId: undefined,
                    currentRecordId: this.currentRecordId,
                    parentAPIName: this.parentAPIName,
                    index: this.index
                }
            }
        });
        this.dispatchEvent(selectedEvent);
    }

    titleCase(string) {
        var sentence = string.toLowerCase().split(" ");
        for (var i = 0; i < sentence.length; i++) {
            sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
        return sentence;
    }

    handleNewRecord = event => {
        event.preventDefault();
        this.allowShowModal = true;
    }

    handleCancel = event => {
        event.preventDefault();
        this.allowShowModal = false;
    }

    handleSuccess = event => {
        event.preventDefault();
        this.allowShowModal = false;
        let recordId = event.detail.id;
        this.hanleCreatedRecord(recordId);
    }

    hanleCreatedRecord = (recordId) => {
        getRecentlyCreatedRecord({
            recordId: recordId,
            fields: this.fields,
            objectName: this.objName
        })
            .then(result => {
                if (result) {
                    this.selectedRecord = {
                        FIELD1: result[this.field],
                        Id: recordId
                    };
                    const selectedEvent = new CustomEvent('lookup', {
                        bubbles: true,
                        composed: true,
                        cancelable: true,
                        detail: {
                            data: {
                                record: this.selectedRecord,
                                recordId: recordId,
                                currentRecordId: this.currentRecordId,
                                parentAPIName: this.parentAPIName,
                                index: this.index
                            }
                        }
                    });
                    this.dispatchEvent(selectedEvent);
                }
            })
            .catch(error => {
                console.error('Error: \n ', error);
            })
            .finally(() => {
                this.allowShowModal = false;
            });
    }
}