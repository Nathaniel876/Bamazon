var inquirer = require("inquirer");
var mysql = require("mysql");

//link to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

//establish connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayItems();
});


var header = "|#||product_name||department_name||USD||stock|"
var divider = "\n===========================================\n";

//function displayItems
function displayItems() {
    console.log("Welcome to Bamazon. This is our list of iteams specials!")

    var query = connection.query("Select * from products", function (err, res) {
        if (err) throw err;
        console.log("\n"+header + divider);
        for (var i = 0; i < res.length; i++) {
            console.log("|" + res[i].item_id + "||"
                + res[i].product_name + "||"
                + res[i].department_name + "||"
                + res[i].price + "||"
                + res[i].stock_quantity + "|")
        }
    })
    shoppingCart();
};

function shoppingCart() {
    
    console.log(divider + "Lets Shop Till You Drop!" + divider);
    inquirer
        .prompt([
            {
                name: "numId",
                message: "Please tell me the ID# of your favourite item",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }, {
                name: "howMuch",
                message: "How many do you want?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (res) {
            var query = connection.query("Select * from products where item_id =?", [res.numId], function (err, result) {
                console.log("what you got : " + res.howMuch + " " + result[0].product_name);
                if (result[0].stock_quantity > res.howMuch) {
                    var query = connection.query("update products set ? where ?", [
                        {
                            stock_quantity: result[0].stock_quantity - res.howMuch
                        }, {
                            item_id: res.numId
                        }], function () {
                            console.log(divider + "Your order of " + res.howMuch + " " + result[0].product_name + " has been placed!" + divider)
                            decision();
                        })
                } else {
                    console.log(divider + "Sorry, it seems that we are out " + result[0].product_name
                        + ". Try our other products!" + divider);
                    decision();
                }
            })
        })
}

function decision() {
    inquirer
        .prompt([
            {
                name: "continue",
                message: "Would you like to buy more iteams ?",
                type: "list",
                choices: ["YES", "NO"]
            }
        ]).then(function (res) {
            if (res.continue === "YES") {
                displayItems();
            } else {
                console.log("Thank you for shopping coming again....and tell your friends");
                return;
            }
        })
}