import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { getFieldValue } from 'lightning/uiRecordApi';
// import ORGANIZATION_FIELD from '@salesforce/schema/Experience__c.Organization__c';
// import TYPE_FIELD from '@salesforce/schema/Experience__c.Type__c'

const FIELDS = ['Experience__c.Name', 'Experience__c.Type__c', 'Experience__c.Organization__c', 'Experience__c.Role__c', 
'Experience__c.Start_Date__c', 'Experience__c.End_Date__c', 'Experience__c.Current__c',
'Experience__c.City__c, Experience__c.State__c', 'Experience__c.Bullet_Points__c',
'Experience__c.Logo_Source__c']

export default class PortfolioExperience extends LightningElement {

    @api portfolioId;

    // To make an object publicly available to a site
    // 1. In the guest user profile, edit Custom Object Permissions
    // 2. In the guest user profile edit the Field Level Security (This option is not available when "editing" the profile.)

    @wire(getRelatedListRecords, {
        parentRecordId: '$portfolioId',
        relatedListId: 'Experience__r',
        fields: FIELDS,
        sortBy: ['End_Date__c'],
        where: "{ Show__c: { eq: true }}"
    })
    experience

    get professional(){
        let p = []
        for (let i = 0; i < this.experience.data.records.length; i++) {
            let item = this.experience.data.records[i]
            if (item.fields.Type__c.value === 'Professional') {
                p.push(item)
            }
        }
        return JSON.stringify(p)
    }

    get volunteer(){
        let v = []
        for (let i = 0; i < this.experience.data.records.length; i++) {
            let item = this.experience.data.records[i]
            if (item.fields.Type__c.value === 'Volunteer') {
                v.push(item)
            }
        }
        return JSON.stringify(v)
    }

    connectedCallback(){}

    renderedCallback(){
        console.log('professional: ', this.professional)
        console.log('volunteer: ', this.volunteer)
    }
}