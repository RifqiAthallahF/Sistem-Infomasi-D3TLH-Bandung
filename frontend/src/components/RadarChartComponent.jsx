import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChartComponent = ({ parameters, dataSource, selectedGroup }) => {
  const [isCompact, setIsCompact] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [closeBtnHover, setCloseBtnHover] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const excludedThresholdLabels =
    selectedGroup === "Potensi Beban Pencemar"
      ? ["Biochemical Oxygen", "Chemical Oxygen", "Suspended Solid"]
      : [];

  const labels = parameters.map((p) => p.label);
  const dataActual = parameters.map(
    (p) => Number(dataSource?.aktual?.[p.field]) || 0
  );
  const dataThreshold = parameters.map((p) =>
    excludedThresholdLabels.includes(p.label)
      ? null
      : Number(dataSource?.rata_rata?.[p.thresholdField]) || 0
  );

  const datasets = [
    {
      label: "Nilai Aktual",
      data: dataActual,
      backgroundColor: "rgba(66, 235, 54, 0.3)",
      borderColor: "rgba(34, 139, 34, 1)",
      pointBackgroundColor: "rgba(34, 139, 34, 1)",
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 8,
      pointHoverBorderWidth: 3,
      pointHoverBackgroundColor: "rgba(34, 139, 34, 1)",
      pointHoverBorderColor: "#fff",
      tension: 0.3,
    },
    {
      label: "Rata-rata",
      data: dataThreshold,
      backgroundColor: "rgba(255, 165, 0, 0.3)",
      borderColor: "rgba(255, 140, 0, 1)",
      pointBackgroundColor: "rgba(255, 140, 0, 1)",
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 8,
      pointHoverBorderWidth: 3,
      pointHoverBackgroundColor: "rgba(255, 140, 0, 1)",
      pointHoverBorderColor: "#fff",
      tension: 0.3,
    },
  ];

  const parameterStatus = parameters.map((p, i) => {
    const actual = Number(dataSource?.aktual?.[p.field]) || 0;
    const threshold = excludedThresholdLabels.includes(p.label)
      ? null
      : Number(dataSource?.rata_rata?.[p.thresholdField]) || 0;

    const status =
      threshold === null
        ? null
        : actual > threshold
        ? "Melampaui"
        : "Tidak Melampaui";

    return {
      label: p.label,
      status,
    };
  });

  return (
    <div
      className="radar-container"
      style={{ height: isCompact ? "320px" : "100%" }}
    >
      {/* Radar Chart dan Legend */}
      <div
        className="radar-chart-wrapper"
        style={{ height: isCompact ? "400px" : "600px" }}
      >
        <Radar
          data={{ labels, datasets }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
            },
            layout: {
              padding: isCompact
                ? { top: 5, bottom: 0, left: 0, right: 0 }
                : { top: 0, bottom: 0, left: 0, right: 0 },
            },
            scales: {
              r: {
                beginAtZero: true,
                suggestedMax: 5,
                ticks: {
                  display: true,
                  stepSize: 1,
                  maxTicksLimit: 6,
                  color: "#666",
                  backdropColor: "transparent",
                  font: {
                    size: isCompact ? 9 : 11,
                    family: "Poppins",
                  },
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.05)",
                },
                pointLabels: {
                  font: {
                    size: isCompact ? 9 : 12,
                    weight: "600",
                    family: "Poppins",
                  },
                  color: "#333",
                },
              },
            },
            plugins: {
              legend: {
                display: !isCompact,
                position: "bottom",
                labels: {
                  font: {
                    size: 12,
                    family: "Poppins",
                  },
                  color: "#444",
                  padding: 10,
                },
              },

              tooltip: {
                displayColors: false,
                callbacks: {
                  title: (context) => context[0].label,
                  label: (context) => {
                    const datasetLabel = context.dataset.label;
                    const value = context.raw;
                    const index = context.dataIndex;

                    if (value === null || value === undefined) return null;

                    if (datasetLabel === "Nilai Aktual") {
                      const thresholdDataset = context.chart.data.datasets.find(
                        (ds) => ds.label === "Rata-rata"
                      );
                      const thresholdValue =
                        thresholdDataset?.data?.[index] ?? null;

                      const status =
                        thresholdValue !== null
                          ? value > thresholdValue
                            ? "(Melampaui Rata-rata)"
                            : "(Tidak Melampaui Rata-rata)"
                          : "";

                      return `${datasetLabel}: ${value.toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })} ${status}`;
                    }

                    return `${datasetLabel}: ${value.toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`;
                  },
                },
                backgroundColor: "#fff",
                titleColor: "#111",
                bodyColor: "#111",
                borderColor: "#ccc",
                borderWidth: 1,
                padding: 10,
              },
            },
          }}
        />
      </div>

      {/* Tombol cek status di bawah chart */}
      {!isCompact && (
        <div className="radar-button-wrapper">
          <button
            className={`radar-button ${btnHover ? "hover" : ""}`}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            onClick={() => setModalOpen(true)}
          >
            <img
              src="/icons/alert.svg"
              alt="Status Parameter"
              style={{
                width: "18px",
                height: "18px",
                verticalAlign: "middle",
                marginRight: "7px",
              }}
            />
            Lihat Rangkuman Status
          </button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          className="radar-modal-overlay"
          onClick={() => setModalOpen(false)}
        >
          <div className="radar-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="radar-modal-title">
              <img
                src="/icons/alert-2.svg"
                alt="Ikon Rangkuman"
                className="modal-title-icon"
              />
              Rangkuman Status
            </h3>

            <ul className="radar-status-list">
              {parameterStatus.map((p, idx) => (
                <li key={idx} className="radar-status-item">
                  <strong className="parameter-label">{p.label}</strong>:{" "}
                  {p.status === null ? (
                    "-"
                  ) : p.status === "Melampaui" ? (
                    <span className="status-over">Melampaui Rata-rata</span>
                  ) : (
                    <span className="status-ok">Tidak Melampaui</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="radar-modal-footer">
              <button
                className={`radar-close-button ${closeBtnHover ? "hover" : ""}`}
                onMouseEnter={() => setCloseBtnHover(true)}
                onMouseLeave={() => setCloseBtnHover(false)}
                onClick={() => setModalOpen(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RadarChartComponent;
