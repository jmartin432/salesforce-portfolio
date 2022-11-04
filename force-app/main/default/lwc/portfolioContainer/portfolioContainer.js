import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Portfolio__c.Name';
import SUMMARY_FIELD from '@salesforce/schema/Portfolio__c.Summary__c';

const FIELDS = [NAME_FIELD, SUMMARY_FIELD];
// guest user is able to access NAME_FIELD but not summary field. 
// logging user is able to access both, WTF?
// This link finall worked! YAY!
//https://developer.salesforce.com/forums/?id=906F00000008zfYIAQ

export default class PortfolioContainer extends LightningElement {
    portfolioId = 'a01Dn000004Q9rfIAC';

    connectedCallback(){}

    renderedCallback(){}
}