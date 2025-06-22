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

  const [fontSize, setFontSize] = useState(12);

  useEffect(() => {
    const updateFontSize = () => {
      const width = window.innerWidth;
      if (width <= 320) {
        setFontSize(5);
      } else if (width <= 376) {
        setFontSize(6);
      } else if (width <= 426) {
        setFontSize(6);
      } else if (width <= 476) {
        setFontSize(7);
      } else if (width <= 500) {
        setFontSize(7);
      } else if (width <= 550) {
        setFontSize(9);
      } else {
        setFontSize(12);
      }
    };

    updateFontSize(); // panggil pertama kali
    window.addEventListener("resize", updateFontSize);
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  const labels = parameters.map((p) => p.label);
  const dataActual = parameters.map(
    (p) => Number(dataSource?.aktual?.[p.field]) || 0
  );
  const dataThreshold = parameters.map(
    (p) => Number(dataSource?.rata_rata?.[p.thresholdField]) || 0
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

  const parameterStatus = parameters.map((p) => {
    const actual = Number(dataSource?.aktual?.[p.field]) || 0;
    const threshold = Number(dataSource?.rata_rata?.[p.thresholdField]) || 0;

    const status = actual > threshold ? "Melampaui" : "Tidak Melampaui";

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
      <div
        className="radar-chart-wrapper"
        style={{ height: isCompact ? "400px" : "800px" }}
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
                    size: fontSize,
                    family: "Poppins",
                  },
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.05)",
                },
                pointLabels: {
                  font: {
                    size: fontSize,
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
                    size: fontSize,
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

            {/* Keterangan rata-rata */}
            <p className="modal-note">
              <strong>Keterangan:</strong> Rata-rata adalah nilai rata-rata
              indikator lingkungan di Kota Bandung.
            </p>

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
