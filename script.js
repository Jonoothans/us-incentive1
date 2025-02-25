import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Connect to Supabase
const supabaseUrl = "https://ybtupotxytuoattvdnrk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidHVwb3R4eXR1b2F0dHZkbnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NzYwMDQsImV4cCI6MjA1NjA1MjAwNH0.cYb-OOtjPJiPNUOCAH032Eql1bsXnfzWtw4t831PlxQ";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch Data and Display in Table
async function fetchIncentiveData() {
    let { data, error } = await supabase.from("us-incentive").select("*");

    if (error) {
        console.error("Error fetching data:", error);
        return;
    }

    let tableBody = document.querySelector("#incentiveTable tbody");
    tableBody.innerHTML = "";

    data.forEach((row) => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.integrations}</td>
            <td>${row.graduations}</td>
            <td>${row.points}</td>
        `;

        tableBody.appendChild(tr);
    });
}

// Fetch new data every 30 seconds
setInterval(fetchIncentiveData, 30000);
fetchIncentiveData();
