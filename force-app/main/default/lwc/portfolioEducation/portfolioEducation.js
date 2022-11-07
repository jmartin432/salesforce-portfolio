import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { getFieldValue } from 'lightning/uiRecordApi';
// import ORGANIZATION_FIELD from '@salesforce/schema/Education__c.Organization__c';
// import TYPE_FIELD from '@salesforce/schema/Education__c.Type__c'

const FIELDS = ['Education__c.Name', 'Education__c.Type__c', 'Education__c.Organization__c', 
'Education__c.Award__c', 'Education__c.Award_Date__c', 'Education__c.Award_Is_Expected__c', 
'Education__c.City__c', 'Education__c.State__c', 'Education__c.Bullet_Points__c',
'Education__c.Image_Source__c', 'Education__c.Logo_Source__c']

const MONTH_MAP = new Map([
    ['01', 'January'],
    ['02', 'February'],
    ['03', 'March'],
    ['04', 'April'],
    ['05', 'May'],
    ['06', 'June'],
    ['07', 'July'],
    ['08', 'August'],
    ['09', 'September'],
    ['10', 'October'],
    ['11', 'November'],
    ['12', 'December']
])

export default class PortfolioEducation extends LightningElement {

    @api portfolioId;

    // To make an object publicly available to a site
    // 1. In the guest user profile, edit Custom Object Permissions
    // 2. In the guest user profile edit the Field Level Security (This option is not available when "editing" the profile.)

    @wire(getRelatedListRecords, {
        parentRecordId: '$portfolioId',
        relatedListId: 'Education__r',
        fields: FIELDS,
        sortBy: ['Award_Date__c'],
        where: "{and: [{ Show__c: { eq: true }}, {Type__c: {eq: 'Degree'}}]}"
    })
    degrees

    @wire(getRelatedListRecords, {
        parentRecordId: '$portfolioId',
        relatedListId: 'Education__r',
        fields: FIELDS,
        sortBy: ['Award_Date__c'],
        where: "{and: [{ Show__c: { eq: true }}, {Type__c: {eq: 'Certificate'}}]}"
    })
    certificates

    awardDate(date){
        return `${MONTH_MAP.get(date.slice(5, 7))} ${date.slice(0, 4)}`
    }

    formatEducation(item){
        console.log('yay', item)
        return {
            id: item.fields.Name.value,
            organization: item.fields.Organization__c.value,
            location: (item.fields.City__c.value && item.fields.State__c.value) 
                ? `${item.fields.City__c.value}, ${item.fields.State__c.value}`
                : undefined,
            award: item.fields.Award__c.value,
            awardDate: this.awardDate(item.fields.Award_Date__c.value),
            bulletPoints: (item.fields.Bullet_Points__c.value) ? item.fields.Bullet_Points__c.value.split(':') : undefined
        }
    }

    get formattedDegrees(){
        return this.degrees.data.records.map(item => this.formatEducation(item))
        .sort((a, b) => (a.awardDate > b.awardDate ? -1 : 1));
    }

    get formattedCertificates(){
        return this.certificates.data.records.map(item => this.formatEducation(item))
        .sort((a, b) => (a.awardDate > b.awardDate ? -1 : 1));
    }

    connectedCallback(){}

    renderedCallback(){
        console.log('degrees: ', this.degrees)
        console.log('certificates: ', this.certificates)
    }
}