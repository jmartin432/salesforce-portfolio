import { LightningElement, api } from 'lwc';

export default class PortfolioBody extends LightningElement {
    @api portfolioId
    @api staticResourcePath

    activeSections = []

    handleSectionToggle(event) {
        this.activeSections = event.detail.openSections
    }

    renderedCallback() {}
}