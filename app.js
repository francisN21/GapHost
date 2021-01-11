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

  startMenu();
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
// funtions to satisfy the question/switch statements
const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    tempDel1 = [];
    tempRole = [];
    tempManager = [];
    startMenu();
  });
};
const viewManagers = () => {
  connection.query("SELECT * FROM manager INNER JOIN department ON manager.department_id = department.id", (err, res) => {
    if (err) throw err;
    console.table(res);
    tempDel1 = [];
    tempRole = [];
    tempManager = [];
    startMenu();
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
      startMenu();
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
      startMenu();
    }
  );
};

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
          startMenu();
        }
      );
    });
};

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
          startMenu();
        }
      );
    });
};
// to Update employee Role, indexOf works as the role ID to be set on the query
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
          startMenu();
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
          startMenu();
        }
      );
    });
};

// to view all roles
const viewAllRoles = () => {
  connection.query(
    "SELECT * FROM role INNER JOIN department ON role.id=department.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      tempDel1 = [];
      tempRole = [];
      tempManager = [];
      startMenu();
    }
  );
};

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
