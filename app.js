// gotta require those packages
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const colors = require("colors");
const clear = require("clear");
const figlet = require("figlet");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "P123456p123456!",
  database: "employee_tracker_db",
});

// connect and start the app
connection.connect((err) => {
  if (err) throw err;

  newStart();
});
// wonderful ascii text generator from https://www.kammerl.de/ascii/AsciiSignature.php using figlet front end
const asciWelcome = () => {
  clear();
  console.log("|``````````````````````````````````````````````````````````````````````|".brightGreen);
  console.log("|   >===>                         >=>    >=>                      >=>  |".brightGreen);
  console.log("| >>    >=>                       >=>    >=>                      >=>  |".brightGreen);
  console.log("|>=>            >=> >=>  >=> >=>  >=>    >=>    >=>      >===>  >=>>==>|".brightGreen);
  console.log("|>=>          >=>   >=>  >>   >=> >=====>>=>  >=>  >=>  >=>       >=>  |".brightGreen);
  console.log("|>=>   >===> >=>    >=>  >>   >=> >=>    >=> >=>    >=>   >==>    >=>  |".brightGreen);
  console.log("| >=>    >>   >=>   >=>  >=> >=>  >=>    >=>  >=>  >=>      >=>   >=>  |".brightGreen);
  console.log("|  >====>      >==>>==>  >=>      >=>    >=>    >=>     >=>>>=>   >=>  |".brightGreen);
  console.log("|                        >=>                                           |".brightGreen);
  console.log("|``````````````````````````````````````````````````````````````````````|".brightGreen);
  console.log("|Welcome to Francisco's Employee Tracker                               |".brightGreen);
};
asciWelcome();
// to start the application
const startMenu = () => {
  // updateArrays make sures that all choices are available every time it goes to the start menu
  updateArrays();
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Please choose an action below:",
      choices: [
        "View All Employees",
        "View All Managers",

        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Exit",
      ],
    })
    .then((answer) => {
      // switch statement for all the questions
      switch (answer.action) {
        case "View All Employees":
          
          break;
        case "View All Managers":
          
          break;


        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          updateEmpRole();
          break;
        case "Update Employee Manager":
          updateEmpManager();
          break;
        case "View All Roles":
          
          break;
        case "Exit":
          terminate();
          break;
        default:
      }
    });
};

const newStart = () => {
  updateArrays();
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'Please choose an action below: ',
    choices: ["Add", "View", "Update", "Delete", "Exit"]
  }).then((answer)=>{
    switch (answer.action) {
      case "Add":
        add();
        break;
      case "View":
        view()
        break;
      case "Update":
        update();
        break;
      case "Delete":
        erase()
        break;
      case "Exit":
        terminate();
        break;
      default:
    }
  })
};
// new switch question
const add = () =>{inquirer.prompt({
  name: 'action',
  type: 'list',
  message: 'What do you want to add?',
  choices: ["Employee", "Manager", "Role", "Department", "Exit"]
}).then((answer)=>{
  switch (answer.action) {
    case "Employee":
      addEmployee();
      break;
    case "Manager":
      addManager();
      break;
    case "Role":
      addRole()
      break;
    case "Department":
      addDepartment()
      break;
    case "Exit":
      terminate();
      break;
    default:
  }
  });
}
const view = () =>{inquirer.prompt({
  name: 'action',
  type: 'list',
  message: 'What do you want to view?',
  choices: ["Employee", "Manager", "Role", "Department", "View All Employees by Department", "View All Employees by Manager", "Exit"]
}).then((answer)=>{
  switch (answer.action) {
    case "Employee":
      viewEmployees();
      break;
    case "Manager":
      viewManagers();
      break;
    case "Role":
      viewAllRoles();
      break;
    case "Department":
      viewDepartment()
      break;
    case "View All Employees by Department":
      empDept();
      break;
    case "View All Employees by Manager":
      empMan();
      break;
    case "Exit":
      terminate();
      break;
    default:
  }
  });
}

const update = () =>{inquirer.prompt({
  name: 'action',
  type: 'list',
  message: 'What do you want to update?',
  choices: ["Employee Role", "Manager Department", "Role Salary", "Exit"]
}).then((answer)=>{
  switch (answer.action) {
    case "Employee Role":
      updateEmployee();
      break;
    case "Manager Department":
      updateManager();
      break;
    case "Role Salary":
      updateSalary();
      break;
    case "Exit":
      terminate();
      break;
    default:
  }
  });

};

const erase = () =>{inquirer.prompt({
  name: 'action',
  type: 'list',
  message: 'What do you want to delete?',
  choices: ["Employee", "Role", "Department", "Manager", "Exit"]
}).then((answer)=>{
  switch (answer.action) {
    case "Employee":
      deleteEmployee();
      break;
    case "Role":
      deleteRole();
      break;
    case "Department":
      deleteDepartment();
      break;
    case "Manager":
      deleteManager();
      break;
    case "Exit":
      terminate();
      break;
    default:
  }
  });

};

