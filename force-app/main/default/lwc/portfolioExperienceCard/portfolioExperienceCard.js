import { LightningElement, api, wire, track } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

const FIELDS = ['Experience_Detail__c.Id', 'Experience_Detail__c.Text__c']

export default class PortfolioExperienceCard extends LightningElement {

    @api item;
    @track details = [];

    @wire(getRelatedListRecords, {
        parentRecordId: '$item.id',
        relatedListId: 'Experience_Details__r',
        fields: FIELDS,
        where: "{ Show__c: { eq: true }}"
    })setDetails({ error, data }) {
        if (data) {
            data.records.forEach((record) => this.details.push(record.fields.Text__c.value))
            this.error = undefined;
        } else if (error) {
            console.log(JSON.stringify(error, null, 2));
            this.error = error;
        }
    }

}