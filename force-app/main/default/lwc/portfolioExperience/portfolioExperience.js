import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { getFieldValue } from 'lightning/uiRecordApi';

const FIELDS = ['Experience__c.Name', 'Experience__c.Type__c', 'Experience__c.Organization__c', 'Experience__c.Role__c', 
'Experience__c.Start_Date__c', 'Experience__c.End_Date__c', 'Experience__c.Current__c',
'Experience__c.City__c', 'Experience__c.State__c', 'Experience__c.Bullet_Points__c',
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
        //sortBy: ['End_Date__c'],
        where: "{and: [{ Show__c: { eq: true }}, {Type__c: {eq: 'Professional'}}]}"
    })
    professional

    @wire(getRelatedListRecords, {
        parentRecordId: '$portfolioId',
        relatedListId: 'Experience__r',
        fields: FIELDS,
        //sortBy: ['End_Date__c'],
        where: "{and: [{ Show__c: { eq: true }}, {Type__c: {eq: 'Volunteer'}}]}"
    })
    volunteer

    formatExperience(item){
        console.log('yay2', item.fields.Role__c.value)
        return {
            id: item.fields.Name.value,
            role: item.fields.Role__c.value,
            organization: item.fields.Organization__c.value,
            location: (item.fields.City__c.value && item.fields.State__c.value) 
                ? `${item.fields.City__c.value}, ${item.fields.State__c.value}`
                : undefined,
            //dates: item.fields.Award__c.value,
            bulletPoints: (item.fields.Bullet_Points__c.value) ? item.fields.Bullet_Points__c.value.split('.') : undefined
        }
    }

    get formattedProfessional(){
        return this.professional.data.records.map(item => this.formatExperience(item))
    }

    get formattedVolunteer(){
        return this.volunteer.data.records.map(item => this.formatExperience(item))
    }

    connectedCallback(){}

    renderedCallback(){
        console.log('professional: ', this.professional)
        console.log('volunteer: ', this.volunteer)
    }
}