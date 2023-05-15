import { api, LightningElement,track} from 'lwc';
import search from '@salesforce/apex/SearchController.search';
import getRecentlyCreatedRecord from '@salesforce/apex/SearchController.getRecentlyCreatedRecord';
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

    delayTimeout;

    searchRecords;
    selectedRecord;
    objectLabel;
    isLoading = false;
    showButton = false;
    showModal = false;

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

    titleCase(string) {
        var sentence = string.toLowerCase().split(" ");
        for (var i = 0; i < sentence.length; i++) {
            sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
        return sentence;
    }
}