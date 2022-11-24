import { LightningElement, api } from 'lwc';

export default class PortfolioEducationCard extends LightningElement {

    @api item

    openModal = false;

    connectedCallback() {}
    
    closeModal() {
        this.openModal = false;
    }

    showModal(){
        this.openModal = true;
    }
}