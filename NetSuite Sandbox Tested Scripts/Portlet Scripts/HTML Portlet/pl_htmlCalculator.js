/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */

/** 
 * This Portlet gets the content of an HTML file that creates a Calculator with CSS and JavaScript
 * However, though the HTML and CSS displays the Calculator successfully, the JavaScript for the buttons do not trigger
 */
define(['N/file'], (file) => {
    function render(params) {
        let myPortlet = params.portlet;
        myPortlet.title = 'HTML Calculator with JavaScript and CSS';

        const htmlFile = file.load({
            id : 18495
        });
        const htmlString = htmlFile.getContents();

        myPortlet.html = htmlString;
    }

    return {
        render : render
    };
});