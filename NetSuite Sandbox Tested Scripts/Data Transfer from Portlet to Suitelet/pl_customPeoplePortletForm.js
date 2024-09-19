/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */

/**This is a Simple Form Portlet for Custom People Record */
define(['N/url', 'N/ui/serverWidget'], (url, serverWidget) => {
    function render(params) {
        // Portlet Contents
        let portlet = params.portlet;
        portlet.title = "Custom People Form"

        // Adding Fields to hold data
        let fnamefield = portlet.addField({
            id: 'firstname',
            label : 'First Name',
            type : serverWidget.FieldType.TEXT
        });
        let mnamefield = portlet.addField({
            id : 'middlename',
            label : 'Middle Name',
            type : serverWidget.FieldType.TEXT
        });
        let lnamefield = portlet.addField({
            id : 'lastname',
            label : 'Last Name',
            type : serverWidget.FieldType.TEXT
        });

        let birthdayfield = portlet.addField({
            id : 'birthday',
            label : 'Date of Birth',
            type : serverWidget.FieldType.DATE
        });
        let phonefield = portlet.addField({
            id : 'phone',
            label : 'Phone Number',
            type : serverWidget.FieldType.PHONE
        });

        // Retrieving the URL of the Suitelet that will save the Field Values to the Custom People Record
        let suiteletUrl = url.resolveScript({
            deploymentId :  'customdeploy_pl_submit_people',
            scriptId : 'customscript_pl_submit_people',
        });

        // The Submit Button of the Portlet passing the Field Values to the URL
        portlet.setSubmitButton({
            url : suiteletUrl,
            label : 'Submit'
        });
    }

    return {
        render : render
    };
});

