// ✅ Load Supabase Client
const supabaseUrl = "https://ybtupotxytuoattvdnrk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidHVwb3R4eXR1b2F0dHZkbnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NzYwMDQsImV4cCI6MjA1NjA1MjAwNH0.cYb-OOtjPJiPNUOCAH032Eql1bsXnfzWtw4t831PlxQ";

const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

// ✅ Fetch Data and Display in Table (Sorted by Integrations - Highest to Lowest)
async function fetchIncentiveData() {
    console.log("Fetching sorted data from Supabase...");

    let { data, error } = await fetch(`${supabaseUrl}/rest/v1/us_incentive?select=*&order=integrations.desc`, {
        method: "GET",
        headers: {
            "apikey": supabaseAnonKey,
            "Authorization": `Bearer ${supabaseAnonKey}`,
            "Content-Type": "application/json"
        }
    }).then(res => res.json());

    if (!data || error) {
        console.error("❌ Error fetching sorted data:", error || "No data received.");
        return;
    }

    console.log("✅ Sorted Fetched Data:", data);

    let tableBody = document.querySelector("#incentiveTable tbody");
    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='4'>No data found in Supabase.</td></tr>";
        return;
    }

    data.forEach((row) => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${row.name || "N/A"}</td>
            <td>${row.integrations || "0"}</td>
            <td>${row.graduations || "0"}</td>
            <td>${row.points || "0"}</td>
        `;

        tableBody.appendChild(tr);
    });
}

// ✅ Fetch new sorted data every 30 seconds
setInterval(fetchIncentiveData, 30000);
fetchIncentiveData();
