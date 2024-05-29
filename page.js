// pages/index.js
"use client";
import { useState } from "react";
import { gaussJordan } from "../../utils/gausJordan";

export default function Home() {
  const [matrix, setMatrix] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [vector, setVector] = useState([0, 0, 0]);
  const [solution, setSolution] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleMatrixChange = (i, j, value) => {
    const newMatrix = matrix.map((row, rowIndex) =>
      rowIndex === i
        ? row.map((val, colIndex) => (colIndex === j ? parseFloat(value) : val))
        : row
    );
    setMatrix(newMatrix);
  };

  const handleVectorChange = (i, value) => {
    const newVector = vector.map((val, index) =>
      index === i ? parseFloat(value) : val
    );
    setVector(newVector);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { solution, steps } = gaussJordan(matrix, vector);
    setSolution(solution);
    setSteps(steps);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundImage: 'url(https://png.pngtree.com/background/20210712/original/pngtree-cute-hand-drawn-style-mathematics-education-green-stripes-background-picture-image_1176968.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center' 
    }}>
      <div style={{ padding: '20px 40px', backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', backgroundColor: '#800080', display: 'flex', justifyContent: 'center', padding: '16px', borderRadius: '8px' }}>
          Eliminasi Gauss Jordan
        </h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '16px', gap: '16px' }}>
            <div>
              <h2 style={{ fontWeight: 'bold' }}>Matrix A</h2>
              {matrix.map((row, i) => (
                <div key={i} style={{ display: 'flex' }}>
                  {row.map((val, j) => (
                    <input
                      key={j}
                      type="number"
                      value={val}
                      onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                      style={{ width: '64px', margin: '4px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <h2>=</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontWeight: 'bold' }}>Matrix B</h2>
              {vector.map((val, i) => (
                <input
                  key={i}
                  type="number"
                  value={val}
                  onChange={(e) => handleVectorChange(i, e.target.value)}
                  style={{ width: '64px', marginBottom: '8px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            style={{ backgroundColor: '#4caf50', color: 'white', fontWeight: 'bold', margin: '16px auto', width: '128px', padding: '8px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Solve
          </button>
        </form>
        {solution && (
          <div style={{ marginTop: '32px' }}>
            <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>Hasil</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
              {solution.map((val, i) => (
                <p key={i} style={{ margin: '0 8px' }}>
                  x<sub>{i + 1}</sub> = {val}
                </p>
              ))}
            </div>
          </div>
        )}
        {steps.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>Iteration Steps</h2>
            <div style={{ overflow: 'auto', maxHeight: '256px' }}>
              {steps.map((step, stepIndex) => (
                <div key={stepIndex} style={{ margin: '16px 0' }}>
                  <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Step {stepIndex + 1}
                  </h3>
                  <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
                    <tbody>
                      {step.map((row, i) => (
                        <tr key={i}>
                          {row.map((val, j) => (
                            <td
                              key={j}
                              style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}
                            >
                              {typeof val === 'number' ? val.toFixed(2) : val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}