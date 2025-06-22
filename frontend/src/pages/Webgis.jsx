import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  LayersControl,
} from "react-leaflet";
import axios from "axios";
import RadarChartComponent from "../components/RadarChartComponent.jsx";
import LineChartComponent from "../components/LineChartComponent.jsx";
import BarChartComponent from "../components/BarChartComponent";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "../styles/Webgis.css";
import "../styles/Navbar.css";
import "../styles/Footer.css";

const parameterGroups = {
  "Daya Dukung Pangan dan Air": [
    { label: "Pangan", field: "ddlhpang_1", thresholdField: "rataddlhpa" },
    { label: "Air", field: "ddlhair", thresholdField: "rataddlhai" },
    {
      label: "Populasi Penduduk",
      field: "penduduk21",
      thresholdField: "ratapend21",
    },
  ],
  "Efisiensi Sumber Daya Alam": [
    {
      label: "Pangan",
      field: "efpangan",
    },
    { label: "Air", field: "efair" },
    {
      label: "Tata Air",
      field: "efttair",
    },
  ],
  "Indeks Jasa Ekosistem": [
    { label: "Pangan", field: "ije_pangan", thresholdField: "rataijepan" },
    { label: "Air", field: "ije_air", thresholdField: "rataijeair" },
    { label: "Serat", field: "ije_serat", thresholdField: "rataijeser" },
    {
      label: "Genetik",
      field: "ije_sdgen",
      thresholdField: "rataijesdg",
    },
    { label: "Udara", field: "ije_udara", thresholdField: "rataijeuda" },
    { label: "Iklim", field: "ije_iklim", thresholdField: "rataijeikl" },
    { label: "Mitigasi", field: "ije_mitiga", thresholdField: "rataijemit" },
    { label: "Tata Air", field: "ije_tataai", thresholdField: "rataijetat" },
    { label: "Murni", field: "ije_murni", thresholdField: "rataijemur" },
    { label: "Serbuk", field: "ije_serbuk", thresholdField: "rataijes_1" },
    { label: "Hama", field: "ije_hama", thresholdField: "rataijeham" },
    { label: "Kehati", field: "ije_kehati", thresholdField: "rataijekeh" },
    { label: "Tanah", field: "ije_tanah", thresholdField: "rataijetan" },
    { label: "Primer", field: "ije_primer", thresholdField: "rataijepri" },
    { label: "Hara", field: "ije_hara", thresholdField: "rataijehar" },
  ],
  "Indeks Kerentanan Bencana": [
    { label: "Kekeringan", field: "ik", thresholdField: "rataik" },
    { label: "Banjir", field: "ikb", thresholdField: "rataikb" },
    { label: "Cuaca Ekstrem", field: "ikc", thresholdField: "rataikc" },
    { label: "Longsor", field: "ikl", thresholdField: "rataikl" },
    { label: "Kebakaran Lahan", field: "ikk", thresholdField: "rataikk" },
    {
      label: "Populasi Penduduk",
      field: "nor_pend21",
      thresholdField: "ratanpen21",
    },
  ],

  "Potensi Beban Pencemar (PBP) dan Timbulan": [
    {
      label: "Biochemical Oxygen",
      field: "norbod21",
      thresholdField: "ratanbod21",
    },
    {
      label: "Chemical Oxygen",
      field: "norcod21",
      thresholdField: "ratancod21",
    },
    {
      label: "Suspended Solid",
      field: "nortss21",
      thresholdField: "ratantss21",
    },
    {
      label: "Timbulan Sampah",
      field: "norsamp21",
      thresholdField: "ratansam21",
    },
    {
      label: "Timbulan Tinja",
      field: "nortinja21",
      thresholdField: "ratantin21",
    },
    {
      label: "Populasi Penduduk",
      field: "nor_pend21",
      thresholdField: "ratanpen21",
    },
  ],
  "Proyeksi PBP Biochemical Oxygen Demand": [
    { label: "Biochemical Oxygen 2021", field: "bod21" },
    { label: "Biochemical Oxygen 2030", field: "bod30" },
    { label: "Biochemical Oxygen 2040", field: "bod40" },
    { label: "Biochemical Oxygen 2050", field: "bod50" },
  ],
  "Proyeksi PBP Chemical Oxygen Demand": [
    { label: "Chemical Oxygen 2021", field: "cod21" },
    { label: "Chemical Oxygen 2030", field: "cod30" },
    { label: "Chemical Oxygen 2040", field: "cod40" },
    { label: "Chemical Oxygen 2050", field: "cod50" },
  ],
  "Proyeksi Timbulan Sampah": [
    { label: "Timbulan Sampah 2021", field: "sampah21" },
    { label: "Timbulan Sampah 2030", field: "sampah30" },
    { label: "Timbulan Sampah 2040", field: "sampah40" },
    { label: "Timbulan Sampah 2050", field: "sampah50" },
  ],
  "Proyeksi Timbulan Tinja": [
    { label: "Timbulan Tinja 2021", field: "tinja21" },
    { label: "Timbulan Tinja 2030", field: "tinja30" },
    { label: "Timbulan Tinja 2040", field: "tinja40" },
    { label: "Timbulan Tinja 2050", field: "tinja50" },
  ],
  "Proyeksi PBP Total Suspended Solid": [
    { label: "Suspended Solid 2021", field: "tss21" },
    { label: "Suspended Solid 2030", field: "tss30" },
    { label: "Suspended Solid 2040", field: "tss40" },
    { label: "Suspended Solid 2050", field: "tss50" },
  ],
  "Proyeksi Penduduk": [
    { label: "Penduduk 2021", field: "penduduk21" },
    { label: "Penduduk 2030", field: "penduduk30" },
    { label: "Penduduk 2040", field: "penduduk40" },
    { label: "Penduduk 2050", field: "penduduk50" },
  ],
};

