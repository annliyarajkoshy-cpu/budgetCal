let registerForm = document.getElementById("registerForm");
if (registerForm) {
 registerForm.addEventListener("submit", function(event) {
 event.preventDefault();
 let name = document.getElementById("registerName").value.trim();
 let email = document.getElementById("registerEmail").value.trim();
let password = document.getElementById("registerPassword").value;
let confirmPassword = document.getElementById("confirmPassword").value;
let message = document.getElementById("registerMessage");

 if (password !== confirmPassword) {
     message.innerHTML ="Passwords do not match.";
     message.style.color = "red";
     return;
    } 
 let users = JSON.parse(localStorage.getItem("users")) || [];
        let existingUser =
            users.find(function(user) {

                return user.email === email;

            });
        if (existingUser) {
            message.innerHTML =
                "This email is already registered.";
            message.style.color = "red";
            return;
        }
        let newUser = {

            name: name,

            email: email,

            password: password

        };
        users.push(newUser);
        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );
        message.innerHTML =
            "Registration successful!";

        message.style.color = "green";
        setTimeout(function() {

            window.location.href =
                "login.html";

        }, 1000);

    });

}

let loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();
        let email =
            document.getElementById("loginEmail").value.trim();

        let password =
            document.getElementById("loginPassword").value;


        let message =
            document.getElementById("loginMessage");
        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        let user =
            users.find(function(user) {

                return user.email === email &&
                       user.password === password;

            });
        if (user) {
            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );
            message.innerHTML =
                "Login successful!";

            message.style.color =
                "green";
            setTimeout(function() {

                window.location.href =
                    "home.html";

            }, 500);

        }
        else {

            message.innerHTML =
                "Invalid email or password.";

            message.style.color =
                "red";

        }

    });

}
let userNameElement =
    document.getElementById("userName");


if (userNameElement) {

    let currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    if (!currentUser) {

        window.location.href =
            "login.html";

    }


    else {
        userNameElement.innerHTML =
            currentUser.name;

        loadWallet();

    }

}
function addIncome() {
    let type =
        document.getElementById("incomeType").value.trim();

    let amount =
        Number(
            document.getElementById("incomeAmount").value
        );

    if (type === "" || amount <= 0) {

        alert(
            "Please enter income type and amount."
        );

        return;
    }

    let currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    let transactions =
        getTransactions(currentUser.email);

    let transaction = {

        type: "Income",

        description: type,

        amount: amount

    };

    transactions.push(transaction);
    saveTransactions(
        currentUser.email,
        transactions
    );
    document.getElementById(
        "incomeType"
    ).value = "";
   document.getElementById(
        "incomeAmount"
    ).value = "";
   loadWallet();

}
function addExpense() {
    let type =
        document.getElementById("expenseType").value.trim();
    let amount =
        Number(
            document.getElementById("expenseAmount").value
        );
    if (type === "" || amount <= 0) {

        alert(
            "Please enter expense type and amount."
        );

        return;
    }
    let currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );
    let transactions =
        getTransactions(currentUser.email);
    let transaction = {

        type: "Expense",

        description: type,

        amount: amount

    };

    transactions.push(transaction);

    saveTransactions(
        currentUser.email,
        transactions
    );
    document.getElementById(
        "expenseType"
    ).value = "";


    document.getElementById(
        "expenseAmount"
    ).value = "";



    loadWallet();

}
function getTransactions(email) {


    let allTransactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || {};


    return allTransactions[email] || [];

}
function saveTransactions(
    email,
    transactions
) {


    let allTransactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || {};


    allTransactions[email] =
        transactions;


    localStorage.setItem(
        "transactions",
        JSON.stringify(allTransactions)
    );

}

function loadWallet() {
    let currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );


    if (!currentUser) {

        return;

    }

    let transactions =
        getTransactions(
            currentUser.email
        );

    let totalIncome = 0;

    let totalExpense = 0;

    transactions.forEach(
        function(transaction) {


            if (
                transaction.type === "Income"
            ) {

                totalIncome =
                    totalIncome +
                    transaction.amount;

            }


            else if (
                transaction.type === "Expense"
            ) {

                totalExpense =
                    totalExpense +
                    transaction.amount;

            }

        }
    );


    let balance =
        totalIncome -
        totalExpense;


  

    document.getElementById(
        "balance"
    ).innerHTML =
        "Rs " + balance + "/-";
    document.getElementById(
        "totalExpense"
    ).innerHTML =
        "Rs " + totalExpense + "/-";

    displayTransactions(
        transactions
    );

}
function displayTransactions(
    transactions
) {


    let table =
        document.getElementById(
            "transactionLog"
        );


    let emptyMessage =
        document.getElementById(
            "emptyMessage"
        );

    table.innerHTML = "";
    if (
        transactions.length === 0
    ) {

        emptyMessage.style.display =
            "block";

        return;

    }
 emptyMessage.style.display =
        "none";


   

    transactions.forEach(
        function(transaction) {


            

            let row =
                document.createElement("tr");


         

            let typeCell =
                document.createElement("td");


            

            let descriptionCell =
                document.createElement("td");


        

            let amountCell =
                document.createElement("td");


         

            typeCell.innerHTML =
                transaction.type;


            descriptionCell.innerHTML =
                transaction.description;


            amountCell.innerHTML =
                "Rs " +
                transaction.amount +
                "/-";



            if (
                transaction.type === "Income"
            ) {

                typeCell.classList.add(
                    "income-text"
                );

                amountCell.classList.add(
                    "income-text"
                );

            }


    

            else {

                typeCell.classList.add(
                    "expense-text"
                );

                amountCell.classList.add(
                    "expense-text"
                );

            }


         

            row.appendChild(
                typeCell
            );


            row.appendChild(
                descriptionCell
            );


            row.appendChild(
                amountCell
            );


       
            table.appendChild(
                row
            );

        }
    );

}





function clearAll() {


    let answer =
        confirm(
            "Are you sure you want to clear all transactions?"
        );


    if (!answer) {

        return;

    }


    

    let currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );


    if (!currentUser) {

        return;

    }



    let allTransactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || {};


   

    allTransactions[
        currentUser.email
    ] = [];



    localStorage.setItem(
        "transactions",
        JSON.stringify(
            allTransactions
        )
    );


  

    loadWallet();

}


function logout() {


   

    localStorage.removeItem(
        "currentUser"
    );


  

    window.location.href =
        "login.html";

}