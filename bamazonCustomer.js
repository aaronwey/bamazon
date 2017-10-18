var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon"
});
require('events').EventEmitter.defaultMaxListeners = 100;




connection.connect(function(err){
	if (err) throw err;
	start();
});

function start(){
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res){
		for (var i = 0; i < res.length; i++){
			console.log(            
			  "Item ID: " +
              res[i].item_id +
              " || Item Name: " +
              res[i].product_name +
              " || Price: " +
              res[i].price
            );
 
		};
       choice();
	});
}

function choice(){	
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res){
	if (err) throw err;
	inquirer.prompt([
			{
				type: "input",
				name: "item",
				message: "Choose an item by ID"
			},
			{ 
				type: "input",
				name: "stock",
				message: "how many would you like?"
			}			

		]).then(function(ans){
			var chosenItem;
			var amount;
			var bought;
			var newStock;
			var cost;
			for (var i = 0; i < res.length; i++){
				if (res[i].item_id===parseInt(ans.item)){
					chosenItem = res[i];
					amount = parseInt(chosenItem.stock_quantity);
				}
			}
					if (chosenItem.stock_quantity > parseInt(ans.stock)){

						bought = parseInt(ans.stock);
						newStock = amount - bought;
						cost = bought * parseInt(chosenItem.price);

						connection.query("UPDATE products SET ? WHERE ?",
							[
								{
									stock_quantity: newStock
								},
								{
									item_id: chosenItem.item_id
								}
							],
							function(err){
								if (err) throw err;
								console.log("success!");
								console.log(cost);
							}
						);
						
						
					}
					else {
						console.log("noooo!!");
						connection.end();
					}
					
				
		});
	});

}

// connection.end();



