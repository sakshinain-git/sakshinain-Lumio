const backendURL = "http://localhost:5000/api";

async function generateSummary() {
  const transcript = document.getElementById("transcript").value;
  const prompt = document.getElementById("prompt").value;

  const res = await fetch(`${backendURL}/summarize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript, prompt })
  });

  const data = await res.json();
  document.getElementById("summary").value = data.summary;
}

async function sendEmail() {
  const email = document.getElementById("email").value;
  const summary = document.getElementById("summary").value;

  const res = await fetch(`${backendURL}/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: email,
      subject: "Meeting Summary",
      text: summary
    })
  });

  const data = await res.json();
  alert(data.message || "Email sent!");
}
