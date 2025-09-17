const API_URL = "http://localhost:5000/api";

async function fetchLeads() {
  const res = await fetch(`${API_URL}/leads`);
  const leads = await res.json();
  displayLeads(leads);
}

function displayLeads(leads) {
  const leadList = document.getElementById("lead-list");
  leadList.innerHTML = "";

  leads.forEach(lead => {
    const div = document.createElement("div");
    div.className = "lead";

    div.innerHTML = `
      <span>${lead.fullName} - ${lead.status}</span>
      <div>
        <select id="status-${lead.id}">
          <option value="">Update Status</option>
          <option value="NEW">NEW</option>
          <option value="CONTACTED">CONTACTED</option>
          <option value="INTERESTED">INTERESTED</option>
          <option value="NOT_INTERESTED">NOT_INTERESTED</option>
        </select>
        <input type="text" id="comment-${lead.id}" placeholder="Add comment" />
        <button onclick="updateStatus(${lead.id})">Update</button>
        <button onclick="viewHistory(${lead.id})">View History</button>
      </div>
      <div id="history-${lead.id}"></div>
    `;

    leadList.appendChild(div);
  });
}

async function updateStatus(id) {
  const status = document.getElementById(`status-${id}`).value;
  const comment = document.getElementById(`comment-${id}`).value;

  if (!status) {
    alert("Please select a status");
    return;
  }

  const res = await fetch(`${API_URL}/leads/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, comment }),
  });

  const data = await res.json();
  alert(data.message);
  fetchLeads(); // Refresh list
}

async function viewHistory(id) {
  const res = await fetch(`${API_URL}/leads/${id}/history`);
  const history = await res.json();
  const historyDiv = document.getElementById(`history-${id}`);

  if (history.length === 0) {
    historyDiv.innerHTML = "<small>No history available</small>";
    return;
  }

  historyDiv.innerHTML = "<ul>" + history.map(h => `<li>${h.status} - ${h.comment || "-"}</li>`).join("") + "</ul>";
}

// Initial load
fetchLeads();
