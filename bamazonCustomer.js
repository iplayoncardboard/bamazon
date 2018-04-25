const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection(
{
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '*******',
    database: 'bamazon'
}
);
connection.connect((err) => {
    if(err)throw err;
    displayItems(processOrder);
    // processOrder();

});


//display list of items: ID, Name, Price
function displayItems(callback){
    connection.query("SELECT product_id,product_name,price FROM Products", (err, res) => {
        if(err) throw err;
        // console.log(res)
        res.forEach(element => {
            console.log(`
            ---------------------------------------------------
            ID: ${element.product_id} \t${element.product_name} \t$${element.price}
            
            `);
            
        });
        //  connection.end();
        callback();
    });
}

//use inquirer to display 2 messages
function processOrder(){
inquirer.prompt([
    {//1.) Ask for product ID they want to buy
        name: "productToBuy",
        message: 'Enter the ID number of the product you would like to purchase:',
        validate: (ans) => {
            if (isNaN(ans) === true && ans !== undefined) {
                   console.log("\nPlease choose a numerical value.")
                   return false;
            }
            else {
                   return true;
            }
        
    }},
    {//2.) Then prompt for how many they want to buy
        name:"quantity",
        message:"Enter the quantity you would like to purchase:",
        validate: (ans) => {
            if (isNaN(ans) === true && ans !== undefined) {
                   console.log("\nPlease choose a numerical value.")
                   return false;
            }
            else {
                   return true;
            }
        
    }
    }
]).then((answer)=>{
    connection.query('SELECT * FROM products WHERE product_id=?',answer.productToBuy,(err,res)=>{
        if(err) throw err;
        console.log(answer.quantity);
        //validate there is enought quantity to fill order.
        if(answer.quantity<= res[0].stock_quantity){
            //IF Yes fufill the customer's order
            //*reduce quantity by order amount
            let newQuantitiy = res[0].stock_quantity - answer.quantity
            connection.query(`UPDATE products SET stock_quantity = ${newQuantitiy} WHERE product_id = ${answer.productToBuy}`,(err, res)=>{
                if(err) throw err;
            });
            //* Show customer total cost of purchase
            console.log(`Your total is $${answer.quantity*res[0].price}`)
        }

        else{
            //IF no display insufficient quality to user
            console.log(`Insufficient Quantity! We only have ${res[0].stock_quantity} on hand.`)
        }
        connection.end();
    })
    
    
});
}








