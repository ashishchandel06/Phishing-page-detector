const scanSound = new Audio("assets/scan.mp3");

function checkURL() {
  const url = document.getElementById("urlInput").value.trim();
  const resultDiv = document.getElementById("result");
  const riskBar = document.getElementById("riskBar");
  const loadingText = document.getElementById("loadingText");
  const dots = document.getElementById("dots");

  if (!url) {
    resultDiv.className = "neutral";
    resultDiv.innerHTML = "⚠️ Please enter a URL.";
    riskBar.style.width = "0%";
    return;
  }

  resultDiv.innerHTML = "";
  loadingText.style.display = "block";
  let dotCount = 1;
  const dotInterval = setInterval(() => {
    dots.textContent = ".".repeat(dotCount);
    dotCount = dotCount === 3 ? 1 : dotCount + 1;
  }, 400);

  setTimeout(() => {
    clearInterval(dotInterval);
    loadingText.style.display = "none";

    let score = 0;
    const maxScore = 6;

    if (url.length > 75) score += 1;
    if (url.includes('@')) score += 1;
    if (url.split('.').length > 4) score += 1;
    if (/\d+\.\d+\.\d+\.\d+/.test(url)) score += 1;
    if (url.match(/(g00gle|faceb00k|micros0ft)/)) score += 2;

    const percent = (score / maxScore) * 100;
    riskBar.style.width = percent + "%";

    resultDiv.className = "";

    if (score >= 4) {
      resultDiv.classList.add("phishing");
      resultDiv.innerHTML = "🚨 This URL is likely <span style='color:#ff4c4c'>Phishing</span>!";
    } else if (score >= 2) {
      resultDiv.classList.add("suspicious");
      resultDiv.innerHTML = "⚠️ This URL is <span style='color:#ffcc00'>Suspicious</span>.";
      scanSound.play().catch(err => console.log("Beep error:", err));
    } else {
      resultDiv.classList.add("safe");
      resultDiv.innerHTML = "✅ This URL seems <span style='color:#66ff99'>Safe</span>.";
    }
  }, 2000);
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}
