/**
 * @NApiVersion 2.1
 */

require(['N/email', 'N/record', 'N/file'], (email, record, file) => {
    const senderId = '<some sender id>';
    const recipientEmail = '<some email>'
    let timeStamp = new Date().getUTCMilliseconds();

    let recipient = record.create({
        type : record.Type.CUSTOMER,
        isDynamic : true
    });
    recipient.setValue({
        fieldId : 'subsidiary',
        value : '1'
    });
    recipient.setValue({
        fieldId : 'companyname',
        value : 'Test Company 0 ' + timeStamp
    });
    recipient.setValue({
        fieldId : 'email',
        value : recipientEmail
    });

    let recipientId = recipient.save();

    let fileObj = file.load({
        id : 88
    });

    email.send({
        author : senderId,
        recipients : recipientId,
        subject : 'Test Sample Email Module',
        body : 'email body',
        attachments : [fileObj],
        relatedRecords : {
            entityId : recipientId,
            customRecord : {
                id : '<custom recordId>',
                recordType : '<custom recordTypeId>'
            }
        }
    });
});