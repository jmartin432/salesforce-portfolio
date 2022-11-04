import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import LINKEDIN_URL_FIELD from '@salesforce/schema/Portfolio__c.LinkedIn__c';
import LINKEDIN_SHOW_FIELD from '@salesforce/schema/Portfolio__c.Show_LinkedIn__c';
import LINKEDIN_LOGO_SOURCE_FIELD from '@salesforce/schema/Portfolio__c.LinkedIn_Logo_Source__c';
import TRAILHEAD_URL_FIELD from '@salesforce/schema/Portfolio__c.Trailhead__c';
import TRAILHEAD_SHOW_FIELD from '@salesforce/schema/Portfolio__c.Show_Trailhead__c';
import TRAILHEAD_LOGO_SOURCE_FIELD from '@salesforce/schema/Portfolio__c.Trailhead_Logo_Source__c';
import GITHUB_URL_FIELD from '@salesforce/schema/Portfolio__c.GitHub__c';
import GITHUB_SHOW_FIELD from '@salesforce/schema/Portfolio__c.Show_GitHub__c';
import GITHUB_LOGO_SOURCE_FIELD from '@salesforce/schema/Portfolio__c.GitHub_Logo_Source__c';
import WEBSITE_URL_FIELD from '@salesforce/schema/Portfolio__c.Website__c';
import WEBSITE_SHOW_FIELD from '@salesforce/schema/Portfolio__c.Show_Website__c';
import WEBSITE_LOGO_SOURCE_FIELD from '@salesforce/schema/Portfolio__c.Website_Logo_Source__c';


const FIELDS = [LINKEDIN_URL_FIELD, LINKEDIN_SHOW_FIELD, LINKEDIN_LOGO_SOURCE_FIELD,
    TRAILHEAD_URL_FIELD, TRAILHEAD_SHOW_FIELD, TRAILHEAD_LOGO_SOURCE_FIELD,
    GITHUB_URL_FIELD, GITHUB_SHOW_FIELD, GITHUB_LOGO_SOURCE_FIELD,
    WEBSITE_URL_FIELD, WEBSITE_SHOW_FIELD, WEBSITE_LOGO_SOURCE_FIELD];

//https://developer.salesforce.com/forums/?id=906F00000008zfYIAQ

export default class PortfolioFooterIcons extends LightningElement {
    @api portfolioId

    @wire(getRecord, { recordId: '$portfolioId', fields: FIELDS })
    links

    connectedCallback(){}

    renderedCallback(){
        console.log("footer icons: ", this.links.data)
    }

    get icons() {
        const iconList = [
            {
                name: 'LinkedIn',
                url: getFieldValue(this.links.data, LINKEDIN_URL_FIELD),
                show: getFieldValue(this.links.data, LINKEDIN_SHOW_FIELD),
                source: getFieldValue(this.links.data, LINKEDIN_LOGO_SOURCE_FIELD),
            },
            {
                name: 'Website',
                url: getFieldValue(this.links.data, WEBSITE_URL_FIELD),
                show: getFieldValue(this.links.data, WEBSITE_SHOW_FIELD),
                source: getFieldValue(this.links.data, WEBSITE_LOGO_SOURCE_FIELD),
            },
            {
                name: 'GitHub',
                url: getFieldValue(this.links.data, GITHUB_URL_FIELD),
                show: getFieldValue(this.links.data, GITHUB_SHOW_FIELD),
                source: getFieldValue(this.links.data, GITHUB_LOGO_SOURCE_FIELD),
            },
            {
                name: 'Trailhead',
                url: getFieldValue(this.links.data, TRAILHEAD_URL_FIELD),
                show: getFieldValue(this.links.data, TRAILHEAD_SHOW_FIELD),
                source: getFieldValue(this.links.data, TRAILHEAD_LOGO_SOURCE_FIELD),
            }
        ]
        console.log(iconList)
        return iconList.filter((icon) => icon.show);
    }
}