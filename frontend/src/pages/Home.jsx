import { useEffect, useState } from "react";
import "../styles/Home.css";
import { useRef } from "react";

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in effect after mount
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className="wrapper"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0px)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        {/* Home Section */}
        <section id="home">
          <div
            className="kolom"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0px)" : "translateY(40px)",
              transition: "opacity 1s ease-out, transform 1s ease-out",
            }}
          >
            <div
              className="group-58"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0px)" : "translateY(40px)",
                transition: "opacity 1s ease-out, transform 1s ease-out",
              }}
            >
              <div
                className="DDLH"
                style={{
                  transition: "all 0.5s ease-in-out",
                  transform: isVisible ? "scale(1)" : "scale(0.95)",
                }}
              >
                DAYA DUKUNG DAN DAYA TAMPUNG LINGKUNGAN HIDUP KOTA BANDUNG
              </div>
              <div className="icon-container">
                <img
                  src="/Rectangle 2.png"
                  alt="kotak1"
                  className="background-box"
                  style={{
                    transition: "transform 0.3s ease",
                  }}
                />
                <img
                  src="/gdsate.png"
                  alt="Gedung Sate"
                  className="icon"
                  style={{
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            </div>

            <div
              className="deskripsi"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0px)" : "translateY(40px)",
                transition: "opacity 1s ease-out, transform 1s ease-out",
              }}
            >
              <p>
                Kota Bandung adalah Ibu Kota Provinsi Jawa Barat yang terletak
                di Kawasan Cekungan Bandung. Secara astronomis, Kota Bandung
                terletak pada 6°41'LU - 7°19'LS dan 107°22'BT - 108°5'BT dengan
                rata-rata ketinggian 110 Mdpl hingga 2.2429 Mdpl. Kota Bandung
                secara keseluruhan tercakup dalam Ekoregion Komplek Pegunungan
                Vulkanik Gunung Halimun - Gunung Salak - Gunung Sawal.
              </p>
            </div>

            <div
              className="group-59"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0px)" : "translateY(40px)",
                transition: "opacity 1s ease-out, transform 1s ease-out",
              }}
            >
              <div className="kotakd3tlh">
                <div className="juduld3tlh">
                  <img src="/atas.svg" alt="atas" className="atas" />
                  <h2 className="judul-text">
                    Daya Dukung dan Daya Tampung
                    <br />
                    Lingkungan Hidup
                  </h2>
                  <img src="/bawah.svg" alt="bawah" className="bawah" />
                </div>
                <div className="isid3tlh">
                  <h3 className="Dukung">
                    Daya Dukung Lingkungan Hidup adalah kemampuan lingkungan
                    hidup untuk mendukung perikehidupan manusia, makhluk hidup
                    lain, dan keseimbangan antar keduanya.
                  </h3>
                  <div className="garis-pemisah"></div>
                  <h3 className="Tampung">
                    Daya Tampung Lingkungan Hidup adalah kemampuan lingkungan
                    hidup untuk menyerap zat, energi, dan/atau komponen lain
                    yang masuk atau dimasukkan ke dalamnya.
                  </h3>
                  <img
                    src="/1.png"
                    alt="1"
                    className="gambard3tlh"
                    style={{
                      transition: "transform 0.5s ease-in-out",
                      transform: isVisible ? "scale(1)" : "scale(0.95)",
                    }}
                  />
                </div>
              </div>

              <div className="kotakije">
                <div className="judulije">
                  <img src="/atas.svg" alt="atas" className="atas2" />
                  <h2 className="judul-text2">Jasa Ekosistem</h2>
                  <img src="/bawah.svg" alt="bawah" className="bawah2" />
                </div>
                <h3 className="Pengertian">
                  {" "}
                  Jasa ekosistem atau jasa lingkungan merupakan produk yang
                  dihasilkan oleh ekosistem untuk dapat dimanfaatkan oleh
                  manusia yang berasal dari hubungan timbal balik yang dinamis
                  yang terjadi di dalam lingkungan hidup, antara tumbuhan,
                  binatang, dan jasa renik dan lingkungan non-hayati.
                </h3>
                <div className="Penyedia">
                  <div className="JudulPenyedia">
                    <span className="JudulPenyedia1">
                      Fungsi Penyediaan
                      <br />
                    </span>
                    <span className="JudulPenyedia2">(Provisioning)</span>
                  </div>
                  <h3 className="PengertianPenyedia">
                    {" "}
                    Manfaat dari ekosistem yang menyediakan produk-produknya
                    yang secara langsung dimanfaatkan oleh manusia dan makhluk
                    hidup lainnya.
                  </h3>
                </div>
                <div className="Pengatur">
                  <div className="JudulPengatur">
                    <span className="JudulPengatur1">
                      Fungsi Pengaturan
                      <br />
                    </span>
                    <span className="JudulPengatur2">(Regulating)</span>
                  </div>
                  <h3 className="PengertianPengatur">
                    {" "}
                    Manfaat dari ekosistem yang berfungsi membentuk dan
                    memelihara keseimbangannya sendiri melalui sistem pengaturan
                    dan pengendalian atas proses-proses alamnya.
                  </h3>
                </div>
                <div className="Budaya">
                  <div className="JudulBudaya">
                    <span className="JudulBudaya1">
                      Fungsi Budaya
                      <br />
                    </span>
                    <span className="JudulBudaya2">(Cultural)</span>
                  </div>
                  <h3 className="PengertianBudaya">
                    {" "}
                    Manfaat dari ekosistem yang berfungsi menyediakan manfaat
                    yang bersifat non material bagi manusia yaitu berupa manfaat
                    budaya.
                  </h3>
                </div>
                <div className="Pendukung">
                  <div className="JudulPendukung">
                    <span className="JudulPendukung1">Fungsi Pendukung</span>
                    <span className="JudulPendukung2">(Supporting)</span>
                  </div>
                  <h3 className="PengertianPendukung">
                    {" "}
                    Manfaat dari ekosistem yang berfungsi menyokong proses alam.
                  </h3>
                </div>
              </div>
            </div>

            <div
              className="group-60"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0px)" : "translateY(40px)",
                transition: "opacity 1s ease-out, transform 1s ease-out",
              }}
            >
              <div className="TentangKami">
                <div className="judultentangkami">
                  <img src="/atas.svg" alt="atas" className="atas3" />
                  <h2 className="judul-text3">Tentang Kami</h2>
                  <img src="/bawah.svg" alt="bawah" className="bawah3" />
                </div>
                <div className="isitentangkami">
                  <img src="/Si Akang.svg" alt="logoo" className="TS" />
                </div>
                <div className="isitentangkami2">
                  <span>
                    <span className="TS1">SI AKANG adalah</span>
                    <span className="TS2">platform</span>
                    <span className="TS3">
                      yang menampilkan data mengenai kondisi Daya Dukung dan
                      Daya Tampung Lingkungan Hidup di Kota Bandung. SI AKANG
                      diharapkan dapat digunakan oleh berbagai pihak dalam
                      pembuatan kebijakan dan pengambilan keputusan.
                    </span>
                  </span>
                </div>

                {/* Tim Penyusun tetap ada */}
                <div className="penyusun">
                  <h2 className="penyusun">Tim Penyusun</h2>
                  <div className="listpenyusun">
                    <div className="penyusun-columns">
                      <div className="column1">
                        <div className="penyusun-item">
                          <span className="dot" />
                          <span className="name-text">
                            Dr. Akhmad Riqqi, M.Si.
                          </span>
                        </div>
                        <div className="penyusun-item">
                          <span className="dot" />
                          <span className="name-text">
                            Dr. Budhy Soeksmantono, S.T., M.T.
                          </span>
                        </div>
                        <div className="penyusun-item">
                          <span className="dot" />
                          <span className="name-text">
                            Ir. Agustinus Bambang Setyadji, M.Si., D.Sc.
                          </span>
                        </div>
                      </div>
                      <div className="column2">
                        <div className="penyusun-item">
                          <span className="dot" />
                          <span className="name-text">
                            Farah Diba Aulia Yasmin
                          </span>
                        </div>
                        <div className="penyusun-item">
                          <span className="dot" />
                          <span className="name-text">
                            Rifqi Athallah Fajar
                          </span>
                        </div>
                        <div className="penyusun-item">
                          <span className="dot" />
                          <span className="name-text">
                            M. Ahnafudin Pramudito
                          </span>
                        </div>
                        <div className="penyusun-item">
                          <span className="dot" />
                          <span className="name-text">
                            Azkiya Tsabitul Azmi
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
