// ✅ Ensure the page is fully loaded before running the script
document.addEventListener("DOMContentLoaded", async function () {
    console.log("✅ DOM fully loaded, initializing Supabase...");

    // ✅ Ensure Supabase is fully loaded before using it
    if (typeof window.supabase === "undefined") {
        console.error("❌ Supabase library not loaded. Make sure to include it in index.html.");
        return;
    }

    console.log("✅ Supabase library loaded successfully.");

    // ✅ Supabase Connection
    const supabaseUrl = "https://ybtupotxytuoattvdnrk.supabase.co";
    const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidHVwb3R4eXR1b2F0dHZkbnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NzYwMDQsImV4cCI6MjA1NjA1MjAwNH0.cYb-OOtjPJiPNUOCAH032Eql1bsXnfzWtw4t831PlxQ";

    // ✅ Initialize Supabase Client
    const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
    console.log("✅ Supabase client initialized.");

    // ✅ Fetch Data and Display in Table
    async function fetchIncentiveData() {
        console.log("Fetching data from Supabase...");

        let response = await fetch(`${supabaseUrl}/rest/v1/us_incentive?select=*`, {
            method: "GET",
            headers: {
                "apikey": supabaseAnonKey,
                "Authorization": `Bearer ${supabaseAnonKey}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            console.error("❌ Error fetching data:", response.status, response.statusText);
            return;
        }

        let data = await response.json();

        if (!data || data.length === 0) {
            console.warn("⚠️ No data found in Supabase.");
            document.querySelector("#incentiveTable tbody").innerHTML =
              "<tr><td colspan='4'>No data found.</td></tr>";
            return;
        }

        console.log("✅ Fetched Data:", data);

        let tableBody = document.querySelector("#incentiveTable tbody");
        tableBody.innerHTML = "";

        // Sort by "integrations" descending
        data.sort((a, b) => b.integrations - a.integrations);

        data.forEach((row) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.name || "N/A"}</td>
                <td>${row.integrations || 0}</td>
                <td>${row.graduations || 0}</td>
                <td>${row.points || 0}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // ✅ Fetch new data every 30 seconds
    setInterval(fetchIncentiveData, 30000);
    fetchIncentiveData();
});

