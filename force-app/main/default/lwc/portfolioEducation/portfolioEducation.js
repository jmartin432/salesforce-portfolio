import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { getFieldValue } from 'lightning/uiRecordApi';
// import ORGANIZATION_FIELD from '@salesforce/schema/Education__c.Organization__c';
// import TYPE_FIELD from '@salesforce/schema/Education__c.Type__c'

const FIELDS = ['Education__c.Name', 'Education__c.Type__c', 'Education__c.Organization__c', 
'Education__c.Award__c', 'Education__c.Award_Date__c', 'Education__c.Award_Is_Expected__c', 
'Education__c.City__c', 'Education__c.State__c', 'Education__c.Bullet_Points__c',
'Education__c.Image_Source__c', 'Education__c.Logo_Source__c']

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

    formatEducation(item){
        console.log('yay', item)
        return {
            id: item.fields.Name.value,
            organization: item.fields.Organization__c.value,
            location: (item.fields.City__c.value && item.fields.State__c.value) 
                ? `${item.fields.City__c.value}, ${item.fields.State__c.value}`
                : undefined,
            award: item.fields.Award__c.value,
            bulletPoints: (item.fields.Bullet_Points__c.value) ? item.fields.Bullet_Points__c.value.split('.') : undefined
        }
    }

    get formattedDegrees(){
        return this.degrees.data.records.map(item => this.formatEducation(item))
    }

    get formattedCertificates(){
        return this.certificates.data.records.map(item => this.formatEducation(item))
    }

    // get degrees(){
    //     let d = []
    //     for (let i = 0; i < this.education.data.records.length; i++) {
    //         let item = this.education.data.records[i]
    //         if (item.fields.Type__c.value === 'Degree') {
    //             d.push(item)
    //         }
    //     }
    //     return JSON.stringify(d)
    // }

    // get certificates(){
    //     let c = []
    //     for (let i = 0; i < this.education.data.records.length; i++) {
    //         let item = this.education.data.records[i]
    //         if (item.fields.Type__c.value === 'Certificate') {
    //             c.push(item)
    //         }
    //     }
    //     return JSON.stringify(c)
    // }

    connectedCallback(){}

    renderedCallback(){
        console.log('degrees: ', this.degrees)
        console.log('certificates: ', this.certificates)
    }
}