const inquirer = require("inquirer");
const cTable = require("console.table");
const sql = require('./db/query_lib');
const CHOICES = require('./lib/CHOICES');

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
const newEmp = async () => {

    const roleArr = await CHOICES.roleChoices();
  
    const mgmtArr = await CHOICES.mgmtChoices();
  
    const emp = await inquirer.prompt([
        {
          type: "input",
          name: "first",
          message: "What is the Employees First Name?",
          validate: (first) =>{
            if (first && isNaN(first)) {
              return true;
            } else {
              console.log(" Please Enter a Name!")
              return false;
            }
          },
       },
       {
        type: "input",
        name: "last",
        message: "What is the Employees Last Name?",
        validate: (last) =>{
          if (last && isNaN(last)) {
            return true;
          } else {
            console.log(" Please Enter a Name!")
            return false;
          }
        },
      },
      {
        type: "list",
        name: 'role_id',
        message: "What is the Employees Role?",
        choices: roleArr,
        loop: false,
      },
      {
        type: "list",
        name: 'manager_id',
        message: "Who is the Employees Manager?",
        choices: mgmtArr,
        loop: false,
      }
     ]);
  
    await sql.addEmp(emp);
  
    chooseRequest();  
   
}

// ADD EMPLOYEE ROLE
const newRole = async () => {

    const choicesArr = await CHOICES.deptChoices();
  
    const role = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the Role?",
          validate: (title) =>{
            if (title) {
              return true;
            } else {
              console.log(" Please Enter a Role Name!")
              return false;
            }
          },
       },
       {
         type: "input",
         name: 'salary',
         message: "What is the Salary of the Role?",
         validate: (salary) =>{
           if(salary && !isNaN(salary)){
             return true;
           } else {
             console.log(" Please Enter a Role Salary");
           }
         }
       },
       {
        type: "list",
        name: 'department_id',
        message: "What Department is the Role associated with?",
        choices: choicesArr,
        loop: false,
      }
     ]);
  
    await sql.addRole(role);
  
    chooseRequest();  
   
}


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