// ============================= VIEW SECTION ==========================//
const viewAllRoles = () => {
  connection.query(
    "SELECT * FROM role INNER JOIN department ON role.department_id = department.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      tempDel1 = [];
      tempRole = [];
      tempManager = [];
      tempDepartment = [];
      newStart();
    }
  );
};
const viewDepartment = () => {
  connection.query(
    "SELECT * FROM department INNER JOIN role ON role.department_id = department.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      tempDel1 = [];
      tempRole = [];
      tempManager = [];
      tempDepartment = [];
      newStart();
    }
  );
};
const viewEmployees = () => {
  connection.query("SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id", (err, res) => {
    if (err) throw err;
    console.table(res);
    tempDel1 = [];
    tempRole = [];
    tempManager = [];
    tempDepartment = [];
    newStart();
  });
};
const viewManagers = () => {
  connection.query("SELECT * FROM manager INNER JOIN department ON manager.department_id = department.id", (err, res) => {
    if (err) throw err;
    console.table(res);
    tempDel1 = [];
    tempRole = [];
    tempManager = [];
    tempDepartment = [];
    newStart();
  });
};
const empDept = () => {
  connection.query(
    "SELECT employee.first_name AS Employee, department.name AS Department FROM employee INNER JOIN department ON department.id = employee.role_id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      tempDel1 = [];
      tempRole = [];
      tempManager = [];
      tempDepartment = [];
      newStart();
    }
  );
};

const empMan = () => {
  connection.query(
    "SELECT employee.first_name AS Employee, manager.first_name AS Manager FROM employee INNER JOIN manager ON manager.id = employee.role_id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      tempDel1 = [];
      tempRole = [];
      tempManager = [];
      tempDepartment = [];
      newStart();
    }
  );
};
// ============================= ADD SECTION ==========================//
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "addName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "addLast",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "addRoleID",
        type: "list",
        message: "What is the employee's role?",
        choices: tempRole,
      },
    ])
    .then((answer) => {
      let roleId = tempRole.indexOf(answer.addRoleID) + 1;
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.addName,
          last_name: answer.addLast,
          role_id: roleId,
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `${answer.addName} ${answer.addLast} added to employees \n`
          );
          tempDel1 = [];
          tempRole = [];
          tempManager = [];
          tempDepartment = [];
          newStart();
        }
      );
    });
};
const addManager = () => {
  inquirer
    .prompt([
      {
        name: "managerName",
        type: "input",
        message: "What is the manager's first name?",
      },
      {
        name: "managerLast",
        type: "input",
        message: "What is the manager's last name?",
      },
      {
        name: "addManagerID",
        type: "list",
        message: "What is the manager's department?",
        choices: tempDepartment,
      },
    ])
    .then((answer) => {
      let deptID = tempDepartment.indexOf(answer.addManagerID) + 1;
      connection.query(
        "INSERT INTO manager SET ?",
        {
          first_name: answer.managerName,
          last_name: answer.managerLast,
          department_id: deptID,
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `${answer.managerName} ${answer.managerLast} added to managers \n`
          );
          tempDel1 = [];
          tempRole = [];
          tempManager = [];
          tempDepartment = [];
          newStart();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the role title?",
      },
      {
        name: "salary",
        type: "input",
        message: "How much does this role pay?",
      },
      {
        name: "departmentID",
        type: "list",
        message: "This role falls under what department?",
        choices: tempDepartment,
      },
    ])
    .then((answer) => {
      let deptID = tempDepartment.indexOf(answer.departmentID) + 1;
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: deptID,
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `${answer.title} has been added to roles \n`
          );
          tempDel1 = [];
          tempRole = [];
          tempManager = [];
          tempDepartment = [];
          newStart();
        }
      );
    });
};
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Name of department?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.title,
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `${answer.title} has been added to department \n`
          );
          tempDel1 = [];
          tempRole = [];
          tempManager = [];
          tempDepartment = [];
          newStart();
        }
      );
    });
};
// ============================= REMOVE SECTION ==========================//
const deleteEmployee = () => {
  inquirer
    .prompt([
      {
        name: "deleteName",
        type: "list",
        message: "Who do you want to delete?",
        choices: tempDel1,
      },
    ])
    .then((answer) => {
      connection.query(
        "DELETE FROM employee WHERE ?",
        [{ first_name: answer.deleteName }],
        (err, res) => {
          if (err) throw err;
          console.log("Success!");
          tempDel1 = [];
          tempRole = [];
          tempManager = [];
          tempDepartment = [];
          newStart();
        }
      );
    });
};

const deleteRole = () => {
  inquirer
    .prompt([
      {
        name: "deleteName",
        type: "list",
        message: "Who do you want to delete?",
        choices: tempRole,
      },
    ])
    .then((answer) => {
      connection.query(
        "DELETE FROM role WHERE ?",
        [{ title: answer.deleteName }],
        (err, res) => {
          if (err) throw err;
          console.log(`Success! ${answer.deleteName} has been removed`);
          tempDel1 = [];
          tempRole = [];
          tempManager = [];
          tempDepartment = [];
          newStart();
        }
      );
    });
};

