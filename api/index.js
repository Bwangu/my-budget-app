const url = "http://mybudgetapplication.com/App";

async function createBudget(data) {
  return await fetch(url + "/create-budget.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function getMarkets() {
  return await fetch(url + "/markets.php");
}

async function getFoods(id) {
  return await fetch(url + "/foods.php?market=" + id);
}

async function getProducts(id) {
  return await fetch(url + "/products", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
}

async function getFeatured() {
  return await fetch(url + "/featured.php");
}

async function getBudgets(user) {
  return await fetch(url + `/budget?user=${user}`);
}

async function getMonthlyBudgetItems() {
  return await fetch(url + "/monthly-budget.php");
}

async function getRecipes() {
  return await fetch(url + "/recipes.php");
}

async function getBudgetItems(budget) {
  return await fetch(url + `/budget-items?budget=${budget}`);
}

async function deleteBudgetItem(id) {
  return await fetch(url + `/budget-items/delete.php?item=${id}`);
}

async function addBudgetItem(data) {
  return await fetch(url + `/budget-items/add.php`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// login
async function login({ emailphone, password }) {
  return await fetch(url + "/login.php", {
    method: "POST",
    body: JSON.stringify({ email: emailphone, password }),
  });
}

// create account
async function signup(data) {
  return await fetch(url + "/create-account.php", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
export {
  login,
  signup,
  createBudget,
  getMarkets,
  getProducts,
  getFoods,
  getFeatured,
  getBudgets,
  getBudgetItems,
  getRecipes,
  getMonthlyBudgetItems,
  addBudgetItem,
  deleteBudgetItem,
};
