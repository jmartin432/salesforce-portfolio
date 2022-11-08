import { LightningElement, api } from 'lwc';

export default class PortfolioEducationCard extends LightningElement {

    @api item

    openModal = false;
    
    closeModal() {
        this.openModal = false;
    }

    showModal(){
        console.log('button clicked')
        console.log(this.item.imageSource)
        this.openModal = true;
    }
}