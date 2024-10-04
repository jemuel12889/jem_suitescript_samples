/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

/*
This is a sample Customer Form provided in the NetSuite Documentation and is repurposed for "Church Member Information"
This is intented only to demonstrate the creation of a Suitelet
The "Church Member Form" gets the entered values of the fields and displays them as results in another page
*/

define(['N/ui/serverWidget'], (serverWidget) => {
    function onRequest(context) {
        if (context.request.method === 'GET') {
            // Create Form Body
            let form = serverWidget.createForm({
                title : 'Church Member Information'
            });

            // Field Group for Member Information (Name, Birthday, Email...)
            let memberinfo = form.addFieldGroup({
                id : 'memberinfo',
                label : 'Member Information'
            });

            // Field Group for Church Information (Church Name and Senior Pastor)
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
            fnamefield.updateLayoutType({
                layoutType : serverWidget.FieldLayoutType.STARTROW
            });

            let lnamefield = form.addField({
                id : 'lnamefield',
                type : serverWidget.FieldType.TEXT,
                label : 'Last Name',
                container : 'memberinfo'
            });
            lnamefield.isMandatory = true;
            lnamefield.updateLayoutType({
                layoutType : serverWidget.FieldLayoutType.ENDROW
            });

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
            baptismdatefield.updateLayoutType({
                layoutType : serverWidget.FieldLayoutType.STARTROW
            });
            baptismdatefield.updateBreakType({
                breakType : serverWidget.FieldBreakType.STARTCOL
            });

            let tithefield = form.addField({
                id : 'tithefield',
                type : serverWidget.FieldType.INTEGER,
                label : 'Tither Envelope No.',
                container : 'memberinfo'
            });
            tithefield.updateLayoutType({
                layoutType : serverWidget.FieldLayoutType.STARTROW
            });

            let isactivefield = form.addField({
                id : 'isactivefield',
                type : serverWidget.FieldType.CHECKBOX,
                label : 'Active',
                container : 'memberinfo'
            });
            isactivefield.defaultValue = 'T';
            isactivefield.updateLayoutType({
                layoutType : serverWidget.FieldLayoutType.MIDROW
            });

            // Church Information Field Group Fields
            let churchselectfield = form.addField({
                id : 'churchselectfield',
                type : serverWidget.FieldType.SELECT,
                label : 'Church Name',
                container : 'churchinfo'
            });

            // Added custom Select Options to add to the Select Field
            churchselectfield.addSelectOption({
                value : 0,
                text : 'Open Door Baptist Church of Bataan'
            });
            churchselectfield.addSelectOption({
                value : 1,
                text : 'Open Door Baptist Church of Angeles City'
            });
            churchselectfield.addSelectOption({
                value : 2,
                text : 'Higher Ground Baptist Church'
            });
            churchselectfield.addSelectOption({
                value : 3,
                text : 'New Life Bible Baptist Church'
            });
            churchselectfield.isMandatory = true;

            // Tabs for Sublists
            // These tabs contain identical Sublists for recording "donations"
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

            // Storing Field values to display as a Suitelet Response to a Post Request
            let delimiter = /\u0001/;
            let fnameField = context.request.parameters.fnamefield;
            let lnameField = context.request.parameters.lnamefield;
            let emailField = context.request.parameters.emailfield;
            let baptismDateField = context.request.parameters.baptismdatefield;
            let titheField = context.request.parameters.tithefield;
            let churchSelectField = context.request.parameters.churchselectfield.value;

            let resultForm = serverWidget.createForm({
                title : 'Church Member Information'
            });

            let memberinfo = resultForm.addFieldGroup({
                id : 'memberinfo',
                label : 'Member Information'
            });

            let churchinfo = resultForm.addFieldGroup({
                id : 'churchinfo',
                label : 'Church Information'
            });

            resultForm.addSubmitButton({
                label : 'Submit'
            });

            // Member Information Field Group Fields
            let firstnamefield = resultForm.addField({
                id : 'fnamefield',
                type : serverWidget.FieldType.TEXT,
                label : 'First Name',
                container : 'memberinfo'
            });
            firstnamefield.defaultValue = fnameField;
            firstnamefield.updateLayoutType({
                layoutType : serverWidget.FieldLayoutType.STARTROW
            });
            firstnamefield.updateDisplayType({
                displayType : serverWidget.FieldDisplayType.INLINE
            });

            let lastnamefield = resultForm.addField({
                id : 'lnamefield',
                type : serverWidget.FieldType.TEXT,
                label : 'Last Name',
                container : 'memberinfo'
            });
            lastnamefield.defaultValue = lnameField;
            lastnamefield.updateLayoutType({
                layoutType : serverWidget.FieldLayoutType.ENDROW
            });
            lastnamefield.updateDisplayType({
                displayType : serverWidget.FieldDisplayType.INLINE
            });

            let emailadfield = resultForm.addField({
                id : 'emailfield',
                type : serverWidget.FieldType.EMAIL,
                label : 'Email',
                container : 'memberinfo'
            });
            emailadfield.defaultValue = emailField;
            emailadfield.updateDisplayType({
                displayType : serverWidget.FieldDisplayType.INLINE
            });

            let baptismaldatefield = resultForm.addField({
                id : 'baptismdatefield',
                type : serverWidget.FieldType.DATE,
                label : 'Date of Baptism',
                container : 'memberinfo'
            });
            baptismaldatefield.defaultValue = baptismDateField;
            baptismaldatefield.updateLayoutType({
                layoutType : serverWidget.FieldLayoutType.STARTROW
            });
            baptismaldatefield.updateBreakType({
                breakType : serverWidget.FieldBreakType.STARTCOL
            });
            baptismaldatefield.updateDisplayType({
                displayType : serverWidget.FieldDisplayType.INLINE
            });

            let tithesfield = resultForm.addField({
                id : 'tithefield',
                type : serverWidget.FieldType.INTEGER,
                label : 'Tither Envelope No.',
                container : 'memberinfo'
            });
            tithesfield.defaultValue = titheField;
            tithesfield.updateLayoutType({
                layoutType : serverWidget.FieldLayoutType.STARTROW
            });
            tithesfield.updateDisplayType({
                displayType : serverWidget.FieldDisplayType.INLINE
            });

            let isactivefield = resultForm.addField({
                id : 'isactivefield',
                type : serverWidget.FieldType.CHECKBOX,
                label : 'Active',
                container : 'memberinfo'
            });
            isactivefield.defaultValue = 'T';
            isactivefield.updateLayoutType({
                layoutType : serverWidget.FieldLayoutType.MIDROW
            });

            // Church Information Field Group Fields
            //
            // ***THIS SECTION DOES NOT WORK***
            //
            // let churchlistselectfield = resultForm.addField({
            //     id : 'churchselectfield',
            //     type : serverWidget.FieldType.TEXT,
            //     label : 'Church Name',
            //     container : 'churchinfo'
            // });
            // churchlistselectfield.updateDisplayType({
            //     displayType : serverWidget.FieldDisplayType.INLINE
            // });
            
            // let pastorfield = resultForm.addField({
            //     id : 'pastorfield',
            //     type : serverWidget.FieldType.TEXT,
            //     label : 'Senior Pastor',
            //     container : 'churchinfo'
            // });
            // pastorfield.updateDisplayType({
            //     displayType : serverWidget.FieldDisplayType.INLINE
            // });

            // if (churchSelectField === 0) {
            //     churchlistselectfield.defaultValue = 'Open Door Baptist Church of Bataan';
            //     pastorfield.defaultValue = 'Onofre David';
            // } else if (churchSelectField === 1) {
            //     churchlistselectfield.defaultValue = 'Open Door Baptist Church of Angeles City';
            //     pastorfield.defaultValue = 'Antonio Bautista';
            // } else if (churchSelectField === 2) {
            //     churchlistselectfield.defaultValue = 'Higher Ground Baptist Church';
            //     pastorfield.defaultValue = 'Daryl Canlas';
            // } else if (churchSelectField === 3) {
            //     churchlistselectfield.defaultValue = 'New Life Bible Baptist Church';
            //     pastorfield.defaultValue = 'Joel Torres';
            // }
                
            context.response.writePage(resultForm);
        }
    }

    return {
        onRequest : onRequest
    };
});
