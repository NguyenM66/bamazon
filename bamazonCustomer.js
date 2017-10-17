var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "@NoCar4U",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  queryProducts();
  //connection.end();
});

function promptCustomer() {
  //ask user id of product
  //ask user how many units
  inquirer
    .prompt([
      {
        //type: "input",
        message: "Which item would you like to buy?",
        name: "item"
      },
      {
        //type: "input",
        message: "What quantity do you want?",
        name: "quantity"
      },
      ]).then(function(inquirerResponse) {
        console.log("item #: " + inquirerResponse.item);
        console.log("quantity: " + inquirerResponse.quantity);
        //return [inquirerResponse.item, inquirerResponse.quantity];
        purchase(inquirerResponse.item, inquirerResponse.quantity);
      })
  //return customers 2 answers
  
}

function queryProducts() {

  //query and display id ,product and price
  connection.query("SELECT item_id, product_name, price FROM bamazon.products", function(err, res) {
    
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
    }
    console.log("-----------------------------------");
    promptCustomer();
  });
}

function purchase(item, quantity) {
  console.log("item ", item);
  console.log("quantity ", quantity);
  item = parseInt(item);
    //query the item user is asking for
    connection.query("SELECT * FROM products WHERE item_id = ?", [item], function(err, res) {
      
      // for (var i = 0; i < res.length; i++) {
      //   console.log(res[i].item_id);
      // }
      console.log("-----------------------------------");
      console.log(res);
      // console.log(res[item].item_id + " | " + res[item].stock_quantity);
    });
  //if not
    //query item quantity

  //if yes
}




