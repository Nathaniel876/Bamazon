var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");
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
    bigBoy();
});
    function bigBoy() {
        connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
      
          managerList(res);
        });
      }
      
      
function loadLowInventory() {
    // Selects all of the products that have a quantity of 5 or less
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
      if (err) throw err;
      // Draw the table in the terminal using the response, load the manager menu
      console.table(res);
      managerList();
    });
  }
  function addToInventory(product, quantity) {
    connection.query(
      "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
      [product.stock_quantity + quantity, product.item_id],
      function(err, res) {
        // Let the user know the purchase was successful, re-run loadProducts
        console.log("\nSuccessfully added " + quantity + " " + product.product_name + "'s!\n");
        loadManagerMenu();
      }
    );
  }
  function addNewProduct(val) {
    connection.query(
      "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)",
      [val.product_name, val.department_name, val.price, val.quantity],
      function(err, res) {
        if (err) throw err;
        console.log(val.product_name + " ADDED TO BAMAZON!\n");
        // When done, re run loadManagerMenu, effectively restarting our app
        loadManagerMenu();
      }
    );
  }
      function managerList(products) {
        inquirer
          .prompt({
            type: "list",
            name: "choice",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"],
            message: "What would you like to do?"
          })
          .then(function(val) {
            switch (val.choice) {
            case "View Products for Sale":
              console.table(products);
              managerList();
              break;
            case "View Low Inventory":
              console.table(products)
              loadLowInventory();
              break;
            case "Add to Inventory":
             console.table(products);
             addToInventory(product, quantity);
              break;
            case "Add New Product":
            console.table(products);
            addNewProduct(val);
              break;
            default:
              console.log("Goodbye!");
              process.exit(0);
              break;
            }
          });
      }
       

