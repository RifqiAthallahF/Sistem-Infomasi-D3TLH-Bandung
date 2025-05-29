import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ parameters, dataSource }) => {
  const satuanMap = {
    Sampah: "L/Tahun",
    Tinja: "m³/Tahun",
    Biochemical: "mg/L",
    Chemical: "mg/L",
    Suspended: "mg/L",
    penduduk: "Jiwa",
  };

  const kategori = parameters[0]?.label || "";
  const kategoriTanpaTahun = kategori.replace(/\s*\d{4}/, "").trim();
  const satuan =
    Object.entries(satuanMap).find(([key]) =>
      kategori.toLowerCase().includes(key.toLowerCase())
    )?.[1] || "";

  const chartData = parameters.map((param) => {
    const year = param.label.match(/\d{4}/)?.[0];
    return {
      year: year || "N/A",
      value: dataSource.aktual?.[param.field] ?? 0,
    };
  });

  // Fungsi aman untuk menghitung domain YAxis
  const getYAxisDomain = (data) => {
    const values = data.map((item) => item.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = Math.max(10, (max - min) * 0.1); // Padding minimal 10

    return [Math.floor(min - padding), Math.ceil(max + padding)];
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 30, right: 30, left: 10, bottom: 20 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#eee"
          strokeOpacity={0.5}
        />
        <XAxis
          dataKey="year"
          tick={{
            fontSize: 14,
            dy: 10,
            fontFamily: "Poppins",
            fontWeight: "bold",
          }}
          label={{
            value: "Tahun",
            position: "insideBottom",
            offset: -10,
            dy: 10,
            style: { fontSize: 14, fontFamily: "Poppins", fontWeight: "bold" },
          }}
        />
        <YAxis
          tick={{
            style: {
              fontSize: 14,
              fontFamily: "Poppins",
              fontWeight: "bold",
            },
          }}
          domain={getYAxisDomain(chartData)}
          label={{
            value: ` ${satuan ? `${satuan}` : ""}`,
            angle: -90,
            position: "insideLeft",
            offset: 0,
            style: {
              textAnchor: "middle",
              fontSize: 13,
              fontFamily: "Poppins",
              fontWeight: "bold",
            },
            dy: 0,
            dx: -5,
          }}
        />

        <Tooltip
          content={({ payload }) => {
            if (!payload || !payload.length) return null;
            const { value } = payload[0].payload;
            return (
              <div className="line-chart-tooltip-simple">
                <div style={{ fontWeight: "bold" }}>{kategoriTanpaTahun}</div>
                <div>
                  Nilai Aktual:{" "}
                  {value.toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  {satuan}
                </div>
              </div>
            );
          }}
        />

        <Line
          type="monotone"
          dataKey="value"
          stroke="rgba(34, 139, 34, 1)"
          strokeWidth={3}
          dot={{
            stroke: "rgba(34, 139, 34, 1)",
            strokeWidth: 2,
            fill: "#fff",
            r: 6,
            family: "Poppins",
          }}
          activeDot={{ r: 8, stroke: "rgba(0,100,0,1)", strokeWidth: 3 }}
          isAnimationActive={true}
          animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
