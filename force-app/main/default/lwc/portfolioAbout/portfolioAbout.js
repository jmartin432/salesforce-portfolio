import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import staticResources from '@salesforce/resourceUrl/PortfolioStaticResources'
import ABOUT_FIELD from '@salesforce/schema/Portfolio__c.About__c';
import HEADSHOT_FILE_NAME_FIELD from '@salesforce/schema/Portfolio__c.Headshot_File_Name__c';

const FIELDS = [ABOUT_FIELD, HEADSHOT_FILE_NAME_FIELD];
const STATIC_RESOURCE_PATH = `${staticResources}/PortfolioStaticResources/`

export default class PortfolioAbout extends LightningElement {
    @api portfolioId

    imageLoading = true

    @wire(getRecord, { recordId: '$portfolioId', fields: FIELDS })
    about

    connectedCallback(){}

    renderedCallback(){}

    imageLoaded(event){
        this.imageLoading = false;
        this.template.querySelector('.headshot-image').classList.remove('slds-hidden')
    }

    get text(){
        return getFieldValue(this.about.data, ABOUT_FIELD);
    }

    get headshotSource(){
        return `${STATIC_RESOURCE_PATH}${getFieldValue(this.about.data, HEADSHOT_FILE_NAME_FIELD)}`
    }
}