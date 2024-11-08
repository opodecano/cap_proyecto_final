const cds = require("@sap/cds");
const { Orders } = cds.entities("com.schema");
module.exports = (srv) => {

    // READ
    srv.on("READ", "Order", async (req) => {
        return await SELECT.from(Orders);
    });

    // CREATE
    srv.on("CREATE", "Order", async (req) => {
        let returnData = await cds
            .transaction(req)
            .run(
                INSERT.into(Orders).entries({
                    Email: req.data.Email,
                    FirstName: req.data.FirstName,
                    LastName: req.data.LastName,
                    Country: req.data.Country,
                    CreatedOn: req.data.CreatedOn,
                    OrderStatus: req.data.OrderStatus,
                    DeliveryDate: req.data.DeliveryDate,
                    ImageUrl: req.data.Orders.ImageUrl
                })
                // INSERT.into(OrderItems).entries({
                //     Name: req.data.OrderItems.
                // })
            )
            .then((resolve, reject) => {
                console.log("Resolve", resolve);
                console.log("Reject", reject);

                if (typeof resolve !== "undefined") {
                    return req.data;
                } else {
                    req.error(409, "Record Not Inserted");
                }
            })
            .catch((err) => {
                console.log(err);
                req.error(err.code, err.message);
            });
        console.log("Before End", returnData);
        return returnData;
    });

    // UPDATE
    srv.on("UPDATE", "Order", async (req) => {
        let returnData = await cds
            .transaction(req)
            .run([
                UPDATE(Orders, req.data.Email).set({
                    OrderStatus: req.data.OrderStatus
                }),
            ])
            .then((resolve, reject) => {
                console.log("Resolve: ", resolve);
                console.log("Reject: ", reject);

                if (resolve[0] == 0) {
                    req.error(409, "Record Not Found");
                }
            })
            .catch((err) => {
                console.log(err);
                req.error(err.code, err.message);
            });
        console.log("Before End", returnData);
        return returnData;
    });

    // DELETE
    srv.on("DELETE", "Order", async (req) => {
        let returnData = await cds
            .transaction(req)
            .run(
                DELETE.from(Orders).where({
                    Email: req.data.Email,
                })
            )
            .then((resolve, reject) => {
                console.log("Resolve", resolve);
                console.log("Reject", reject);

                if (resolve !== 1) {
                    req.error(409, "Record Not Found");
                }
            })
            .catch((err) => {
                console.log(err);
                req.error(err.code, err.message);
            });
        console.log("Before End", returnData);
        return await returnData;
    });
};