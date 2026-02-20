const express = require("express");
const app = express();
const fileHandler = require("./modules/fileHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const employees = await fileHandler.read();
  res.render("index", { employees });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  const { name, department, basicSalary } = req.body;

  if (!name || !department || basicSalary <= 0) {
    return res.send("Invalid input");
  }

  let employees = await fileHandler.read();

  const newEmployee = {
    id: Date.now(),
    name,
    department,
    basicSalary: Number(basicSalary)
  };

  employees.push(newEmployee);
  await fileHandler.write(employees);

  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  const id = Number(req.params.id);
  let employees = await fileHandler.read();

  employees = employees.filter(e => e.id !== id);

  await fileHandler.write(employees);
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  const id = Number(req.params.id);
  const employees = await fileHandler.read();
  const employee = employees.find(e => e.id === id);
  res.render("edit", { employee });
});

app.post("/edit/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, department, basicSalary } = req.body;

  let employees = await fileHandler.read();

  employees = employees.map(emp =>
    emp.id === id
      ? { ...emp, name, department, basicSalary: Number(basicSalary) }
      : emp
  );

  await fileHandler.write(employees);

  res.redirect("/");
});

app.listen(3000, async () => {
  console.log("Server running on http://localhost:3000");

  const data = await fileHandler.read();
  console.log("Employees on startup:", data);
});