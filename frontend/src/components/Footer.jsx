import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer-custom">
      {/* Bagian Atas */}
      <div className="footer-top">
        {/* Kolom Kiri: Logo + Teks ITB + Alamat */}
        <div className="footer-left">
          {/* Logo dan Teks ITB */}
          <div className="footer-logos-itb">
            <div className="footer-logos">
              {/* Logo ITB + Teks */}
              <div className="logo-itb-group">
                <img
                  src="/itb.png"
                  alt="Logo ITB"
                  className="footer-logo-small"
                />
                <div className="footer-itb-text">
                  <h4>Institut Teknologi Bandung</h4>
                  <p>Program Studi Teknik Geodesi dan Geomatika</p>
                </div>
              </div>

              {/* Logo DLHK dan Bandung */}
              <img
                src="/dlhk.png"
                alt="Logo DLHK"
                className="footer-logo-small"
              />
              <img
                src="/bdg.png"
                alt="Logo Bandung"
                className="footer-logo-small"
              />
            </div>
          </div>

          {/* Alamat di bawah logo */}
          <div className="footer-address">
            <h4>
              <img
                src="/icons/location.svg"
                alt="Lokasi"
                style={{
                  width: "20px",
                  verticalAlign: "middle",
                  marginRight: "6px",
                }}
              />
              <strong>Alamat:</strong> Jl. Sadang Tengah No.4-6, Sekeloa,
              Kecamatan Coblong, Kota Bandung, Jawa Barat 40133
            </h4>
          </div>
        </div>

        {/* Kolom Tengah: Kontak */}
        <div className="footer-contact">
          <h4>
            <img
              src="/icons/globe.svg"
              alt="Kontak"
              style={{
                width: "17px",
                verticalAlign: "middle",
                marginRight: "6px",
              }}
            />
            Kontak Kami:
          </h4>

          <p>
            <img
              src="/icons/mail.svg"
              alt="Email"
              style={{
                width: "16px",
                verticalAlign: "middle",
                marginRight: "6px",
              }}
            />
            dlhkkota@bandung.go.id
          </p>

          <p>
            <img
              src="/icons/phone.svg"
              alt="Telepon"
              style={{
                width: "16px",
                verticalAlign: "middle",
                marginRight: "6px",
              }}
            />
            (022)-2514327
          </p>
        </div>

        {/* Kolom Kanan: Sosial Media */}
        <div className="footer-socials-wrapper">
          <h4>
            <img
              src="/icons/link.svg"
              alt="Link"
              style={{
                width: "20px",
                verticalAlign: "middle",
                marginRight: "6px",
              }}
            />
            Tetap Terhubung Dengan Kami:
          </h4>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com/bdg.dlh?igsh=ZHE3b2ZsOXk4M212"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <img src="/icons/instagram.svg" alt="Instagram" />
            </a>
            <a
              href="https://x.com/DlhKotabandung?t=Vd7GXvkZouypESbEBj419g&s=09"
              target="_blank"
              rel="noopener noreferrer"
              title="X"
            >
              <img src="/icons/x.svg" alt="X" />
            </a>
            <a
              href="https://youtube.com/@dlhkkotabandung5740?si=t6Sx85txRuui-mx2"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
            >
              <img src="/icons/youtube.svg" alt="YouTube" />
            </a>
            <a
              href="https://www.facebook.com/dlhkotabandung/"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
            >
              <img src="/icons/facebook.svg" alt="Facebook" />
            </a>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* Bagian Bawah */}
      <div className="footer-bottom">
        <div className="footer-info-center">
          <p>
            © 2025 Institut Teknologi Bandung & Dinas Lingkungan Hidup
            Kebersihan Kota Bandung. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
