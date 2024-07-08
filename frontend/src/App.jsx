import { useState } from "react";
import axios from "axios";

const ChemicalBalancer = () => {
  const [inputEquation, setInputEquation] = useState("");
  const [balancedEquation, setBalancedEquation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBalance = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/balance-equation",
        {
          equation: inputEquation,
        }
      );
      setBalancedEquation(response.data.balancedEquation);
    } catch (error) {
      console.error("Error balancing equation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Chemical Equation Balancer</h2>
      <textarea
        className="input"
        value={inputEquation}
        onChange={(e) => setInputEquation(e.target.value)}
        placeholder="Enter the chemical equation..."
        rows={4}
        cols={50}
      />
      <br />
      <button className="button" onClick={handleBalance} disabled={isLoading}>
        {isLoading ? "Balancing..." : "Balance Equation"}
      </button>
      <br />
      <div className="result">
        <strong>Balanced Equation:</strong>
        <div className="balanced-equation">{balancedEquation}</div>
      </div>
    </div>
  );
};

export default ChemicalBalancer;
