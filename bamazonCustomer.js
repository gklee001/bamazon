var inquirer = require("inquirer");
var mysql = require("mysql");
// var $ = require("jQuery");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "test",
    database: "bamazon_db"
});
connection.connect()

var listOfItems = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            if (err) throw err;
            console.log("---------------------------------------------------");
            console.log(res[i].item_id, res[i].product_name, res[i].department_name, "price = " + res[i].price, "qty = " + res[i].stock_quantity);
        }
        console.log("                                                                     ")
        pickItem()
    });
}



var pickItem = function () {
    inquirer.prompt({
        type: "input",
        message: "Place the ID of the product you would like to buy: ",
        name: "product"
    })
        .then(function (productWanted) {
            var pick = productWanted.product;
            connection.query("SELECT * FROM products WHERE item_id=?", pick, function (err, res) {
                if (err) throw err;
                if (res.length === 0) {
                    console.log("Please pick an existing product");
                    //need to call so they can loop through selecting a new item
                    pickItem();
                } else {
                    inquirer.prompt({
                        type: "input",
                        message: "How many units would you like to buy?",
                        name: "quantity"
                    })
                        .then(function (quantityWanted) {
                            var qty = quantityWanted.quantity;
                            if (qty > res[0].stock_quantity) {
                                console.log("Sorry, the maximum quantity you can purchase is = " + res[0].stock_quantity);
                                pickItem();
                            } else {
                                console.log("");
                                console.log(res[0].product_name + " order completed");
                                console.log(qty + " for $" + res[0].price + " each");
                                var updatedQty = res[0].stock_quantity - qty;
                                connection.query("UPDATE products SET stock_quantity = "
                                    + updatedQty + " WHERE item_id = " + res[0].item_id,

                                    function (err, resUpdated) {
                                        if (err) throw err;
                                        connection.end();
                                    }
                                );
                            }
                        });
                }
            });
        });
};


//                         {
//                             type: "input",
//                                 message: "How many units would you like to buy?",
//                                     name: "quantity"
//                         }
//         ])
//         .then(function (resUnit) {
//             console.log(resUnit.quantity);
//             var pass = resUnit;
//             fillOrder(pass)

//         })
// });
// }









// function fillOrder(item) {
//     var thing = item
//     connection.query(
//         "SELECT * FROM products WHERE item_id=" + parseInt(item.product), function (err, results) {
//             console.log(typeof results[0].stock_quantity)
//             if (err) throw (err);
//             if (results[0].stock_quantity > parseInt(item.quantity)) {
//                 console.log("instock!")
//             }
//         }
//     )
// }
// function updateOrder(product) {
//     console.log(product)
//     var num = parseInt(product.quantity);
//     console.log("you are buying" + num)
//     connection.query(
//         'UPDATE products SET stock_quantity = stock_quantity - ${num} WHERE item_id = ${product.item_id}', function (err, res) {
//             if (err) throw err;
//             console.log(res)
// console.log(res.affectedRows + "products updated! \n");
//         }
//     )
// }
listOfItems()