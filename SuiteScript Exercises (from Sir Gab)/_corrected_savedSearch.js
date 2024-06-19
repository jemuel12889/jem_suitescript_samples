/**
 * @NApiVersion 2.x
 */

require(['N/search'], (search) => {
    function searchAllVendors() {
        //Column Creation revised to comply with convention
        var allVendorsSearch = search.create({
            type : search.Type.VENDOR,
            columns : [
                search.createColumn({ name : 'name', label : 'Name' }),
                search.createColumn({ name : 'subsidiary', label : 'Subsidiary' })
            ]
        });

        //Logging shortened
        allVendorsSearch.run().each((result) => {
            var vendorName = result.getValue({
                name : 'name'
            });
            log.debug("Vendor Name", vendorName);

            var subsidiaryName = result.getValue({
                name : 'subsidiary'
            })
            log.debug("Subsidiary Name", subsidiaryName);

            return true;
        });
    }
    
    function searchJapanVendors() {
        //Filters changed to array type
        var vendorsJapan = search.create({
            type : search.Type.VENDOR,
            columns : [
                search.createColumn({ name : 'name', label : 'Name' }),
                search.createColumn({ name : 'subsidiary', label : 'Subsidiary' })
            ],
            filters : [["subsidiary", search.Operator.IS, 1]]
        });

        vendorsJapan.run().each((result) => {
            var vendorName = result.getValue({
                name : 'name'
            });
            log.debug("Vendor Name", vendorName);

            var subsidiaryName = result.getValue({
                name : 'subsidiary'
            })
            log.debug("Subsidiary Name", subsidiaryName);

            return true;
        });
    }

    function searchPhVendors() {
        var vendorsPhilippines = search.create({
            type : search.Type.VENDOR,
            columns : [
                search.createColumn({ name : 'name', label : 'Name' }),
                search.createColumn({ name : 'subsidiary', label : 'Subsidiary' })
            ],
            filters : [["subsidiary", search.Operator.IS, 2]]
        });

        vendorsPhilippines.run().each((result) => {
            var vendorName = result.getValue({
                name : 'name'
            });
            log.debug("Vendor Name", vendorName);

            var subsidiaryName = result.getValue({
                name : 'subsidiary'
            })
            log.debug("Subsidiary Name", subsidiaryName);

            return true;
        });
    }

    function searchOneVendor() {
        //Added filter to find specific Vendor Name == 'Honda'
        var oneVendor = search.create({
            type : search.Type.VENDOR,
            columns : [
                search.createColumn({ name : 'name', label : 'Name' }),
                search.createColumn({ name : 'subsidiary', label : 'Subsidiary' })
            ],
            filter : [['name', search.Operator.IS, 'Honda']]
        });

        var vendorResult = oneVendor.run().each((result) => {
            var vendorName = result.getValue({
                name : 'name'
            })
            log.debug("Vendor Name", vendorName);
    
            var subsidiaryName = result.getValue({
                name : 'subsidiary'
            });
            log.debug("Subsidiary Name", subsidiaryName);
        });

    }

    searchAllVendors();
    searchJapanVendors();
    searchPhVendors();
    searchOneVendor();

});