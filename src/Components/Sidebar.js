import React from 'react';

function Sidebar({ setSelectedChart }) {
  const handleClick = (chartType) => {
    setSelectedChart(chartType);
  };

  return (
    <div className="sidebar">
      <h2>Opciones de Diagramas</h2>
      <button onClick={() => handleClick("lines")}>Diagrama de Líneas</button>
      <button onClick={() => handleClick("bars")}>Diagrama de Barras</button>
      <button onClick={() => handleClick("pies")}>Diagrama de Pies</button>
    </div>
  );
}

export default Sidebar;
