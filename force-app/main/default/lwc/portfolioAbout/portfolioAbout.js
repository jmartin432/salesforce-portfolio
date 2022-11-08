import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ABOUT_FIELD from '@salesforce/schema/Portfolio__c.About__c';
import HEADSHOT_SOURCE_FIELD from '@salesforce/schema/Portfolio__c.Headshot_Source__c';

const FIELDS = [ABOUT_FIELD, HEADSHOT_SOURCE_FIELD];

export default class PortfolioAbout extends LightningElement {
    @api portfolioId
    @api staticResourcePath

    imageLoading = true

    @wire(getRecord, { recordId: '$portfolioId', fields: FIELDS })
    about

    connectedCallback(){}

    renderedCallback(){
        //console.log("about: ", this.about.data)
    }

    imageLoaded(event){
        this.imageLoading = false;
        this.template.querySelector('.headshot-image').classList.remove('slds-hidden')
    }

    get text(){
        return getFieldValue(this.about.data, ABOUT_FIELD);
    }

    get headshotSource(){
        return getFieldValue(this.about.data, HEADSHOT_SOURCE_FIELD);
    }
}