const deleteDepartment = () => {
  inquirer
    .prompt([
      {
        name: "deleteName",
        type: "list",
        message: "Who do you want to delete?",
        choices: tempDepartment,
      },
    ])
    .then((answer) => {
      connection.query(
        "DELETE FROM department WHERE ?",
        [{ name: answer.deleteName }],
        (err, res) => {
          if (err) throw err;
          console.log(`Success! ${answer.deleteName} has been removed`);
          tempDel1 = [];
          tempRole = [];
          tempManager = [];
          tempDepartment = [];
          newStart();
        }
      );
    });
};

const deleteManager = () => {
  inquirer
    .prompt([
      {
        name: "deleteName",
        type: "list",
        message: "Who do you want to delete?",
        choices: tempManager,
      },
    ])
    .then((answer) => {
      connection.query(
        "DELETE FROM manager WHERE ?",
        [{ first_name: answer.deleteName }],
        (err, res) => {
          if (err) throw err;
          console.log(`Success! ${answer.deleteName} has been removed`);
          tempDel1 = [];
          tempRole = [];
          tempManager = [];
          tempDepartment = [];
          newStart();
        }
      );
    });
};
// ============================= UPDATE SECTION ==========================//
const updateEmployee = () => {
  inquirer
    .prompt([
      {
        name: "updateRoleName",
        type: "list",
        message: "Who do you want to update Role?",
        choices: tempDel1,
      },
      {
        name: "updateRole",
        type: "list",
        message: `What will be the new role?`,
        choices: tempRole,
      },
    ])
    .then((answer) => {
      let roleId = tempRole.indexOf(answer.updateRole) + 1;
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [{ role_id: roleId }, { first_name: answer.updateRoleName }],
        (err, res) => {
          if (err) throw err;
          console.log(`Success! ${answer.updateRoleName} is now working as ${answer.updateRole}!`);
          tempDel1 = [];
          tempRole = [];
          tempManager = [];
          tempDepartment = [];
          newStart();
        }
      );
    });
};

const updateManager = () => {
  inquirer
    .prompt([
      {
        name: "managerName",
        type: "list",
        message: "Choose the manager name?",
        choices: tempManager,
      },
      {
        name: "updateManager",
        type: "list",
        message: `Will be managing what department?`,
        choices: tempDepartment,
      },
    ])
    .then((answer) => {
      let departmentID = tempDepartment.indexOf(answer.updateManager) + 1;
      connection.query(
        "UPDATE manager SET ? WHERE ?",
        [{ department_id: departmentID }, { first_name: answer.managerName }],
        (err, res) => {
          if (err) throw err;
          console.log(`Success! ${answer.managerName} is now managing ${answer.updateManager} department!`);
          tempDel1 = [];
          tempRole = [];
          tempManager = [];
          tempDepartment = [];
          newStart();
        }
      );
    });
};

const updateSalary = () => {
  inquirer
    .prompt([
      {
        name: "role",
        type: "list",
        message: "Choose role?",
        choices: tempRole,
      },
      {
        name: "amount",
        type: "input",
        message: `How much do you want to increase salary?`,
      },
    ])
    .then((answer) => {
      connection.query(
        "UPDATE role SET ? WHERE ?",
        [{ salary: answer.amount }, { title: answer.role } ],
        (err, res) => {
          if (err) throw err;
          console.log(`Success! ${answer.role} is now ${answer.amount}!`);
          tempDel1 = [];
          tempRole = [];
          tempManager = [];
          tempDepartment = [];
          newStart();
        }
      );
    });
};


// ============================= REQUIRED SET UP SECTION ==========================//
// terminates the application
const terminate = () => {
  connection.end();
  process.exit(0);
};

// refreshes choices for questions
const updateArrays = () => {
  fetchEmployee();
  fetchRole();
  fetchManager();
  fetchDepartment();
};
let tempDel1 = [];
const fetchEmployee = () => {
  connection.query("SELECT first_name FROM employee", (err, res) => {
    if (err) throw err;
    let data = JSON.parse(JSON.stringify(res));
    // tempDel.push(data);
    for (i = 0; i < data.length; i++) {
      tempDel1.push(data[i].first_name);
    }
    // console.log(tempDel1);
  });
  return tempDel1;
};
// fetches roles
let tempRole = [];
const fetchRole = () => {
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    let data = JSON.parse(JSON.stringify(results));
    // tempDel.push(data);
    for (i = 0; i < data.length; i++) {
      tempRole.push(data[i].title);
    }
  });
  return tempRole;
};
// fetches managers
let tempManager = [];
const fetchManager = () => {
  connection.query("SELECT * FROM manager", (err, results1) => {
    if (err) throw err;
    let data = JSON.parse(JSON.stringify(results1));
    // tempDel.push(data);
    for (i = 0; i < data.length; i++) {
      tempManager.push(data[i].first_name);
    }
  });
  return tempManager;
};

let tempDepartment = [];
const fetchDepartment = () => {
  connection.query("SELECT * FROM department", (err, results1) => {
    if (err) throw err;
    let data = JSON.parse(JSON.stringify(results1));
    // tempDel.push(data);
    for (i = 0; i < data.length; i++) {
      tempDepartment.push(data[i].name);
    }
  });
  return tempDepartment;
};
