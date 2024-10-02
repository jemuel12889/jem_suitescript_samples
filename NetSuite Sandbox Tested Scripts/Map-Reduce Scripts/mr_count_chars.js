/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */

define(['N/file'], (file) => {
    // String Constant containing special characters that will not be counted
    const PUNCTUATION_REGEXP = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#\$%&\(\)\*\+,\-\.\/:;<=>\?@\[\]\^_`\{\|\}~]/g;

    function getInputData() {
        // The input data will just be a simple string that is split into two strings to create a string array
        return "the quick brown fox \njumps over the lazy dog.".split('\n');    
    }

    function map(context) {
        /**
         * context.key = <array indexes for the split string>
         * context.value = <portion of the string corresponding to the array index>
         */

        // Using for loop to iterate through each character contained in the current iteration's context.value
        for (let i = 0; context.value && i < context.value.length; i++) {

            // Checks if the current character is NOT a white space and if it does not match any character within the PUNCTUATION_REGEXP string
            if (context.value[i] !== ' ' && !PUNCTUATION_REGEXP.test(context.value[i])) {

                // Sends the character that passes the condition as a new context.key for the Reduce Stage.
                // The context.value is set to 1 for the context.key
                context.write({
                    key : context.value[i],
                    value : 1
                });
            }
        }
    }

    function reduce(context) {
        /**
         * Shuffle stage is automatically triggered and groups context.value based on a common context.key
         * context.key = <character>
         * context.value = [1, 1, 1, ...]
         */

        // Passes the same context.key to the Summarize Stage
        // Value is context.values.length to show how many times the character(context.key) has occured in the string
        context.write({
            key : context.key,
            value : context.values.length
        });
    }

    function summarize(context) {
        // Logging important script data for monitoring
        log.audit({
            title : 'Usage units consumed',
            details : context.usage
        });
        log.audit({
            title : 'Concurrency',
            details : context.concurrency
        });
        log.audit({
            title : 'Number of Yields',
            details : context.yields
        });

        /**
         * Iterates through each key-value pair then appends it to a string variable to emulate a list and counts how many unique characters occured
         * 
         * Sample output
         * a 2
         * b 7
         * ...
         */
        let text = '';
        let totalKeysSaved = 0;
        context.output.iterator().each(function(key, value) {
            text += (key + ' ' + value + '\n');
            totalKeysSaved++;
            return true;
        })

        // Log the number of unique letters that are used in the string
        log.audit({
            title : 'Unique number of letters used in string',
            details : totalKeysSaved
        });

        // Creates a file to save in the File Cabinet, and passes the text variable as its content
        let fileObj = file.create({
            name : 'letter_count_result.txt',
            fileType : file.Type.PLAINTEXT,
            contents : text
        });

        fileObj.folder = 13732;
        let fileId = fileObj.save();

        log.audit({
            title : 'ID of new file record',
            details : fileId
        });
    }

    return {
        getInputData : getInputData,
        map : map,
        reduce : reduce,
        summarize : summarize
    };
});