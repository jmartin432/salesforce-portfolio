import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import staticResources from '@salesforce/resourceUrl/PortfolioStaticResources'

const FIELDS = [
    'Portfolio_Links__c.Link_Name__c', 'Portfolio_Links__c.Show__c', 
    'Portfolio_Links__c.URL__c', 'Portfolio_Links__c.Icon_File_Name__c'
];

const STATIC_RESOURCE_PATH = `${staticResources}/PortfolioStaticResources/`


//https://developer.salesforce.com/forums/?id=906F00000008zfYIAQ

export default class PortfolioFooterIcons extends LightningElement {
    @api portfolioId

    @wire(getRelatedListRecords, {
        parentRecordId: '$portfolioId',
        relatedListId: 'Portfolio_Links__r',
        fields: FIELDS,
        where: "{ Show__c: { eq: true }}"
    })
    links

    connectedCallback(){}

    renderedCallback(){}

    formatRecord(item){
        return {
            name: item.fields.Link_Name__c.value,
            show: item.fields.Show__c.value,
            url: item.fields.URL__c.value,
            iconSource: `${STATIC_RESOURCE_PATH}${item.fields.Icon_File_Name__c.value}`
        }
    }

    get icons() {
        return this.links.data.records.map(item => this.formatRecord(item))
    }
}