const metadataFileMap = {
  "Daya Dukung Pangan dan Air": "DDLHPangandanAirKotaBandung.xml",
  "Efisiensi Sumber Daya Alam": "EfisiensiSumberDayaKotaBandung.xml",
  "Indeks Jasa Ekosistem": "IndeksJasaEkosistemKotaBandung.xml",
  "Indeks Kerentanan Bencana": "IndeksKerentananBencanaKotaBandung.xml",
  "Potensi Beban Pencemar (PBP) dan Timbulan":
    "PotensiBebanPencemarTimbulanKotaBandung.xml",
  "Proyeksi Timbulan Tinja":
    "ProyeksiBebanPencemarTimbulanTinjaKotaBandung.xml",
  "Proyeksi Timbulan Sampah":
    "ProyeksiBebanPencemarTimbulanSampahKotaBandung.xml",
  "Proyeksi PBP Biochemical Oxygen Demand":
    "ProyeksiBebanPencemarBiologicalOxygenDemandKotaBandung.xml",
  "Proyeksi PBP Chemical Oxygen Demand":
    "ProyeksiBebanPencemarTimbulanChemicalOxygenDemandKotaBandung.xml",
  "Proyeksi PBP Total Suspended Solid":
    "ProyeksiBebanPencemarTotalSuspendedKotaBandung.xml",
  "Proyeksi Penduduk": "ProyeksiPendudukKotaBandung.xml",
  "Jaringan Air Minum": "JaringanAirMinumKotaBandung.xml",
  "Jaringan Drainase": "JaringanDrainaseKotaBandung.xml",
  "Jaringan Limbah": "JaringanLimbahKotaBandung.xml",
};

