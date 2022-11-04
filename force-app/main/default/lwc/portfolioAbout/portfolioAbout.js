import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ABOUT_FIELD from '@salesforce/schema/Portfolio__c.About__c';

const FIELDS = [ABOUT_FIELD];

export default class PortfolioAbout extends LightningElement {
    @api portfolioId
    @api staticResourcePath

    @wire(getRecord, { recordId: '$portfolioId', fields: FIELDS })
    about

    connectedCallback(){}

    renderedCallback(){
        console.log("about: ", this.about.data)
    }

    get text(){
        return getFieldValue(this.about.data, ABOUT_FIELD);
    }
}