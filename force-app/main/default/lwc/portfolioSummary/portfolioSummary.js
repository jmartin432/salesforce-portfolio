import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Portfolio__c.Name';
import SUMMARY_FIELD from '@salesforce/schema/Portfolio__c.Summary__c';

const FIELDS = [NAME_FIELD, SUMMARY_FIELD];

export default class PortfolioSummary extends LightningElement {
    @api portfolioId;

    @wire(getRecord, { recordId: '$portfolioId', fields: FIELDS })
    header

    connectedCallback(){}

    renderedCallback(){
        //console.log("header: ", this.header.data)
    }

    get name() {
        return getFieldValue(this.header.data, NAME_FIELD);
    }

    get summary() {
        return getFieldValue(this.header.data, SUMMARY_FIELD);
    }
}