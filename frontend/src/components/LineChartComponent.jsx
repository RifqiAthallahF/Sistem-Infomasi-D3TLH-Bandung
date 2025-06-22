import React, { useState, useEffect } from "react";
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
  const [fontSize, setFontSize] = useState(14);
  const [labelDy, setLabelDy] = useState(9);
  const [labelDx, setLabelDx] = useState(-15);

  useEffect(() => {
    const updateResponsiveValues = () => {
      const width = window.innerWidth;

      if (width <= 320) {
        setFontSize(8);
        setLabelDy(6);
        setLabelDx(-10);
      } else if (width <= 376) {
        setFontSize(10);
        setLabelDy(6);
        setLabelDx(-10);
      } else if (width <= 426) {
        setFontSize(10);
        setLabelDy(6);
        setLabelDx(-10);
      } else if (width <= 476) {
        setFontSize(10);
        setLabelDy(6);
        setLabelDx(-9);
      } else if (width <= 500) {
        setFontSize(10);
        setLabelDy(6);
        setLabelDx(-12);
      } else if (width <= 550) {
        setFontSize(10);
        setLabelDy(6);
        setLabelDx(-10);
      } else {
        setFontSize(14);
        setLabelDy(9);
        setLabelDx(-15);
      }
    };

    updateResponsiveValues();
    window.addEventListener("resize", updateResponsiveValues);
    return () => window.removeEventListener("resize", updateResponsiveValues);
  }, []);

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

  const getYAxisDomain = (data) => {
    const values = data.map((item) => item.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = Math.max(10, (max - min) * 0.1);
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 10, left: 15, bottom: 20 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#eee"
          strokeOpacity={0.5}
        />
        <XAxis
          dataKey="year"
          tick={{
            fontSize: fontSize,
            dy: 10,
            fontFamily: "Poppins",
            fontWeight: "bold",
          }}
          label={{
            value: "Tahun",
            position: "insideBottom",
            offset: -7,
            dy: labelDy,
            style: {
              fontSize: fontSize,
              fontFamily: "Poppins",
              fontWeight: "bold",
            },
          }}
        />
        <YAxis
          tick={{
            style: {
              fontSize: fontSize,
              fontFamily: "Poppins",
              fontWeight: "bold",
            },
          }}
          domain={getYAxisDomain(chartData)}
          tickFormatter={(value) =>
            value.toLocaleString("id-ID", {
              maximumFractionDigits: 0,
            })
          }
          label={{
            value: satuan ? `${satuan}` : "",
            angle: -90,
            position: "insideLeft",
            offset: 4,
            style: {
              textAnchor: "middle",
              fontSize: fontSize - 1,
              fontFamily: "Poppins",
              fontWeight: "bold",
            },
            dy: 0,
            dx: labelDx,
          }}
        />

        <Tooltip
          content={({ payload }) => {
            if (!payload || !payload.length) return null;
            const { value } = payload[0].payload;
            return (
              <div className="line-chart-tooltip-simple">
                <div style={{ fontWeight: "bold", fontSize: fontSize - 1 }}>
                  {kategoriTanpaTahun}
                </div>
                <div style={{ fontSize: fontSize - 2 }}>
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
