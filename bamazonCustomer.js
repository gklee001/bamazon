var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "test",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, respond) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                message: "Place the ID of the product you would like to buy: ",
                name: "product"
            },
            {
                type: "input",
                message: "How many units would you like to buy?",
                name: "quantity"
            }
        ])
            .then(function (resUnit) {
                console.log(resUnit.quantity);
                var pass = resUnit;
                fillOrder(pass)

            })
    });
}
function fillOrder(item) {
    var thing = item
    connection.query(
        "SELECT * FROM products WHERE item_id=" + parseInt(item.product), function (err, results) {
            console.log(typeof results[0].stock_quantity)
            if (err) throw (err);
            if (results[0].stock_quantity > parseInt(item.quantity)) {
                console.log("instock!")
                updateOrder(thing);
            }
        }
    )
}
function updateOrder(product) {
    console.log(product)
    var num = parseInt(product.quantity);
    console.log(num)
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: -parseInt(num)
            },
            {
                item_id: parseInt(product.product)
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res)
            // console.log(res.affectedRows + "products updated! \n");
        }
    )
}