/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget'], (serverWidget) => {
    function onRequest(context) {
        if (context.request.method === 'GET') {
            // Create Form Body
            let form = serverWidget.createForm({
                title : 'Church Member Information'
            });

            let memberinfo = form.addFieldGroup({
                id : 'memberinfo',
                label : 'Member Information'
            });

            let churchinfo = form.addFieldGroup({
                id : 'churchinfo',
                label : 'Church Information'
            });

            form.addSubmitButton({
                label : 'Submit'
            });

            // Member Information Field Group Fields
            let fnamefield = form.addField({
                id : 'fnamefield',
                type : serverWidget.FieldType.TEXT,
                label : 'First Name',
                container : 'memberinfo'
            });
            fnamefield.isMandatory = true;

            let lnamefield = form.addField({
                id : 'lnamefield',
                type : serverWidget.FieldType.TEXT,
                label : 'Last Name',
                container : 'memberinfo'
            });
            lnamefield.isMandatory = true;

            let emailfield = form.addField({
                id : 'emailfield',
                type : serverWidget.FieldType.EMAIL,
                label : 'Email',
                container : 'memberinfo'
            });

            let baptismdatefield = form.addField({
                id : 'baptismdatefield',
                type : serverWidget.FieldType.DATE,
                label : 'Date of Baptism',
                container : 'memberinfo'
            });
            baptismdatefield.isMandatory = true;

            let tithefield = form.addField({
                id : 'tithefield',
                type : serverWidget.FieldType.INTEGER,
                label : 'Tither Envelope No.',
                container : 'memberinfo'
            });

            let isactivefield = form.addField({
                id : 'isactivefield',
                type : serverWidget.FieldType.CHECKBOX,
                label : 'Active',
                container : 'memberinfo'
            });
            isactivefield.defaultValue = 'T';

            // Church Information Field Group Fields
            let churchselectfield = form.addField({
                id : 'churchselectfield',
                type : serverWidget.FieldType.SELECT,
                label : 'Church Name',
                container : 'churchinfo'
            });

            churchselectfield.addSelectOption({
                value : 'Open Door Baptist Church of Bataan',
                text : 'Open Door Baptist Church of Bataan'
            });
            churchselectfield.addSelectOption({
                value : 'Open Door Baptist Church of Angeles City',
                text : 'Open Door Baptist Church of Angeles City'
            });
            churchselectfield.addSelectOption({
                value : 'Higher Ground Baptist Church',
                text : 'Higher Ground Baptist Church'
            });
            churchselectfield.addSelectOption({
                value : 'New Life Bible Baptist Church',
                text : 'New Life Bible Baptist Church'
            });
            churchselectfield.isMandatory = true;

            let pastorfield = form.addField({
                id : 'pastorfield',
                type : serverWidget.FieldType.TEXT,
                label : 'Senior Pastor',
                container : 'churchinfo'
            });

            // Tabs for Sublists
            let tithetab = form.addTab({
                id : 'tithetab',
                label : 'Tithes'
            });

            let missionstab = form.addTab({
                id : 'missionstab',
                label : 'Missions Giving'
            });

            let sacrificialtab = form.addTab({
                id : 'sacrificialtab',
                label : 'Sacrificial Giving'
            });

            // Tithes Sublist
            let tsublist = form.addSublist({
                id : 'tithelist',
                type : serverWidget.SublistType.INLINEEDITOR,
                label : 'Tithes Record',
                tab : 'tithetab'
            });

            tsublist.addField({
                id : 'tithedate',
                type : serverWidget.FieldType.DATE,
                label : 'DATE'
            });
            tsublist.addField({
                id : 'amountfield',
                type : serverWidget.FieldType.CURRENCY,
                label : 'Amount'
            });

            // Missions Giving Sublist
            let msublist = form.addSublist({
                id : 'missionslist',
                type : serverWidget.SublistType.INLINEEDITOR,
                label : 'Missions Giving Record',
                tab : 'missionstab'
            });

            msublist.addField({
                id : 'tithedate',
                type : serverWidget.FieldType.DATE,
                label : 'DATE'
            });
            msublist.addField({
                id : 'amountfield',
                type : serverWidget.FieldType.CURRENCY,
                label : 'Amount'
            });

            // Sacrificial Giving Sublist
            let ssublist = form.addSublist({
                id : 'sacrificiallist',
                type : serverWidget.SublistType.INLINEEDITOR,
                label : 'Sacrificial Giving Record',
                tab : 'sacrificialtab'
            });

            ssublist.addField({
                id : 'tithedate',
                type : serverWidget.FieldType.DATE,
                label : 'DATE'
            });
            ssublist.addField({
                id : 'amountfield',
                type : serverWidget.FieldType.CURRENCY,
                label : 'Amount'
            });

            context.response.writePage(form);
        } else {
            let delimiter = /\u0001/;
            let fnameField = context.request.parameters.fnamefield;
            let lnameField = context.request.parameters.lnamefield;
            let emailField = context.request.parameters.emailfield;
            let baptismDateField = context.request.parameters.baptismdatefield;
            let titheField = context.request.parameters.tithefield;
            let churchSelectField = context.request.parameters.churchselectfield;
            let pastorField = context.request.parameters.pastorfield;

            context.response.write('You have entered:'
                + '<br/> Name: ' + fnameField + ' ' + lnameField
                + '<br/> Email: ' + emailField
                + '<br/> Date of Baptism: ' + baptismDateField
                + '<br/> Tithes No.: ' + titheField
                + '<br/> Church: ' + churchSelectField
                + '<br/> Pastor: ' + pastorField
            );
        }
    }

    return {
        onRequest : onRequest
    };
});
