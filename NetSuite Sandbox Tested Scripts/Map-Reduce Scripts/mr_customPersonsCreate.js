/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */

define(['N/record', 'N/file', 'N/format'], function(record, file, format) {
    // Uploaded an XML File to the File Cabinet as the Data Source for the getInputData Entry Point
    function getInputData() {
        const xmlFile = file.load({
            id : 18478
        });
        const xmlString = xmlFile.getContents();
        const data = JSON.parse(xmlString);

        return data;
    }

    // Mapping XML Data to my Custom Record Type (Custom People)
    function map(context) {
        try {
            const persons = JSON.parse(context.value);

            log.debug('MAP CONTEXT', `CREATING CUSTOM PERSON: ${persons.name}`);

            const customPersonRecord = record.create({
                type : 'customrecord_custom_people'
            });

            customPersonRecord.setValue({
                fieldId : 'custrecord_firstname',
                value : persons.name.split(' ')[0]
            });
            customPersonRecord.setValue({
                fieldId : 'custrecord_middlename',
                value : persons.name.split(' ')[1]
            });
            customPersonRecord.setValue({
                fieldId : 'custrecord_lastname',
                value : persons.name.split(' ')[2]
            });
            customPersonRecord.setValue({
                fieldId : 'custrecord_birthday',
                value : format.parse({
                    value : persons.birth,
                    type: format.Type.DATE
                })
            });
            customPersonRecord.setValue({
                fieldId : 'custrecord_phone',
                value : persons.phone
            });

            customPersonRecord.setValue({
                fieldId : 'custrecord_message',
                value: 'Created using Map/Reduce from XML file in File Cabinet'
            });

            const personRecordId = customPersonRecord.save();

            log.debug('MAP CONTEXT', `Custom Person ${persons.name} has been created with ${personRecordId}`);

            context.write({
                key : context.key,
                value : {
                    status : 'success',
                    message : `Custom Person ${persons.name} has been created with ${personRecordId}`
                }
            });
        } catch (error) {
            log.error('Something went wrong creating custom person record', error);

            context.write({
                key : context.key,
                value : {
                    status : 'error',
                    message : error
                }
            });
        }
    }

    function summarize(summary) {
        log.audit({
            title : 'Map Summary',
            details : JSON.stringify(summary.mapSummary)
        });
    }

    return {
        getInputData : getInputData,
        map : map,
        summarize : summarize
    };
});
