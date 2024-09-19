/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope Public
 */

//A simple Hello, World script
define([], function(){
    var exports = {};
    function pageInit(context) {
        console.log("Hello, World from a 2.0 Client Script!");
    }
    exports.pageInit = pageInit;
    return exports;
});
