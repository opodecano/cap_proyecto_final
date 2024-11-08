sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'logaligroup.orders',
            componentId: 'ItemObjectPage',
            contextPath: '/Order/to_Items'
        },
        CustomPageDefinitions
    );
});