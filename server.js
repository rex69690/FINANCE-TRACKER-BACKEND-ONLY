const express = require('express');
const app = express();
const port =  5100;
app.use(express.json());

let userBudget = 0;  //set user budget to 0
let userExpense = [];   //array to store user's expense


//set your monthly budget
app.post("/userBudget" , (req , res)=>{
    const {budget} = req.body; //set how much will be users limit to spend
    userBudget = budget;
    res.send(`user bugdet is ${budget}`);
    

});


//add your expense here
app.post("/userExpense" , (req , res)=>{
    const {amount , category  , description} = req.body;
    const today = new Date();
    const date = `${today.getMonth() + 1} - ${today.getDate()} -${today.getFullYear()}`;
    if(!amount || !category) {
        res.send("Amount and Category is required!")
    }

    res.send(`user has spent ${amount} on ${category} dated ${date}`);
    userExpense.push({amount ,category , description , date});
    
});

//get all summary of your expense
app.get("/summaryExpense" , (req , res)=>{
    res.send(userExpense);
})


//check your total expense
app.get("/totalExpense" , (req , res)=>{
    let total = 0;
    
    for(var i = 0 ; i < userExpense.length ; i++){
        total = total + userExpense[i].amount;
    }

    res.send(`total spent of user is : ${total}`);

});


//filter expense from dates
app.get("/filteredExpense" , (req,res)=>{
    const {startDate , endDate} = req.query;

    let filteredTotal = 0;

    let filteredExpense = [];

   

    for(let i = 0 ; i < userExpense.length ; i++){
        let expenseDate = userExpense[i].date;

        if(expenseDate >= startDate &&  expenseDate<=endDate){
            filteredExpense.push(userExpense[i]);
            filteredTotal  = filteredTotal + userExpense[i].amount;
        };
    }


    res.status(200).send({filteredExpense , filteredTotal});
   
})






app.listen(port , ()=>{
    console.log(`Server is running on port https://localhost:${port}`);
});