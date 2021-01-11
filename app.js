// gotta require those packages
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const colors = require("colors");
const clear = require("clear");
const figlet = require("figlet");

let tempDel1 = [];
let tempRole = [];

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
  console.log(
    "|Welcome to Francisco's Employee Tracker                               |"
      .brightGreen
  );
};
asciWelcome();
// to start the application
const startMenu = () => {
  dofetchEmployee();
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Please choose an action below:",
      choices: [
        "View All Employees",
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
    startMenu();
  });
};
const empDept = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    tempDel1 = [];
    tempRole = [];
    startMenu();
  });
};

const empMan = () => {
  connection.query(
    "SELECT e.first_name AS Employee, m.first_name AS Manager FROM employee e INNER JOIN employee m ON m.id=e.manager_id ORDER BY e.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      tempDel1 = [];
      tempRole = [];
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
        type: "input",
        message: "What is the employee's role id?",
      },
      {
        name: "addManagerID",
        type: "input",
        message: "What is the manager's role id?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.addName,
          last_name: answer.addLast,
          role_id: answer.addRoleID,
          manager_id: answer.addManagerID,
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `${answer.addName} ${answer.addLast} added to employees \n`
          );
          tempDel1 = [];
          tempRole = [];
          startMenu();
        }
      );
    });
};

const removeEmployee = () => {
  askDelEmployee();
};

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
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [{ role_id: answer.updateRole }, { first_name: answer.updateRoleName }],
        (err, res) => {
          if (err) throw err;
          console.log(answer);
          tempDel1 = [];
          tempRole = [];
          startMenu();
        }
      );
    });
};

const updateEmpManager = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};

const viewAllRoles = () => {
  connection.query(
    "SELECT * FROM role INNER JOIN department ON role.id=department.id",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      tempDel1 = [];
      tempRole = [];
      startMenu();
    }
  );
};

const terminate = () => {
  connection.end();
  process.exit(0);
};

function askDelEmployee() {
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
          console.log(answer);
          tempDel1 = [];
          tempRole = [];
          startMenu();
        }
      );
    });
}
async function dofetchEmployee() {
  try {
    await fetchEmployee();
    fetchRole();
  } catch (err) {
    console.log(err);
  }
}
async function fetchEmployee() {
  try {
    connection.query("SELECT first_name FROM employee", (err, res) => {
      if (err) throw err;
      let data = JSON.parse(JSON.stringify(res));
      // tempDel.push(data);
      for (i = 0; i < data.length; i++) {
        tempDel1.push(data[i].first_name);
      }
      console.log(tempDel1);
    });
  } catch (err) {
    console.log(err);
  }
}
async function fetchRole() {
  try {
    connection.query("SELECT * FROM role", (err, res) => {
      if (err) throw err;
      let data = JSON.parse(JSON.stringify(res));
      // tempDel.push(data);
      for (i = 0; i < data.length; i++) {
        tempRole.push(data[i].id);
      }
      console.log(tempRole);
    });
  } catch (err) {
    console.log(err);
  }
}
