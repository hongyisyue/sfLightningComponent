import { LightningElement, api } from 'lwc';

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
    @api fields;
}