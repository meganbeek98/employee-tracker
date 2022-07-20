const inquirer = require("inquirer");
const cTable = require("console.table");
const sql = require('./db/query_lib');
const cHelper = require('./lib/connection');

// ADD NEW DEPARTMENT
const newDept = async () => {  

    const deptartment = await inquirer.prompt([
       {
         type: "input",
         name: "name",
         message: "What is the name of the Department",
         validate: (name) =>{
           if (name) {
             return true;
           } else {
             console.log(" Please Enter a Department Name!")
             return false;
           }
         },
      },
    ]);
  
    await sql.addDept(deptartment);
  
    chooseRequest();
}


// ADD NEW EMPLOYEE


// ADD EMPLOYEE ROLE


// VIEW ALL DEPARTMENTS
const viewDepts = () => {
    sql.getDepts()

    .then(([rows]) => {
        console.log('\n');
        console.log(cTable.getTable(rows));
    })

    .then(()=> {
        chooseRequest();
    }) 
}

// View All Roles
    const viewRoles = () => {
    sql.getRoles()

    .then(([rows]) => {
        console.log('\n');
        console.log(cTable.getTable(rows));
    })

    .then(()=> {
        chooseRequest();
    })
}

// VIEW ALL EMPLOYEES
const viewEmps = () => {
    sql.getEmps()
  
    .then(([rows]) => {
      console.log('\n');
      console.log(cTable.getTable(rows));
    })
  
    .then(()=> {
        chooseRequest();
    }) 
}



// DELETE EMPLOYEE
// UPDATE EMPLOYEE'S ROLE 
// UPDATE EMPLOYEE'S MANAGER
// VIEW ALL DEPARTMENT'S BUDGETS
// VIEW EMPLOYEES IN A SPECIFIC DEPARTMENT