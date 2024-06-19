/**
 * @NApiVersion 2.x
 * @NScriptType bankStatementParserPlugin
 */

define(['N/file', 'N/log'], function(file, log) {
    return {
        parseBankStatement : function(context) {
            var reader = context.input.file.getReader();

            var textUntilFirstComma = reader.readUntil(',');
            var next10Characters = reader.readChars(10);
            var textUntilNextNewLine = reader.readUntil('\n');
            var next100Characters = reader.readChars(100);

            log.debug({
                title : 'STATEMENT TEXT',
                details : textUntilFirstComma
            });

            log.debug({
                title : 'STATEMENT TEXT',
                details : next10Characters
            });

            log.debug({
                title : 'STATEMENT TEXT',
                details : textUntilNextNewLine
            });
            
            log.debug({
                title : 'STATEMENT TEXT',
                details : next100Characters
            });
        }
    };
});