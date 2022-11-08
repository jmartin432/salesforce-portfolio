import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { getFieldValue } from 'lightning/uiRecordApi';

const FIELDS = ['Experience__c.Name', 'Experience__c.Type__c', 'Experience__c.Organization__c', 'Experience__c.Role__c', 
'Experience__c.Start_Date__c', 'Experience__c.End_Date__c', 'Experience__c.Current__c',
'Experience__c.City__c', 'Experience__c.State__c', 'Experience__c.Bullet_Points__c',
'Experience__c.Logo_Source__c']

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

export default class PortfolioExperience extends LightningElement {

    @api portfolioId;

    // To make an object publicly available to a site
    // 1. In the guest user profile, edit Custom Object Permissions
    // 2. In the guest user profile edit the Field Level Security (This option is not available when "editing" the profile.)

    @wire(getRelatedListRecords, {
        parentRecordId: '$portfolioId',
        relatedListId: 'Experience__r',
        fields: FIELDS,
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

    dateRange(start, end){
        console.log('end: ', end)
        return `${MONTH_MAP.get(start.slice(5, 7))} ${start.slice(0, 4)} - 
        ${(end) ? `${MONTH_MAP.get(end.slice(5, 7))} ${end.slice(0, 4)}`: `Present`}`
    }

    formatExperience(item){
        let today = new Date().toISOString().slice(0, 10)
        let test = {
            id: item.fields.Name.value,
            role: item.fields.Role__c.value,
            organization: item.fields.Organization__c.value,
            location: (item.fields.City__c.value && item.fields.State__c.value) 
                ? `${item.fields.City__c.value}, ${item.fields.State__c.value}`
                : undefined,
            startDate: item.fields.Start_Date__c.value,
            endDate: (item.fields.End_Date__c.value) ? item.fields.End_Date__c.value : new Date().toISOString().slice(0, 10),
            dateRange: this.dateRange(item.fields.Start_Date__c.value, item.fields.End_Date__c.value),
            bulletPoints: (item.fields.Bullet_Points__c.value) ? item.fields.Bullet_Points__c.value.split(':') : undefined
        }
        console.log(test.dateRange)
        return test
    }

    get formattedProfessional(){
        return this.professional.data.records.map(item => this.formatExperience(item))
        .sort((a, b) => (a.endDate > b.endDate ? -1 : 1));
    }

    get formattedVolunteer(){
        return this.volunteer.data.records.map(item => this.formatExperience(item))
        .sort((a, b) => (a.endDate > b.endDate ? -1 : 1));
    }

    connectedCallback(){}

    renderedCallback(){
        // console.log('professional: ', this.professional)
        // console.log('volunteer: ', this.volunteer)
    }
}