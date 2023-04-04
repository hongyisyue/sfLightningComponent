import { LightningElement, api, track } from 'lwc';

export default class SelectedRecord extends LightningElement {
    @api obj;
    @api recordid;
    @api fields;

    @track recordUrl
    
    connectedCallback() {
        this.recordUrl = '/lightning/r/Account/' + this.recordid + '/view';
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