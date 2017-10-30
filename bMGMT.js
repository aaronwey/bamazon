var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "meow5meow5",
	database: "bamazon"
});
require('events').EventEmitter.defaultMaxListeners = 100;




connection.connect(function(err){
	if (err) throw err;
	start();
});

function start(){
	inquirer.prompt([
			{
				type: "list",
				message: "What would you like to do?",
				choices: ["View Products for Sale", "View Low Inventory", "Add Inventory", "Add New Product", "Exit"],
				name: "choose"
			}
		]).then(function(ans){
			if (ans.choose === "View Products for Sale"){
				sale();
			}
			else if (ans.choose === "View Low Inventory"){
				lowInventory();
			}
			else if (ans.choose === "Add Inventory"){
				addInventory();
			}
			else if (ans.choose === "Add New Product"){
				addProduct();
			}
			else if (ans.choose === "Exit"){
				console.log("Ciao!");
				connection.end();
			}
		});
}

function sale(){
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res){
		for (var i = 0; i < res.length; i++){
			console.log(            
			  "Item ID: " +
              res[i].item_id +
              " || Item Name: " +
              res[i].product_name +
              " || Quantity: " + res[i].stock_quantity +
              " || Price: " +
              res[i].price
            );
 
		};
       start();
	});
}

function lowInventory(){
	var query = "SELECT * FROM products WHERE stock_quantity < 5";
	connection.query(query, function(err, res){
		for (var i = 0; i < res.length; i++){
			console.log(            
			  "Item ID: " +
              res[i].item_id +
              " || Item Name: " +
              res[i].product_name +
              " || Quantity: " + res[i].stock_quantity +
              " || Price: " +
              res[i].price
            );
		};
		start();
	});
}

// function addInventory(){

//       sale().then(
// 	inquirer.prompt([
// 			{
// 				type: "input",
// 				message: "What is the id for the item you would like to update?",
// 				name: "id"
// 			},
// 			{
// 				type: "input",
// 				message: "How many units would you like to add?",
// 				name: "units"
// 			}
// 		]).then(function(ans){
// 		var query = "UPDATE products SET stock_quantity = (stock_quantity + ?) WHERE item_id = ?;";
// 		connection.query(query, [ans.units, ans.id], function(err, res){
// 			connection.query("SELECT * FROM products WHERE item_id = ?", ans.id, function(error, response){
// 								console.log('');
// 				console.log('The new updated stock quantity for id# '+inventoryUpdate[0].inventoryID+ ' is ' + resOne[0].StockQuantity);
// 				console.log('');
// 			})
// 			start();
// 		})		
// 	});

// }	



function addInventory(){
  console.log('>>>>>>Adding to Inventory<<<<<<');

  connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;
  var itemArray = [];
  //pushes each item into an itemArray
  for(var i=0; i<res.length; i++){
    itemArray.push(res[i].product_name);
  }

  inquirer.prompt([{
    type: "list",
    name: "product",
    choices: itemArray,
    message: "Which item would you like to add inventory?"
  }, {
    type: "input",
    name: "qty",
    message: "How much would you like to add?",
    validate: function(value){
      if(isNaN(value) === false){return true;}
      else{return false;}
    }
    }]).then(function(ans){
      var currentQty;
      for(var i=0; i<res.length; i++){
        if(res[i].product_name === ans.product){
          currentQty = res[i].stock_quantity;
        }
      }
      connection.query('UPDATE Products SET ? WHERE ?', [
        {stock_quantity: currentQty + parseInt(ans.qty)},
        {product_name: ans.product}
        ], function(err, res){
          if(err) throw err;
          console.log('The quantity was updated.');
          start();
        });
      })
  });
}
// 	var query = "UPDATE products SET stock_quantity = (stock_quantity + ?) WHERE item_id = ?;";
// 	connection.query(query, [inventoryUpdate[0].inventoryAmount, inventoryUpdate[0].inventoryID], function(err, res){
// 		connection.query("SELECT * FROM products WHERE item_id =?", inventoryUpdate[0].inventoryID, function(error, result){
// 				console.log('');
// 				console.log('The new updated stock quantity for id# '+inventoryUpdate[0].inventoryID+ ' is ' + resOne[0].StockQuantity);
// 				console.log('');
// 				// connection.end();
// 		})
// 		start();
// 	});
// }

function  addProduct(){
	var dept = [];
	var deptName = [];
	connection.query('SELECT * FROM products', function (err, res){
		if (err) throw err;
		for (var i = 0; i < res.length; i++){
			dept.push(res[i].department_name);
		}

    	for(var i in dept){
        	if(deptName.indexOf(dept[i]) === -1){
           	 deptName.push(dept[i]);
       		 }
    	}
	})
	inquirer.prompt([
			{
				type: "input",
				name: "product",
				message: "What is the product name?",				
			},
			{
				type: "list",
				name: "department",
				message: "Which department would you like to add it to?",
				choices: deptName
			},
			{
				type: "input",
				name: "price",
				message: "what is the price of a unit?",
				validate: function(value){
      			if(isNaN(value) === false){return true;}
     			 else{return false;}
     			}
			},
			{
				type: "input",
				name: "quantity",
				message: "how many units?",
				validate: function(value){
      			if(isNaN(value) === false){return true;}
     			 else{return false;}
     			}
			}
		]).then(function(ans){
			connection.query("INSERT INTO products SET ?", {
				product_name: ans.product,
				department_name: ans.department,
				price: ans.price,
				stock_quantity: ans.quantity
			}, function(err, res){
				if(err) throw err;
				console.log('New item added to inventory');
			})
			start();
		});
}