const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { balance } = require("chemical-equation-balancer");

const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.json());

const balanceEquation = (equation) => {
  try {
    const balanced = balance(equation);
    return balanced;
  } catch (error) {
    console.error("Error balancing equation:", error);
    return null;
  }
};

app.post("/balance-equation", (req, res) => {
  const { equation } = req.body;
  const balancedEquation = balanceEquation(equation);

  if (balancedEquation) {
    res.json({ balancedEquation });
  } else {
    res.status(400).json({ error: "Could not balance equation" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
