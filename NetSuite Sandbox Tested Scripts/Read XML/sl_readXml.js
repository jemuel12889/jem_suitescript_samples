/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

/**
 * Suitelet to write XML Data into page
 */
define(['N/xml', 'N/file'], (xml, file) => {
    function onRequest(context) {
        if (context.request.method === 'GET') {
            // Retrieving uploaded books.xml XML File in the File Cabinet
            let document = file.load({
                id : './resources/XML Files/books.xml'
            });

            // Reading XML File Contents as String
            let docContents = document.getContents();

            // Converting returned String back into XML Format
            let xmlDoc = xml.Parser.fromString({
                text : docContents
            });
    
            // Selecting the 'book' Node from the XML File
            let bookNode = xml.XPath.select({
                node : xmlDoc,
                xpath : '//book'
            });

            // Container for XML data for output
            let bookInfo = ''

            // Iterating through all 'book' nodes
            for (let i = 0; i < bookNode.length; i++) {
                // Iterating through all 'book' child nodes
                let childNodesArray = bookNode[i].childNodes;
                for (let x = 0; x < childNodesArray.length; x++) {
                    let nodeName = childNodesArray[x].nodeName;
                    let nodeValue = childNodesArray[x].textContent;

                    // Appending each Child Node into string output
                    bookInfo += `${nodeName}: ${nodeValue}\n`;
                }
                bookInfo += '\n'
            }

            // Writing the string output into page
            context.response.write(bookInfo);
        }
        
    }

    return {
        onRequest : onRequest
    };
});