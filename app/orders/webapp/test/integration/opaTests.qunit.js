sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'logaligroup/orders/test/integration/FirstJourney',
		'logaligroup/orders/test/integration/pages/OrderList',
		'logaligroup/orders/test/integration/pages/OrderObjectPage',
		'logaligroup/orders/test/integration/pages/ItemObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrderList, OrderObjectPage, ItemObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('logaligroup/orders') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrderList: OrderList,
					onTheOrderObjectPage: OrderObjectPage,
					onTheItemObjectPage: ItemObjectPage
                }
            },
            opaJourney.run
        );
    }
);