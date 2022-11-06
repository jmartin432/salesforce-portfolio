import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_FORM_OBJECT from '@salesforce/schema/Contact_Form__c';
import FULL_NAME_FIELD from '@salesforce/schema/Contact_Form__c.Full_Name__c';
import EMAIL_FIELD from '@salesforce/schema/Contact_Form__c.Email__c';
import MESSAGE_FIELD from '@salesforce/schema/Contact_Form__c.Message__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PortfolioContactForm extends LightningElement {
    renderedCallback(){
        console.log("Rendered")
    }

    accountId = undefined;
    fullName = '';
    email = '';
    message = '';

    handleFieldChange(event) {
        // this.accountRecord[event.target.name]
        if (event.target.label == 'Full Name'){
            this.fullName = event.target.value
        }
        if (event.target.label == 'Email'){
            this.email = event.target.value
        }
        if (event.target.label == 'Message'){
            this.message = event.target.value
        }
    }

    resetForm(){
        this.fullName = '';
        this.email = '';
        this.message = '';
        this.contactFormId = undefined;
        let inputs = this.template.querySelectorAll('lightning-input')
        inputs.forEach(input => input.setAttribute('value', ''))
    }

    submitForm() {
        console.log("trying to submit")
        const fields = {};
        fields[FULL_NAME_FIELD.fieldApiName] = this.fullName;
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        fields[MESSAGE_FIELD.fieldApiName] = this.message;
        const recordInput = { apiName: CONTACT_FORM_OBJECT.objectApiName, fields };

        console.log("submit: ", JSON.stringify(recordInput))
        //Used this tutorial to create a custom toast event.
       // https://cafeforce.com/custom-toast-notification-lwc-salesforce/
        createRecord(recordInput)
            .then((contactForm) => {
                this.contactFormId = contactForm.id;
                console.log("Submitted Form: ", this.contactFormId);
                this.template.querySelector('c-custom-toast-event').showToast('success', 'We submitted your request.');
                this.resetForm()
            })
            .catch((error) => {
                console.log(error)
                //Unauthenticated users get a 404 error when submitting this form even though the record is created.
                if (error.status === 404 & error.body.message === 'The requested resource does not exist'){
                    this.template.querySelector('c-custom-toast-event').showToast('success', 'We submitted your request.');
                    console.log("Submitted Form: ", this.contactFormId);
                    this.resetForm()
                } else {
                    this.template.querySelector('c-custom-toast-event').showToast('error', 'There was an error submitting your request');
                }
            });
    }
}