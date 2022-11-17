import { LightningElement, api } from 'lwc';

export default class PortfolioModal extends LightningElement {

    @api imageSource
    @api award

    closeModal() {
        let evt = new Event('closemodal')
        this.dispatchEvent(evt)
    }
}