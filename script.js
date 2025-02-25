import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ✅ Connect to Supabase with API Key
const supabaseUrl = "https://ybtupotxytuoattvdnrk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidHVwb3R4eXR1b2F0dHZkbnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NzYwMDQsImV4cCI6MjA1NjA1MjAwNH0.cYb-OOtjPJiPNUOCAH032Eql1bsXnfzWtw4t831PlxQ";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ Fetch Data and Display in Table (Sorted by Integrations)
async function fetchIncentiveData() {
    console.log("Fetching data from Supabase...");

    let { data, error } = await supabase
        .from("us_incentive")
        .select("*")
        .order("integrations", { ascending: false }); // ✅ Sorting directly from Supabase

    if (error) {
        console.error("❌ Error fetching data:", error);
        return;
    }

    console.log("✅ Fetched Data:", data);

    let tableBody = document.querySelector("#incentiveTable tbody");
    tableBody.innerHTML = "";

    if (!data || data.length === 0) {
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

// ✅ Fetch new data every 30 seconds
setInterval(fetchIncentiveData, 30000);
fetchIncentiveData();

// ✅ Fetch new data every 30 seconds
setInterval(fetchIncentiveData, 30000);
fetchIncentiveData();