const SearchControl = () => {
  const map = useMap();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: {
        countrycodes: "id",
        addressdetails: 1,
      },
    });

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      autoClose: true,
      showMarker: true,
      keepResult: true,
      searchLabel: "Cari Lokasi...",
      searchDelay: 300,
      notFoundMessage: "Lokasi tidak ditemukan",
      marker: {
        icon: new L.Icon.Default(),
        draggable: false,
      },
      animateZoom: true,
    });

    map.addControl(searchControl);
    const handleShowLocation = (result) => {
      const { x, y } = result.location;
      if (typeof x === "number" && typeof y === "number") {
        map.flyTo([y, x], 16);
      } else {
        console.error("Koordinat tidak valid:", result.location);
      }
      setLoading(false);
    };

    const handleStartSearch = () => {
      setLoading(true);
    };

    map.on("geosearch/showlocation", handleShowLocation);
    map.on("geosearch/startsearch", handleStartSearch);

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation", handleShowLocation);
      map.off("geosearch/startsearch", handleStartSearch);
    };
  }, [map]);

  return (
    <>
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
};

const MapWithChart = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState({
    aktual: {},
    rata_rata: {},
  });
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(
    Object.keys(parameterGroups)[0]
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarRef = useRef(null);

  const [showHelp, setShowHelp] = useState(false);
  const [activeTab, setActiveTab] = useState("panduan");

  const selectedLayerRef = useRef(null); // Ganti dari useState ke useRef

  const isProjectionGroup = (group) => group.includes("Proyeksi");

  const [isMetadataModalOpen, setMetadataModalOpen] = useState(false);
  const [selectedMetadataCategory, setSelectedMetadataCategory] = useState("");

  const [airMinumData, setAirMinumData] = useState(null);
  const [limbahData, setLimbahData] = useState(null);
  const [drainaseData, setDrainaseData] = useState(null);

  const [showAirMinum, setShowAirMinum] = useState(false);
  const [showLimbah, setShowLimbah] = useState(false);
  const [showDrainase, setShowDrainase] = useState(false);
  const [showWilayah, setShowWilayah] = useState(true);

  useEffect(() => {
    const fetchLayer = async (path, setter) => {
      try {
        const res = await fetch(path);
        const data = await res.json();
        setter(data);
      } catch (error) {
        console.error(`Gagal memuat ${path}`, error);
      }
    };

    fetchLayer("/data/Jaringanairminum.geojson", setAirMinumData);
    fetchLayer("/data/Jaringanlimbah.geojson", setLimbahData);
    fetchLayer("/data/Jaringandrainase.geojson", setDrainaseData);
  }, []);

  useEffect(() => {
    const fetchGeoJson = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:8080/geoserver/d3tlh_ws/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=d3tlh_ws:d3tlh_layer&outputFormat=application/json"
        );
        if (res.data?.type === "FeatureCollection") {
          setGeoJsonData(res.data);
        }
      } catch (err) {
        console.error("Error fetching GeoServer data:", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };
    fetchGeoJson();
  }, []);

  const fetchAtributById = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/data_wilayah/${id}`
      );
      setSelectedData(res.data || { aktual: {}, rata_rata: {} });
    } catch (err) {
      console.error("Error fetching atribut data:", err);
    }
  };

  const onEachFeature = (feature, layer) => {
    const id = feature?.properties?.id_1;
    if (!id) return;

    const tooltipContent = `
    <span style="font-family: 'Poppins', sans-serif;">
      <strong>Daerah:</strong> ${feature.properties.wadmkc}, ${feature.properties.wadmkd}<br>
      <strong>Pola Ruang:</strong> ${feature.properties.namobj}
    </span>
  `;

    layer.setStyle({
      color: "#28a745",
      weight: 0.2,
      fillColor: "transparent",
      fillOpacity: 0.2,
    });

    layer.bindTooltip(tooltipContent, { permanent: false, direction: "auto" });

    layer.on("mouseover", () => {
      if (selectedFeatureId !== id) {
        layer.setStyle({
          color: "#28a745",
          weight: 0.2,
          fillColor: "#28a745",
          fillOpacity: 0.2,
        });
      }
    });

    layer.on("mouseout", () => {
      if (selectedFeatureId !== id) {
        layer.setStyle({
          color: "#28a745",
          weight: 0.2,
          fillColor: "transparent",
          fillOpacity: 0.2,
        });
      }
    });

    layer.on("click", () => {
      setSelectedFeatureId(id);
      fetchAtributById(id);
    });
  };

  const onEachJaringanFeature = (feature, layer) => {
    if (feature.properties && feature.properties.NAMOBJ) {
      const tooltipContent = `
        <span style="font-family: 'Poppins', sans-serif;">
          <strong>Jenis:</strong> ${feature.properties.NAMOBJ}
        </span>
      `;
      layer.bindTooltip(tooltipContent, {
        permanent: false,
        direction: "top",
        offset: [0, -8],
        sticky: true,
      });
    }

    layer.on("mouseover", () => {
      layer.setStyle({ weight: 1.5 });
    });

    layer.on("mouseout", () => {
      layer.setStyle({ weight: 1.5 });
    });
  };

  const handleDownloadMetadata = (selectedGroup) => {
    const filename = metadataFileMap[selectedGroup];

    if (!filename) {
      alert("File metadata tidak ditemukan untuk kategori ini.");
      return;
    }

    const filePath = `/metadata/${filename}`;
    const link = document.createElement("a");
    link.href = filePath;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ position: "relative", flex: 1, height: "100%" }}>
          {loading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1500,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              <div
                style={{
                  height: 50,
                  width: 50,
                  border: "6px solid #28a745",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 2s linear infinite",
                  marginBottom: 12,
                }}
              />
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 16,
                  color: "#28a745",
                  fontWeight: "600",
                }}
              >
                Sedang memuat data...
              </div>
            </div>
          )}

          <MapContainer
            center={[-6.9075, 107.6391]}
            zoom={12.5}
            style={{ flex: 1, height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap"
            />
            <SearchControl />

            <div
              className="checkbox-container"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 1000,
                background: "white",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              }}
            >
              <label>
                <input
                  type="checkbox"
                  checked={showAirMinum}
                  onChange={() => setShowAirMinum(!showAirMinum)}
                />{" "}
                Jaringan Air Minum
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  checked={showDrainase}
                  onChange={() => setShowDrainase(!showDrainase)}
                />{" "}
                Jaringan Drainase
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  checked={showLimbah}
                  onChange={() => setShowLimbah(!showLimbah)}
                />{" "}
                Jaringan Limbah
              </label>
            </div>

            {showAirMinum && airMinumData && (
              <GeoJSON
                data={airMinumData}
                style={(feature) => {
                  const jenis = feature.properties?.NAMOBJ;
                  switch (jenis) {
                    case "Jaringan Distribusi Pembagi":
                      return { color: "#005ce6", weight: 1.5 };
                    case "Jaringan Transmisi Air Baku":
                      return { color: "#004da8", weight: 1.5 };
                    case "Jaringan Transmisi Air Minum":
                      return { color: "#00a9e6", weight: 1.5 };
                    default:
                      return { color: "#888", weight: 1 };
                  }
                }}
                onEachFeature={onEachJaringanFeature}
              />
            )}

            {showLimbah && limbahData && (
              <GeoJSON
                data={limbahData}
                style={(feature) => {
                  const jenis = feature.properties?.NAMOBJ;
                  switch (jenis) {
                    case "Pipa Induk":
                      return { color: "#824600", weight: 1.5 };
                    default:
                      return { color: "#888", weight: 1 };
                  }
                }}
                onEachFeature={onEachJaringanFeature}
              />
            )}

            {showDrainase && drainaseData && (
              <GeoJSON
                data={drainaseData}
                style={(feature) => {
                  const jenis = feature.properties?.NAMOBJ;
                  switch (jenis) {
                    case "Jaringan Drainase Primer":
                      return { color: "#004ca8", weight: 1.5 };
                    case "Jaringan Drainase Sekunder":
                      return { color: "#ff0000", weight: 1.5 };
                    default:
                      return { color: "#888", weight: 1 };
                  }
                }}
                onEachFeature={onEachJaringanFeature}
              />
            )}

            {geoJsonData && (
              <GeoJSON
                data={geoJsonData}
                onEachFeature={onEachFeature}
                style={(feature) => {
                  const isSelected =
                    selectedFeatureId === feature.properties.id_1;
                  return {
                    color: isSelected ? "#ff6e00" : "#28a745",
                    weight: 0.1,
                    fillColor: isSelected ? "#ff6e00" : "transparent",
                    fillOpacity: isSelected ? 0.5 : 0.1,
                  };
                }}
              />
            )}

            <div className="custom-layers-control">
              <LayersControl position="topright">
                <LayersControl.Overlay
                  checked={showAirMinum}
                  name="Jaringan Air Minum"
                >
                  {airMinumData && (
                    <GeoJSON
                      data={airMinumData}
                      style={{ color: "#383bff", weight: 1 }}
                      onEachFeature={onEachJaringanFeature}
                    />
                  )}
                </LayersControl.Overlay>

                <LayersControl.Overlay
                  checked={showDrainase}
                  name="Jaringan Drainase"
                >
                  {drainaseData && (
                    <GeoJSON
                      data={drainaseData}
                      style={{ color: "#389fff", weight: 1 }}
                      onEachFeature={onEachJaringanFeature}
                    />
                  )}
                </LayersControl.Overlay>

                <LayersControl.Overlay
                  checked={showLimbah}
                  name="Jaringan Limbah"
                >
                  {limbahData && (
                    <GeoJSON
                      data={limbahData}
                      style={{ color: "#ff383a", weight: 1 }}
                      onEachFeature={onEachJaringanFeature}
                    />
                  )}
                </LayersControl.Overlay>

                <LayersControl.Overlay
                  checked={true}
                  name="Indikator Lingkungan"
                >
                  {geoJsonData && (
                    <GeoJSON data={geoJsonData} onEachFeature={onEachFeature} />
                  )}
                </LayersControl.Overlay>
              </LayersControl>
            </div>
          </MapContainer>

          <style>
            {`
    @keyframes spin {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
    }
  `}
          </style>
        </div>
        <div className={`sidebar-container ${sidebarOpen ? "open" : "closed"}`}>
          <h2
            className="sidebar-title"
            style={{
              fontWeight: 700,
              fontSize: "22px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src="/icons/search.svg"
              alt="Indikator"
              style={{ width: "30px", height: "30px" }}
            />
            Indikator Lingkungan
          </h2>
          <select
            className="dropdown-select"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "400px",
              marginBottom: "20px",
            }}
          >
            {Object.keys(parameterGroups).map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {selectedFeatureId ? (
            <div
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "500px",
                background: "#f9f9f9",
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {[
                "Efisiensi Sumber Daya Alam",
                "Daya Dukung Pangan dan Air",
              ].includes(selectedGroup) ? (
                <BarChartComponent
                  group={selectedGroup}
                  parameters={parameterGroups[selectedGroup]}
                  dataSource={selectedData}
                  showThreshold={selectedGroup === "Daya Dukung Pangan dan Air"}
                />
              ) : isProjectionGroup(selectedGroup) &&
                [
                  "Proyeksi Timbulan Sampah",
                  "Proyeksi Timbulan Tinja",
                  "Proyeksi PBP Biochemical Oxygen Demand",
                  "Proyeksi PBP Chemical Oxygen Demand",
                  "Proyeksi PBP Total Suspended Solid",
                  "Proyeksi Penduduk",
                ].includes(selectedGroup) ? (
                <LineChartComponent
                  parameters={parameterGroups[selectedGroup]}
                  dataSource={selectedData}
                />
              ) : (
                <RadarChartComponent
                  parameters={parameterGroups[selectedGroup]}
                  dataSource={selectedData}
                  selectedGroup={selectedGroup}
                />
              )}
            </div>
          ) : (
            <p
              style={{
                textAlign: "center",
                marginTop: "250px",
                color: "#777",
              }}
            >
              Klik wilayah pada peta untuk menampilkan chart!
            </p>
          )}
          <div className="download-container">
            <button
              onClick={() => setMetadataModalOpen(true)}
              className="download-button"
            >
              <img
                src="/icons/download.svg"
                alt="Download"
                className="download-icon"
              />
              Download Metadata
            </button>
          </div>
          {isMetadataModalOpen && (
            <div className="metadata-download-overlay">
              <div className="metadata-download-modal">
                <h2 className="metadata-download-title">
                  <img
                    src="/icons/metadata-icon.svg"
                    alt="Metadata Icon"
                    className="metadata-download-icon"
                  />
                  Pilih Kategori
                </h2>

                <select
                  className="metadata-download-select"
                  value={selectedMetadataCategory}
                  onChange={(e) => setSelectedMetadataCategory(e.target.value)}
                >
                  <option value="">-- Pilih --</option>
                  {Object.keys(metadataFileMap).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>

                <div className="metadata-download-buttons">
                  <button
                    className="metadata-download-button"
                    disabled={!selectedMetadataCategory}
                    onClick={() => {
                      handleDownloadMetadata(selectedMetadataCategory);
                      setMetadataModalOpen(false);
                      setSelectedMetadataCategory("");
                    }}
                  >
                    Unduh
                  </button>
                  <button
                    className="metadata-download-cancel"
                    onClick={() => setMetadataModalOpen(false)}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}
          <button onClick={() => setShowHelp(true)} className="help-button">
            <img src="/icons/help.svg" alt="Keterangan" className="help-icon" />
            Keterangan
          </button>
        </div>
      </div>

      {showHelp && (
        <div className="help-modal-overlay" onClick={() => setShowHelp(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "28px",
              borderRadius: "20px",
              maxWidth: "640px",
              width: "90%",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              textAlign: "left",
              position: "relative",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <button
              onClick={() => setShowHelp(false)}
              className="modal-close-button"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#666",
              }}
              title="Tutup"
            ></button>

            <h3
              style={{
                marginBottom: "16px",
                fontWeight: "600",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img
                src="/icons/information.svg"
                alt="icon"
                style={{ width: "20px", height: "20px" }}
              />
              Keterangan
            </h3>

            <div
              style={{
                display: "flex",
                borderBottom: "2px solid #e0e0e0",
                marginBottom: "20px",
              }}
            >
              {[
                { id: "panduan", label: "Panduan" },
                { id: "sumber", label: "Sumber Data" },
                { id: "definisi", label: "Definisi Indikator" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background: "none",
                    border: "none",
                    borderBottom:
                      activeTab === tab.id
                        ? "4px solid #4e944f"
                        : "4px solid transparent",
                    color: activeTab === tab.id ? "#4e944f" : "#555",
                    fontWeight: activeTab === tab.id ? "600" : "500",
                    fontSize: "15px",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="panduan-list-wrapper">
              {activeTab === "panduan" && (
                <ul className="panduan-list">
                  <li>
                    Klik wilayah pada area peta atau cari lokasi untuk mencari
                    wilayah yang diinginkan
                  </li>
                  <li>
                    Pilih layer jaringan air minum, jaringan drainase, atau
                    jaringan limbah apabila ingin melihat visualisasi jaringan
                  </li>
                  <li>Pilih grup parameter pada menu indikator lingkungan</li>
                  <li>Grafik data D3TLH akan muncul setelah wilayah di klik</li>
                  <li>
                    Arahkan kursor pada grafik untuk melihat angka numerik dari
                    nilai aktual dan nilai rata-rata
                  </li>
                  <li>
                    Untuk melihat rangkuman status data, dapat melakukan klik
                    pada menu "Lihat Rangkuman Status"
                  </li>
                  <li>
                    Untuk melakukan pengunduhan metadata, dapat melalui menu
                    "Download Metadata"
                  </li>
                </ul>
              )}

              {activeTab === "sumber" && (
                <ul className="sumber-list">
                  <li>
                    <strong>Kerentanan Bencana :</strong> InaRisk 2021 - Badan
                    Nasional Penanggulangan Bencana (BNPB)
                  </li>
                  <li>
                    <strong>Efisiensi Sumber Daya Alam :</strong> Kajian
                    Lingkungan Hidup Strategis (KLHS) RTRW Kota Bandung
                    2022-2042 - Badan Perencanaan Pembangunan Nasional
                    (Bappenas)
                  </li>
                  <li>
                    <strong>Potensi Beban Pencemar dan Timbulan :</strong>{" "}
                    Kajian Lingkungan Hidup Strategis (KLHS) RTRW Kota Bandung
                    2022-2042 - Badan Perencanaan Pembangunan Nasional
                    (Bappenas)
                  </li>
                  <li>
                    <strong>Indeks Jasa Ekosistem :</strong> Kajian Lingkungan
                    Hidup Strategis (KLHS) RTRW Kota Bandung 2022-2042 - Badan
                    Perencanaan Pembangunan Nasional (Bappenas)
                  </li>
                  <li>
                    <strong>Jumlah Penduduk :</strong> Kajian Lingkungan Hidup
                    Strategis (KLHS) RTRW Kota Bandung 2022-2042 - Badan
                    Perencanaan Pembangunan Nasional (Bappenas)
                  </li>
                  <li>
                    <strong>
                      Data Jaringan (Air Minum, Drainase, dan Limbah) :
                    </strong>{" "}
                    Dinas Lingkungan Hidup dan Kebersihan (DLHK) Kota Bandung
                  </li>
                  <li>
                    <strong>Pola Ruang :</strong> Kementerian Agraria dan Tata
                    Ruang/Badan Pertanahan Nasional (ATR/BPN)
                  </li>
                </ul>
              )}

              {activeTab === "definisi" && (
                <div className="definisi-list">
                  <p>
                    <strong>Data Proyeksi :</strong> Estimasi jumlah nilai dari
                    suatu indikator yang akan dihasilkan di masa depan. Proyeksi
                    ini dibuat dalam interval waktu 10 tahun
                  </p>
                  <p>
                    <strong>DDLH Air :</strong> Batas maksimum jumlah penduduk
                    pada suatu wilayah yang dapat terpenuhi kebutuhan terhadap
                    air
                  </p>
                  <p>
                    <strong>DDLH Pangan :</strong> Representasi jumlah penduduk
                    yang dapat terpenuhi kebutuhan pangan berdasarkan
                    ketersediaan pangannya di suatu wilayah
                  </p>
                  <p>
                    <strong>Efisiensi Sumber Daya Alam :</strong> Seberapa
                    optimal potensi sumber daya alam telah dimanfaatkan.
                    Kekayaan alam ini dapat berwujud seperti tanah, air,
                    tumbuhan, segala benda yang dapat diolah kembali oleh
                    manusia
                  </p>
                  <p>
                    <strong>Indeks Jasa Ekosistem :</strong> Kemampuan
                    lingkungan yang dihasilkan oleh ekosistem dalam menyediakan
                    manfaat ekologis
                  </p>
                  <p>
                    <strong>Jumlah Penduduk :</strong> Jumlah penduduk pada
                    suatu wilayah
                  </p>
                  <p>
                    <strong>Kerentanan Bencana :</strong> Suatu kondisi dari
                    suatu komunitas atau masyarakat yang mengarah atau
                    menyebabkan ketidakmampuan dalam menghadapi bencana.
                    Kerentanan disusun berdasarkan parameter sosial budaya,
                    ekonomi, fisik, dan lingkungan
                  </p>
                  <p>
                    <strong>Potensi Beban Pencemar </strong> Estimasi jumlah zat
                    pencemar yang berpotensi masuk ke badan air dari berbagai
                    sumber, zat pencemar ini berisiko menurunkan kualitas air
                    dan berdampak terhadap keberlanjutan fungsi ekosistem
                  </p>
                  <p>
                    <strong>Timbulan Lumpur Tinja :</strong> Representasi volume
                    lumpur tinja yang dihasilkan dari sistem sanitasi
                  </p>
                  <p>
                    <strong>Timbulan Sampah :</strong> Jumlah sampah yang
                    dihasilkan oleh penduduk pada suatu poligon
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowHelp(false)}
              style={{
                marginTop: "24px",
                backgroundColor: "#4e944f",
                color: "#fff",
                padding: "10px 16px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapWithChart;
