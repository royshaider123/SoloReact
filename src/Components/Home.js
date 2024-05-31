import BarsChart from "./BarsChart";
import LinesChart from "./LinesChart"
import './Style.css'

export function Home() {
    return (
        <div>
            <h1>Gráficas de Gas</h1>
            <h1 className="bg-info text-center font-monospace fw-bold lh-base">Gráficas ChartJS</h1>
            <div className="chart-container">
                <p><b>Ejemplo #1: </b>Gráfico de barras</p>
                <div className="chart-box">
                    <BarsChart />
                </div>
            </div>
            <div className="chart-container">
                <p><b>Ejemplo #2: </b>Gráfico de líneas básico</p>
                <div className="chart-box">
                    <LinesChart />
                </div>
            </div>
        </div>
    );
}
