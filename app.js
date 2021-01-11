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
        "View All Employees by Department",
        "View All Employees by Manager",
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
          viewEmployees();
          break;
        case "View All Managers":
          viewManagers();
          break;
        case "View All Employees by Department":
          empDept();
          break;
        case "View All Employees by Manager":
          empMan();
          break;
        case "Add Employee":
          addEmployee();
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
          viewAllRoles();
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

        break;
      case "Update":

        break;
      case "Delete":

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


// ============================= VIEW SECTION ==========================//
const viewAllRoles = () => {
  connection.query(
    "SELECT * FROM role INNER JOIN department ON role.id=department.id",
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
  connection.query("SELECT * FROM employee", (err, res) => {
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
      {
        name: "addManagerID",
        type: "list",
        message: "What is the employee's manager?",
        choices: tempManager,
      },
    ])
    .then((answer) => {
      let roleId = tempRole.indexOf(answer.addRoleID) + 1;
      let manId = tempManager.indexOf(answer.addManagerID) + 1;
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.addName,
          last_name: answer.addLast,
          role_id: roleId,
          manager_id: manId,
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
            `${answer.managerName} ${answer.managerLast} added to employees \n`
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
const removeEmployee = () => {
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
// ============================= UPDATE SECTION ==========================//
const updateEmpRole = () => {
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
        message: "Who do you want to update Role?",
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

const updateEmpManager = () => {
  inquirer
    .prompt([
      {
        name: "updateName",
        type: "list",
        message: "Who do you want to update Role?",
        choices: tempDel1,
      },
      {
        name: "updateManager",
        type: "list",
        message: "Who is their manager?",
        choices: tempManager,
      },
    ])
    .then((answer) => {
      let managerId = tempManager.indexOf(answer.updateManager) + 1;
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [{ manager_id: managerId }, { first_name: answer.updateName }],
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
