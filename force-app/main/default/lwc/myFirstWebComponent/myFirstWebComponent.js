import { api, LightningElement,track} from 'lwc';
const DELAY = 10;
import { } from 'lightning/navigation';

export default class MyFirstWebComponent extends LightningElement {

    // Fields for current selected Record
    @api recordId;
    currObjName = 'Opportunity'
    currDisplayFields = 
    [
        'Name',
        'Annual_SPED_Budget__c',
        'CurrencyIsoCode',
        'School_Year__c',
        'CloseDate'
    ];

    // Fields for searching component
    @api objName = 'Contact';
    @api iconName = 'standard:contact';
    @api labelName;
    @api currentRecordId;
    @api placeholder = 'Search';
    @api fields = ['Name'];
    @api showLabel = false;
    @api parentAPIName = 'ParentId';
    @api createRecord = false;

    /* values to be passed to create the new record */
    @api recordTypeId;
    @api fieldsToCreate = [];

    /* Create fields for using in Datatable for Multiple In-line Edit */
    @api index;

    @track error;

    delayTimeout;

    searchRecords;
    selectedRecord;
    objectLabel;
    isLoading = false;
    showButton = false;
    showModal = false;

    titleCase(string) {
        var sentence = string.toLowerCase().split(" ");
        for (var i = 0; i < sentence.length; i++) {
            sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
        return sentence;
    }
}