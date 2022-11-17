import { LightningElement, api } from 'lwc';

export default class PortfolioModal extends LightningElement {

    @api imageSource
    @api award

    imageLoading = true

    closeModal() {
        let evt = new Event('closemodal')
        this.dispatchEvent(evt)
    }

    imageLoaded() {
        this.imageLoading = false
    }
}