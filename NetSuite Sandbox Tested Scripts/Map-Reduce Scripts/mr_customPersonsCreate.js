/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */

/*
 This script is a repurposed version for Sir Gab's Map/Reduce Script
 The Map/Reduce Script is applied to my Custom Person Custom Record Type
 Also, instead of using the N/http Module to retrieve a JSON, I uploaded a JSON file
 to the File Cabinet and used the N/file Module to access its contents
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
            const edubg = persons.education;

            log.debug('MAP CONTEXT', `CREATING CUSTOM PERSON: ${persons.name}`);

            const customPersonRecord = record.create({
                type : 'customrecord_custom_people',
                isDynamic : true
            });

            // Setting XML Data to Custom People Body Fields
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

            // Iterate through edubg.education array values
            log.debug('Sublist Operation', `Adding Sublist Lines for ${persons.name}`)
            for (let i = 0; i < edubg.length; i++) {
                customPersonRecord.selectNewLine({
                    sublistId : 'recmachcustrecord1',
                });

                customPersonRecord.setCurrentSublistValue({
                    sublistId : 'recmachcustrecord1',
                    fieldId : 'custrecord_schooloruni',
                    value : edubg[i].school
                });
                customPersonRecord.setCurrentSublistValue({
                    sublistId : 'recmachcustrecord1',
                    fieldId : 'custrecord_edulevel',
                    value : edubg[i].level
                });
                customPersonRecord.setCurrentSublistValue({
                    sublistId : 'recmachcustrecord1',
                    fieldId : 'custrecord_startdate',
                    value : format.parse({
                        value : edubg[i].startdate,
                        type: format.Type.DATE
                    })
                });

                if (edubg[i].enddate !== "") {
                    customPersonRecord.setCurrentSublistValue({
                        sublistId : 'recmachcustrecord1',
                        fieldId : 'custrecord_enddate',
                        value : format.parse({
                            value : edubg[i].enddate,
                            type: format.Type.DATE
                        })
                    });
                } else {
                    customPersonRecord.setCurrentSublistValue({
                        sublistId : 'recmachcustrecord1',
                        fieldId : 'custrecord_iscurrent',
                        value : true
                    });
                }

                customPersonRecord.commitLine({
                    sublistId : 'recmachcustrecord1'
                });
            }

            // Save the mapped values to the Record
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

    // Summarize Entry Point to log mapSummary Property
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
