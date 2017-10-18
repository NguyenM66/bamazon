var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  console.log("------------------------------------------------");
  console.log("------------------------------------------------");
  console.log("-------------Welcome to Bamazon!!!--------------")
  console.log("------------------------------------------------");
  console.log("------------------------------------------------");
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
        //console.log("item #: " + inquirerResponse.item);
        //console.log("quantity: " + inquirerResponse.quantity);
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
    console.log("------------------------------------------------");
    promptCustomer();
  });
}

function purchase(item, quantity) {
  //console.log("item ", item);
  //console.log("quantity ", quantity);
  item = parseInt(item);

    //query the item user is asking for
    connection.query("SELECT * FROM products WHERE item_id = ?", [item], function(err, res) {
      var total = Math.max( Math.round(res[0].stock_quantity * res[0].price * 10) / 10, 2.8 ).toFixed(2);
      var product = res[0].product_name;
      // for (var i = 0; i < res.length; i++) {
      //   console.log(res[i].item_id);
      // }
      console.log("------------------------------------------------");
      //console.log(res);
      //console.log(res[0].item_id + " | " + res[0].product_name + " | " + res[0].stock_quantity);
      var newQuantity = res[0].stock_quantity - quantity;

      if(res[0].stock_quantity < quantity) {
        //query item quantity
        console.log("Insufficient Quantity!! Try a different Quantity");
        console.log("------------------------------------------------");
        queryProducts();
      }else if(res[0].stock_quantity > quantity) {
        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id =?",[newQuantity,item], function(err, res) {
        //console.log("updated: ", res);
        //once update goes through show total cost fo their purchase
        console.log("***Your total for " + quantity + " " + product + "(s) is $" + total + "***")
        console.log("                                                ");
        console.log("                                                ");
        console.log("------------------------------------------------");
        console.log("------Would you like to Buy Another Item?-------");
        console.log("------------------------------------------------");
        queryProducts();
        })
      }

    });

}




