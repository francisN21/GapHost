// gotta require those packages
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const colors = require("colors");
const clear = require("clear");
const figlet = require("figlet");
const { exit } = require("process");

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
          empMan();
          break;
        case "Remove Employee":
          empMan();
          break;
        case "Update Employee Role":
          empMan();
          break;
        case "Update Employee Manager":
          empMan();
          break;
        case "View All Roles":
          empMan();
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
  console.log("viewed Emp");
};
const empDept = () => {
  console.log("viewed Emp");
};

const empMan = () => {
  console.log("viewed Emp");
};

const terminate = () => {
  connection.end();
  process.exit(0);
};
