import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pg from "pg";

//Cek Environment Variables
const requiredEnvVars = [
  "DB_USER",
  "DB_HOST",
  "DB_NAME",
  "DB_PASSWORD",
  "DB_PORT",
  "PORT",
];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ Error: Environment variable ${envVar} tidak ditemukan!`);
    process.exit(1);
  }
});

//Konfigurasi PostgreSQL
const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
});

//Cek Koneksi ke Database
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Koneksi ke database berhasil!");
  } catch (error) {
    console.error("❌ Gagal terhubung ke database:", error.message);
    process.exit(1);
  }
})();

//Setup Express
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

//Route Utama
app.get("/", (req, res) => {
  res.send("✅ Backend WebGIS berjalan dengan baik!");
});

//Endpoint untuk mendapatkan data wilayah berdasarkan ID
app.get("/api/data_wilayah/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT namobj, wadmkc, wadmkd, ije_pangan, ije_air, ije_serat, ije_sdgen, ije_udara, ije_iklim, ije_mitiga, ije_tataai, ije_murni, ije_serbuk, ije_hama, ije_kehati, ije_tanah, ije_primer, ije_hara, ik, ikb, ikc, ikl, ikk, efpangan, efair, efttair, penduduk21, nor_pend21, penduduk30, penduduk40, penduduk50, bod21, cod21, tss21, bod30, cod30, tss30, bod40, cod40, tss40, bod50, cod50, tss50, norbod21, norcod21, nortss21, ddlhpang_1, ddlhair, sampah21, sampah30, sampah40, sampah50, norsamp21, nortinja21, tinja21, tinja30, tinja40, tinja50, 
      rataijepan, rataijeair, rataijeser, rataijesdg, rataijeuda, rataijeikl, rataijemit, rataijetat, rataijemur, rataijes_1, rataijeham, rataijekeh, rataijetan, rataijepri, rataijehar, rataik, rataikb, rataikc, rataikl, rataikk, ratapend21, ratanpen21, ratanbod21,  ratancod21, ratantss21, rataddlhpa, rataddlhai, ratansam21, ratantin21
      FROM d3tlh_table
      WHERE id_1 = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Data tidak ditemukan" });
    }

    const row = result.rows[0];

    res.json({
      aktual: {
        ije_pangan: row.ije_pangan,
        ije_air: row.ije_air,
        ije_serat: row.ije_serat,
        ije_sdgen: row.ije_sdgen,
        ije_udara: row.ije_udara,
        ije_iklim: row.ije_iklim,
        ije_mitiga: row.ije_mitiga,
        ije_tataai: row.ije_tataai,
        ije_murni: row.ije_murni,
        ije_serbuk: row.ije_serbuk,
        ije_hama: row.ije_hama,
        ije_kehati: row.ije_kehati,
        ije_tanah: row.ije_tanah,
        ije_primer: row.ije_primer,
        ije_hara: row.ije_hara,
        ik: row.ik,
        ikb: row.ikb,
        ikc: row.ikc,
        ikl: row.ikl,
        ikk: row.ikk,
        efpangan: row.efpangan,
        efair: row.efair,
        efttair: row.efttair,
        penduduk21: row.penduduk21,
        nor_pend21: row.nor_pend21,
        penduduk30: row.penduduk30,
        penduduk40: row.penduduk40,
        penduduk50: row.penduduk50,
        bod21: row.bod21,
        cod21: row.cod21,
        tss21: row.tss21,
        bod30: row.bod30,
        cod30: row.cod30,
        tss30: row.tss30,
        bod40: row.bod40,
        cod40: row.cod40,
        tss40: row.tss40,
        bod50: row.bod50,
        cod50: row.cod50,
        tss50: row.tss50,
        norbod21: row.norbod21,
        norcod21: row.norcod21,
        nortss21: row.nortss21,
        ddlhpang_1: row.ddlhpang_1,
        ddlhair: row.ddlhair,
        sampah21: row.sampah21,
        sampah30: row.sampah30,
        sampah40: row.sampah40,
        sampah50: row.sampah50,
        norsamp21: row.norsamp21,
        tinja21: row.tinja21,
        tinja30: row.tinja30,
        tinja40: row.tinja40,
        tinja50: row.tinja50,
        nortinja21: row.nortinja21,
      },
      rata_rata: {
        rataijepan: row.rataijepan,
        rataijeair: row.rataijeair,
        rataijeser: row.rataijeser,
        rataijesdg: row.rataijesdg,
        rataijeuda: row.rataijeuda,
        rataijeikl: row.rataijeikl,
        rataijemit: row.rataijemit,
        rataijetat: row.rataijetat,
        rataijemur: row.rataijemur,
        rataijes_1: row.rataijes_1,
        rataijeham: row.rataijeham,
        rataijekeh: row.rataijekeh,
        rataijetan: row.rataijetan,
        rataijepri: row.rataijepri,
        rataijehar: row.rataijehar,
        rataik: row.rataik,
        rataikb: row.rataikb,
        rataikc: row.rataikc,
        rataikl: row.rataikl,
        rataikk: row.rataikk,
        ratapend21: row.ratapend21,
        ratanpen21: row.ratanpen21,
        ratanbod21: row.ratanbod21,
        ratancod21: row.ratancod21,
        ratantss21: row.ratantss21,
        ratansam21: row.ratansam21,
        ratantin21: row.ratantin21,
        rataddlhpa: row.rataddlhpa,
        rataddlhai: row.rataddlhai,
      },
    });
  } catch (error) {
    console.error("❌ Error mengambil data wilayah:", error);
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

//Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
