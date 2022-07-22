const inquirer = require("inquirer");
const cTable = require("console.table");
const sql = require('./db/query_lib');
const CHOICES = require('./lib/CHOICES');

// Add department
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

// Add employee
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

// Add role
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

// Delete and Employee
    // Bonus Objective
const delEmp = async () => {
  const empArr = await CHOICES.NonMgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "What Employee do you want to Delete?",
      choices: empArr,
      loop: false,
    }
   ]);

  await sql.deleteEmp(emp);

  chooseRequest();

}

// Update an employees role
const updateEmpRole = async () => {

  const roleArr = await CHOICES.roleChoices();

  const empArr = await CHOICES.empChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "What is the Employee do you want to update?",
      choices: empArr,
      loop: false,
    },
    {
      type: "list",
      name: 'role_id',
      message: "What is the Employees Role?",
      choices: roleArr,
      loop: false,
    }
   ]);

  await sql.updateEmpRoleById(emp);

  chooseRequest();  
 
}

// Update an employees Manager
// Bonus
const updateEmpManager = async () => {

  const empArr = await CHOICES.NonMgmtChoices();

  const mgmtArr = await CHOICES.mgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "What is the Employee do you want to update?",
      choices: empArr,
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

  await sql.updateEmpManagerById(emp);

  chooseRequest();  
 
}

// View All Departments
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
// View All employees
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

// View All Departments and their Budget 
// Bonus Objective
const viewBudgets = async () => {

  sql.getBudgetByDept()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(()=> {
      chooseRequest();
  }) 
}

// View All Employees in a specific Department
// Bonus Objective
const viewEmpByDept = async () => {

  const deptArr = await CHOICES.deptChoices();

  inquirer.prompt([
    {
      type: "list",
      name: "dept_id",
      message: "What is the Department do you want to view Employees for?",
      choices: deptArr,
      loop: false
    }
   ])

  .then((data) => {
    sql.getEmpByDeptId(data)
      .then(([rows]) =>{
        console.log('\n');
        console.log(cTable.getTable(rows))
        chooseRequest();
      })
  }) 

}

// View All Employees who report to a specific Manager
// Bonus Objective
const viewEmpByMgr = async () => {

  const mgmtArr = await CHOICES.mgmtChoices();

  inquirer.prompt([
    {
      type: "list",
      name: "manager_id",
      message: "Which Manager do you want to view Employees for?",
      choices: mgmtArr,
      loop: false
    }
   ])

  .then((data) => {
    sql.getEmpByMgrId(data)
      .then(([rows]) =>{
        console.log('\n');
        console.log(cTable.getTable(rows))
        chooseRequest();
      })
  }) 

}


const chooseRequest = () => {
  inquirer.prompt([
      {
        type: 'list',
        name: 'request',
        message: 'What would you like to do?',
        choices: ['Add a Department', 
                  'Add an Employee', 
                  'Add a Role',
                  'Delete an Employee', // Bonus
                  'Update Employees Role',
                  'Update Employees Manager', // Bonus 
                  'View All Departments', 
                  'View All Employees', 
                  'View All Roles', 
                  'View Department Budget', // Bonus
                  'View Employees by Department', // Bonus
                  'View Employees by Manager' // Bonus
                 ],
        loop: false,
      },
  ])

  .then((data) => {
      const {request} = data;
      console.log(request);
    //   Switch case
    switch (request) {
        case 'Add a Department':
          newDept();
          break;
        case 'Add a Role':
          newRole();
          break;
        case 'Add an Employee':
          newEmp();
          break;
        case 'Delete an Employee':
          delEmp();
          break;
        case 'Update Employees Role':
          updateEmpRole();
          break;
        case 'Update Employees Manager':
          updateEmpManager();
          break;
        case 'View All Departments':
          viewDepts();
          break;
        case 'View All Employees':
          viewEmps();
          break;
        case 'View All Roles':
          viewRoles();
          break;         
        case 'View Department Budget':
          viewBudgets();
          break;
        case 'View Employees by Department':
          viewEmpByDept();
          break;
        case 'View Employees by Manager':
          viewEmpByMgr();
          break;                
    
        default:
            break;
    }
  })
}

chooseRequest();



// DELETE EMPLOYEE
// UPDATE EMPLOYEE'S ROLE 
// UPDATE EMPLOYEE'S MANAGER
// VIEW ALL DEPARTMENT'S BUDGETS
// VIEW EMPLOYEES IN A SPECIFIC DEPARTMENT