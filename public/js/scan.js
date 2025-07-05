// Script for scanning QR codes

document.addEventListener("DOMContentLoaded", function () {
  const scanBox = document.getElementById("scan-box");
  const scanContent = document.getElementById("scan-content");
  const qrError = document.getElementById("qr-error");

  function loadInitialLayout() {
    scanContent.innerHTML = `
      <i class="bi bi-qr-code-scan"></i>
      <p class="mb-3">Point your camera at a QR Code and capture it.</p>
      <button id="start-scan" class="btn default-btn">START SCANNING</button>
    `;
    qrError.style.display = "none";
    qrError.textContent = "";
  }

  loadInitialLayout();

  let qrScanner;
  let isScanning = false;

  scanContent.addEventListener("click", async (e) => {
    if (e.target.id === "start-scan") {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });

        isScanning = true;
        scanContent.innerHTML = `
          <div id="qr-reader"></div>
          <p id="qr-message" class="text-muted" role="status">Scanning...</p>
          <button id="stop-scan" class="btn default-btn">STOP SCANNING</button>
        `;

        scanBox.style.height = "auto"; 
        qrError.style.display = "none";
        qrError.textContent = "";

        let scanHintShown = false;

        qrScanner = new Html5Qrcode("qr-reader");
        qrScanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            if (isScanning) {
              isScanning = false;
              qrScanner.stop().then(() => {
                const msg = document.getElementById("qr-message");
                if (msg) {
                  msg.textContent = /^https?:\/\//i.test(decodedText) ? `Scanned: ${decodedText}` : `Scanned: ${decodedText} (not a URL)`;
                }

                qrError.style.display = "none";
                qrError.textContent = "";

                if (/^https?:\/\//i.test(decodedText)) {
                  setTimeout(() => (window.location.href = decodedText), 1000);
                }
              });
            }
          },
          (error) => {
            if (!scanHintShown) {
              scanHintShown = true;
              setTimeout(() => {
                if (isScanning) {
                  const msg = document.getElementById("qr-message");
                  if (msg) {
                    msg.textContent = "Having trouble? Make sure the QR code is clear and centered.";
                  }
                }
              }, 3500);
            }
          }
        );
      } catch (err) {
        qrError.textContent = "Camera access denied or unavailable.";
        qrError.style.display = "block";
      }
    }

    if (e.target.id === "stop-scan") {
      if (qrScanner && isScanning) {
        await qrScanner.stop();
        isScanning = false;
      }
      loadInitialLayout();
    }
  });
});