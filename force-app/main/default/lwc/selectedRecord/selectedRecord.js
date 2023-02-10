import { LightningElement, api } from 'lwc';

export default class SelectedRecord extends LightningElement {
    @api iconUrl;
    @api objectLabel;
    @api record;
    @api index;
    @api showLabel = false;
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
}