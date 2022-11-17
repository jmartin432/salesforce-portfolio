public class ContactFormEmailOwner {

    @InvocableMethod (label = 'Contact Form Email Owner' description = 'Emails record own on contact form submission.')
    public static List<String> contactFormEmailOwner(List<String> req) {
        
        Messaging.reserveSingleEmailCapacity(1);

        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {'info@justinlmartin.com'}; 
        //String[] ccAddresses = new String[] {'smith@gmail.com'};

        mail.setToAddresses(toAddresses);
        //mail.setCcAddresses(ccAddresses);

        mail.setReplyTo('info@justinlmartin.com');

        mail.setSenderDisplayName('Justin L. Martin Salesforce');

        // Specify the subject line for your email address.
        mail.setSubject('New Contact Form Submission');

        // Set to True if you want to BCC yourself on the email.
        mail.setBccSender(false);

        // Optionally append the Salesforce email signature to the email.
        // The email address of the user executing the Apex Code will be used.
        mail.setUseSignature(false);

        // Specify the text content of the email.
        mail.setPlainTextBody('New Submission');

        //mail.setHtmlBody('Your case:<b> ' + case.Id +' </b>has been created.<p>'+
         //   'To view your case <a href=https://MyDomainName.my.salesforce.com/'+case.Id+'>click here.</a>');

        // Send the email you have created.
        Messaging.SendEmailResult[] result = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });

        if (result[0].success) {
            System.debug('The email was sent successfully.');
        } else {
            System.debug('The email failed to send: '+ result[0].errors[0].message);
        }
        
        List<String> response = new String[1];
        response[0] = 'well done';
        return response;
    }
}
