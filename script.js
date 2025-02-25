// ✅ Ensure Supabase is properly loaded before using it
if (typeof supabase === "undefined") {
    console.error("❌ Supabase library not loaded. Make sure to include it in index.html.");
}

// ✅ Supabase Connection
const supabaseUrl = "https://ybtupotxytuoattvdnrk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidHVwb3R4eXR1b2F0dHZkbnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NzYwMDQsImV4cCI6MjA1NjA1MjAwNH0.cYb-OOtjPJiPNUOCAH032Eql1bsXnfzWtw4t831PlxQ";

const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

// ✅ Fetch Data and Display in Table (Sorted by Integrations)
async function fetchIncentiveData() {
    console.log("Fetching data from Supabase...");

    // ✅ Manually Add API Key
    let { data, error } = await fetch(`${supabaseUrl}/rest/v1/us_incentive?select=*`, {
