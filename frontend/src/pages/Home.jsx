import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Typewriter from "typewriter-effect";
import "../styles/Home.css";

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTentangKami, setShowTentangKami] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTypewriterDDLH, setShowTypewriterDDLH] = useState(false);
  const [showTypewriterSID3TLH, setShowTypewriterSID3TLH] = useState(false);
  const [isTypewriterFinishedDDLH, setIsTypewriterFinishedDDLH] =
    useState(false);
  const [isTypewriterFinishedSID3TLH, setIsTypewriterFinishedSID3TLH] =
    useState(false);

  const imageList = ["/gdsate.png", "/bdg2.png", "/bdg3.png"];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsVisible(true);

    const ddlhTimer = setTimeout(() => {
      setShowTypewriterDDLH(true);
    }, 1000);

    const sid3tlhTimer = setTimeout(() => {
      setShowTypewriterSID3TLH(true);
    }, 2800); // sesuai waktu selesai DDLH

    return () => {
      clearTimeout(ddlhTimer);
      clearTimeout(sid3tlhTimer);
    };
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
                className="text-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="DDLH"
                  style={{
                    position: "relative",
                    transition: "all 0.5s ease-in-out",
                    transform: isVisible ? "scale(1)" : "scale(0.95)",
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  {/* Dummy tinggi */}
                  <div style={{ opacity: 0 }}>Wilujeng Sumping!</div>

                  {/* Tampilkan teks statis jika ketik sudah selesai */}
                  {isTypewriterFinishedDDLH ? (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                      }}
                    >
                      Wilujeng Sumping!
                    </div>
                  ) : (
                    showTypewriterDDLH && (
                      <div
                        className="typewriter-wrapper"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible
                            ? "translateY(0px)"
                            : "translateY(20px)",
                          transition:
                            "opacity 1s ease-out, transform 1s ease-out",
                        }}
                      >
                        <Typewriter
                          options={{
                            autoStart: true,
                            loop: false,
                            delay: 60,
                          }}
                          onInit={(typewriter) => {
                            typewriter
                              .typeString("Wilujeng Sumping!")
                              .callFunction(() => {
                                setIsTypewriterFinishedDDLH(true);
                              })
                              .start();
                          }}
                        />
                      </div>
                    )
                  )}
                </div>

                <div
                  className="SID3TLH"
                  style={{
                    position: "relative",
                    transition: "all 0.5s ease-in-out",
                    transform: isVisible ? "scale(1)" : "scale(0.95)",
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <div style={{ opacity: 0 }}>
                    Di Sistem Informasi Daya Dukung dan Daya Tampung Lingkungan
                    Hidup Kota Bandung
                  </div>

                  {isTypewriterFinishedSID3TLH ? (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                      }}
                    >
                      Di Sistem Informasi Daya Dukung dan Daya Tampung
                      Lingkungan Hidup Kota Bandung
                    </div>
                  ) : (
                    showTypewriterSID3TLH && (
                      <div
                        className="typewriter-wrapper"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible
                            ? "translateY(0px)"
                            : "translateY(20px)",
                          transition:
                            "opacity 1s ease-out, transform 1s ease-out",
                        }}
                      >
                        <Typewriter
                          options={{
                            autoStart: true,
                            loop: false,
                            delay: 20,
                          }}
                          onInit={(typewriter) => {
                            typewriter
                              .typeString(
                                "Di Sistem Informasi Daya Dukung dan Daya Tampung Lingkungan Hidup Kota Bandung"
                              )
                              .callFunction(() => {
                                setIsTypewriterFinishedSID3TLH(true);
                              })
                              .start();
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
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
                  src={imageList[currentImageIndex]}
                  alt="Gedung"
                  className="icon"
                  style={{
                    transition: "transform 0.4s ease, filter 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.filter = "brightness(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter = "brightness(1)";
                  }}
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
                Daya Dukung dan Daya Tampung Lingkungan Hidup merupakan dasar
                penting dalam pembangunan berkelanjutan. Dengan memahami
                kapasitas penyediaan sumber daya alam dan kemampuan lingkungan
                dalam menerima berbagai zat atau tekanan, pemanfaatan ruang
                dapat diarahkan secara bijak agar tidak melebihi batas kemampuan
                lingkungan. Pendekatan ini penting untuk menjaga keberlanjutan
                fungsi lingkungan hidup dan mendukung peningkatan kualitas hidup
                masyarakat.
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
                  <img
                    src="/2.png"
                    alt="2"
                    className="gambard3tlh2"
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

            {!showTentangKami && (
              <div className="tombol-container">
                <button
                  className="tombol-tentang-kami"
                  onClick={() => setShowTentangKami(true)}
                >
                  <img
                    src="/icons/icon-tentangkami.svg"
                    alt="Tentang Kami"
                    className="icon-tentangkami-svg"
                  />
                  Tentang Kami
                </button>
              </div>
            )}

            {showTentangKami && (
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
                      SI AKANG adalah platform yang menampilkan data mengenai
                      kondisi Daya Dukung dan Daya Tampung Lingkungan Hidup di
                      Kota Bandung. SI AKANG diharapkan dapat digunakan oleh
                      berbagai pihak dalam pembuatan kebijakan dan pengambilan
                      keputusan. Platform ini merupakan program kerja sama
                      antara Program Studi Teknik Geodesi dan Geomatika Institut
                      Teknologi Bandung dengan Dinas Lingkungan Hidup Kota
                      Bandung, sebagai bentuk kolaborasi dalam mendukung
                      pengelolaan lingkungan berbasis data spasial.
                    </span>
                  </div>

                  <div className="penyusun">
                    <h2 className="Timpenyusun">
                      <img
                        src="/icons/icon-penyusun.svg"
                        alt="Icon Tim Penyusun"
                        className="iconpenyusun-svg"
                      />
                      Tim Penyusun
                    </h2>

                    <div className="penyusun-top-row">
                      <div className="penyusun-item">
                        <div className="flip-card">
                          <div className="flip-card-inner">
                            <div className="flip-card-front">
                              <img src="riqqi.jpg" alt="Dr. Akhmad Riqqi" />
                              <p className="nama-penyusun">
                                Dr. Akhmad Riqqi, S.T., M.Si.
                              </p>
                            </div>
                            <div className="flip-card-back">
                              <p className="nama-penyusun">Supervisor</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="penyusun-item">
                        <div className="flip-card">
                          <div className="flip-card-inner">
                            <div className="flip-card-front">
                              <img
                                src="budhy.jpg"
                                alt="Dr. Budhy Soeksmantono"
                              />
                              <p className="nama-penyusun">
                                Dr. Budhy Soeksmantono, S.T., M.T.
                              </p>
                            </div>
                            <div className="flip-card-back">
                              <p className="nama-penyusun">Supervisor</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="penyusun-item">
                        <div className="flip-card">
                          <div className="flip-card-inner">
                            <div className="flip-card-front">
                              <img
                                src="agustinus.jpg"
                                alt="Ir. Agustinus Bambang"
                              />
                              <p className="nama-penyusun">
                                Ir. Agustinus Bambang Setyadji, M.Si., D.Sc.
                              </p>
                            </div>
                            <div className="flip-card-back">
                              <p className="nama-penyusun">Supervisor</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="penyusun-bottom-row">
                      <div className="penyusun-item">
                        <div className="flip-card">
                          <div className="flip-card-inner">
                            <div className="flip-card-front">
                              <img
                                src="farah.jpg"
                                alt="Farah Diba Aulia Yasmin"
                              />
                              <p className="nama-penyusun">
                                Farah Diba Aulia Yasmin
                              </p>
                            </div>
                            <div className="flip-card-back">
                              <p className="nama-penyusun">Pengembang</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="penyusun-item">
                        <div className="flip-card">
                          <div className="flip-card-inner">
                            <div className="flip-card-front">
                              <img src="rifqi.jpg" alt="Rifqi Athallah Fajar" />
                              <p className="nama-penyusun">
                                Rifqi Athallah Fajar
                              </p>
                            </div>
                            <div className="flip-card-back">
                              <p className="nama-penyusun">Pengembang</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="penyusun-item">
                        <div className="flip-card">
                          <div className="flip-card-inner">
                            <div className="flip-card-front">
                              <img
                                src="ahnaf.jpg"
                                alt="M. Ahnafudin Pramudito"
                              />
                              <p className="nama-penyusun">
                                M. Ahnafudin Pramudito
                              </p>
                            </div>
                            <div className="flip-card-back">
                              <p className="nama-penyusun">Pengembang</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="penyusun-item">
                        <div className="flip-card">
                          <div className="flip-card-inner">
                            <div className="flip-card-front">
                              <img
                                src="azkiya.jpg"
                                alt="Azkiya Tsabitul Azmi"
                              />
                              <p className="nama-penyusun">
                                Azkiya Tsabitul Azmi
                              </p>
                            </div>
                            <div className="flip-card-back">
                              <p className="nama-penyusun">Pengembang</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowTentangKami(false)}
                    className="tombol-tutup-tentang-kami"
                  >
                    X
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
