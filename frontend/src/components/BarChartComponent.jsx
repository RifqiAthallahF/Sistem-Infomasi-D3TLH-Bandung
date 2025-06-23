import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomLegend = ({ showThreshold }) => (
  <div className="bar-chart-legend">
    <span className="bar-chart-legend-item">
      <span
        className="bar-chart-color-box"
        style={{
          background: "linear-gradient(to top, #228B22, #90EE90)",
        }}
      ></span>
      Aktual
    </span>
    {showThreshold && (
      <span className="bar-chart-legend-item">
        <span
          className="bar-chart-color-box"
          style={{
            background: "linear-gradient(to top, #FF8C00, #FFD700)",
          }}
        ></span>
        Rata-rata
      </span>
    )}
  </div>
);

const BarChartComponent = ({
  parameters,
  dataSource,
  group,
  showThreshold = false,
}) => {
  const chartData = parameters.map((param) => {
    const label = param.label;
    const actualValue = Number(dataSource.aktual?.[param.field]) || 0;
    const thresholdValue =
      showThreshold && param.thresholdField
        ? Number(dataSource.rata_rata?.[param.thresholdField]) || 0
        : null;

    return {
      label,
      actual: actualValue,
      threshold: thresholdValue,
    };
  });

  const isGroupJiwa = group?.toLowerCase() === "daya dukung pangan dan air";
  const yAxisLabel = isGroupJiwa ? "Jiwa" : "Persentase (%)";
  const yAxisSuffix = isGroupJiwa ? " jiwa" : " %";

  const maxValue = Math.max(
    ...chartData.map((item) => Math.max(item.actual, item.threshold ?? 0))
  );
  const yAxisMax = Math.ceil(maxValue * 1.1);

  return (
    <div className="bar-chart-container">
      <CustomLegend showThreshold={showThreshold} />

      <ResponsiveContainer width="100%" height={480}>
        <BarChart
          data={chartData}
          margin={{ top: 0, right: 10, left: -19, bottom: 107 }}
        >
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#228B22" />
              <stop offset="90%" stopColor="#90EE90" />
            </linearGradient>

            <linearGradient id="orangeGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#FF8C00" />
              <stop offset="90%" stopColor="#FFD700" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="label"
            angle={0}
            textAnchor="end"
            interval={0}
            tick={{
              style: {
                fontSize: 12,
                fontFamily: "Poppins",
                fontWeight: "bold",
              },
            }}
          />
          <YAxis
            domain={[0, yAxisMax]}
            tick={{
              style: {
                fontSize: 12,
                fontFamily: "Poppins",
                fontWeight: "bold",
              },
            }}
            label={{
              value: yAxisLabel,
              position: "outsideLeft",
              offset: 10,
              dx: -7,
              angle: -90,
              style: {
                fontSize: 12,
                fontFamily: "Poppins",
                fontWeight: "bold",
              },
            }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                const actual = item.actual;
                const threshold = item.threshold;

                const suffix = isGroupJiwa ? " jiwa" : " %";
                const formattedActual = `${actual.toLocaleString("id", {
                  minimumFractionDigits: isGroupJiwa ? 0 : 2,
                  maximumFractionDigits: isGroupJiwa ? 0 : 2,
                })}${suffix}`;

                const formattedThreshold =
                  threshold !== null && threshold !== undefined
                    ? `${threshold.toLocaleString("id", {
                        minimumFractionDigits: isGroupJiwa ? 0 : 2,
                        maximumFractionDigits: isGroupJiwa ? 0 : 2,
                      })}${suffix}`
                    : null;

                const status =
                  threshold !== null && threshold !== undefined
                    ? actual > threshold
                      ? "Melampaui Rata-rata"
                      : "Tidak Melampaui Rata-rata"
                    : null;

                return (
                  <div className="bar-chart-tooltip-simple">
                    <div>
                      <strong>{label}</strong>
                    </div>
                    <div>Nilai Aktual: {formattedActual}</div>
                    {formattedThreshold && (
                      <div>Rata-rata: {formattedThreshold}</div>
                    )}
                    {status && <div>Status: {status}</div>}
                  </div>
                );
              }
              return null;
            }}
          />

          <Bar
            dataKey="actual"
            fill="url(#greenGradient)"
            name="Aktual"
            radius={[8, 8, 0, 0]}
          />

          {showThreshold && (
            <Bar
              dataKey="threshold"
              fill="url(#orangeGradient)"
              name="Rata-rata"
              radius={[8, 8, 0, 0]}
              barSize={20}
              opacity={0.9}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
