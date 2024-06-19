/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], function(serverWidget) {
    function myPrint() {
        window.print();
    }

    function onRequest(context) {
        if (context.request.method === 'GET'){
            context.response.writePage(form);
            var form = serverWidget.createForm({
                title : 'Enter Customer Information'
            });

            var userGroup = form.addFieldGroup({
                id : 'usergroup',
                label : 'User Information'
            });
            userGroup.isSingleColumn = true;

            var companyGroup = form.addFieldGroup({
                id : 'companygroup',
                label : 'Company Information'
            });

            form.addSubmitButton({
                label : 'Submit'
            });

            var select = form.addField({
                id : 'titlefield',
                type : serverWidget.FieldType.SELECT,
                label : 'Title',
                container : 'usergroup'
            });
            select.addSelectOption({
                value : 'Mr.',
                text : 'Mr.'
            });
            select.addSelectOption({
                value : 'Ms.',
                text : 'Ms.'
            });
            select.addSelectOption({
                value : 'Dr.',
                text : 'Dr.'
            });

            var fname = form.addField({
                id : 'fnamefield',
                type : serverWidget.FieldType.TEXT,
                label : 'First Name',
                container : 'usergroup'
            });
            fname.isMandatory = true;
            
            var lname = form.addField({
                id : 'lnamefield',
                type : serverWidget.FieldType.TEXT,
                label : 'Last Name',
                container : 'usergroup'
            });
            lname.isMandatory = true;

            form.addField({
                id : 'emailfield',
                type : serverWidget.FieldType.EMAIL,
                label : 'Email',
                container : 'usergroup'
            });

            var companyName = form.addField({
                id : 'companyfield',
                type : serverWidget.FieldType.TEXT,
                label : 'Company',
                container : 'companygroup'
            });
            companyName.defaultValue = 'Company Name';

            form.addField({
                id : 'phonefield',
                type : serverWidget.FieldType.PHONE,
                label : 'Phone Number',
                container : 'companygroup'
            });
            form.addField({
                id : 'urlfield',
                type  : serverWidget.FieldType.URL,
                label : 'Website',
                container : 'companygroup'
            });

            var tab1 = form.addTab({
                id : 'tab1id',
                label : 'Payment'
            });
            tab1.helpText = 'Help Text Goes Here';

            var tab2 = form.addTab({
                id : 'tab2id',
                label : 'Inventory'
            });

            form.addSubtab({
                id : 'subtab1id',
                label : 'Payment Information',
                tab : 'tab1id'
            });

            form.addSubtab({
                id : 'subtab2id',
                label : 'Transaction Record',
                tab : 'tab1id'
            });

            var ccselect = form.addField({
                id : 'cctypefield',
                type : serverWidget.FieldType.SELECT,
                label : 'Credit Card',
                container : 'subtab1id'
            });
            ccselect.addSelectOption({
                value : 'PayCard0',
                text : 'Payment Card 0'
            });
            ccselect.addSelectOption({
                value : 'PayCard1',
                text : 'Payment Card 1'
            });
            ccselect.addSelectOption({
                value : 'PayCard2',
                text : 'Payment Card 2'
            });

            var expmonth = form.addField({
                id : 'expmonth',
                type : serverWidget.FieldType.SELECT,
                label : 'Expiry Month',
                container : 'subtab1id'
            });

            expmonth.updateLayoutType({
                layoutType : serverWidget.FieldLayoutType.STARTROW
            });

            expmonth.addSelectOption({
                value : '01',
                text : 'Jan'
            });
            expmonth.addSelectOption({
                value : '02',
                text : 'Feb'
            });
            expmonth.addSelectOption({
                value : '03',
                text : 'Mar'
            });
            expmonth.addSelectOption({
                value : '04',
                text : 'Apr'
            });
            expmonth.addSelectOption({
                value : '05',
                text : 'May'
            });
            expmonth.addSelectOption({
                value : '06',
                text : 'Jun'
            });
            expmonth.addSelectOption({
                value : '07',
                text : 'Jul'
            });
            expmonth.addSelectOption({
                value : '08',
                text : 'Aug'
            });
            expmonth.addSelectOption({
                value : '09',
                text : 'Sep'
            });
            expmonth.addSelectOption({
                value : '10',
                text : 'Oct'
            });
            expmonth.addSelectOption({
                value : '11',
                text : 'Nov'
            });
            expmonth.addSelectOption({
                value : '12',
                text : 'Dec'
            });

            var expyear = form.addField({
                id : 'expyear',
                type : serverWidget.FieldType.SELECT,
                label : 'Expiry Year',
                container : 'subtab1id'
            });
            expyear.addSelectOption({
                value : '2020',
                text : '2020'
            });
            expyear.addSelectOption({
                value : '2019',
                text : '2019'
            });
            expyear.addSelectOption({
                value : '2018',
                text : '2018'
            });

            var credfield = form.addCredentialField({
                id : 'credfield',
                label : ' Credit Card Number',
                restrictToDomains : 'www.mysite.com',
                restrictToScriptIds : 'customscript_my_script',
                restrictToCurrentUser : false,
                container : 'subtab1id'
            });
            credfield.maxLength = 32;

            form.addField({
                id : 'transactionfield',
                type : serverWidget.FieldType.LABEL,
                label : 'Transaction History - Coming Soon',
                container : 'subtab2id'
            });

            form.addField({
                id : 'inventoryfield',
                type : serverWidget.FieldType.LABEL,
                label : ' Inventory - Coming Soon',
                container : 'subtab2id'
            });

            var sublist = form.addSublist({
                id : 'sublistid',
                type : serverWidget.SublistType.INLINEEDITOR,
                label : 'Inline Sublist',
                tab : 'tab2id'
            });

            sublist.addButton({
                id : 'buttonId',
                label : 'Print',
                functionName : myPrint
            });

            sublist.addField({
                id : 'datefieldid',
                type : serverWidget.FieldType.DATE,
                label : 'Date'
            });

            sublist.addField({
                id : 'productfieldid',
                type : serverWidget.FieldType.TEXT,
                label : 'Prodcut'
            });

            sublist.addField({
                id : 'qtyfieldid',
                type : serverWidget.FieldType.INTEGER,
                label : 'Quantity'
            });

            sublist.addField({
                id : 'upfieldid',
                type : serverWidget.FieldType.CURRENCY,
                label : 'Unit Cost'
            });

        } else {
            var delimiter = /\u0001/;
            var titleField = context.request.parameters.titlefield;
            var fnameField = context.request.parameters.fnamefield;
            var lnameField = context.request.parameters.lnamefield;
            var emailField = context.request.parameters.emailfield;
            var companyField = context.request.parameters.companyfield;
            var phoneField = context.request.parameters.phonefield;
            var urlField = context.request.parameters.urlfield;
            var ccField = context.request.parameters.cctypefield;
            var ccNumber = context.request.parameters.credfield;
            var expMonth = context.request.parameters.expmonth;
            var expYear = context.request.parameters.expyear;

            context.response.write('You have entered:'
                + '<br/> Name: ' + titleField + ' ' + fnameField + ' ' + lnameField
                + '<br/> Email: ' + emailField
                + '<br/> Company: ' + companyField
                + '<br/> Phone: ' + phoneField + ' Website: ' + urlField
                + '<br/> Credit Card: ' + ccField
                + '<br/> Number: ' + ccNumber
                + '<br/> Expiry Date: ' + expMonth + '/' + expYear);
        }
    }
    return {
        onRequest : onRequest
    }
});