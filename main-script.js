// initialize database
const db = supabase.createClient(
  "https://picufxzhyglwmqukzyyl.supabase.co",
  "sb_publishable_51KQNADsbiEELlQxpjBBPQ_tRauQlrJ",
);

// Main Display p's

const total_users_display = document.querySelector("#total-users-number");
const total_budgets_display = document.querySelector("#total-budgets-number");

// Database Table Name
let table_name = "Budget-Line-Items";

async function display_totals() {
  const { data, error } = await db
    .from(table_name)
    .select("User_Name, Budget_Name");

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  // Safety check
  if (!data) return;

  // Get unique usernames
  const uniqueUsers = new Set(data.map((row) => row.User_Name).filter(Boolean));

  // Get unique budget names
  const uniqueBudgets = new Set(
    data.map((row) => `${row.User_Name}-${row.Budget_Name}`).filter(Boolean),
  );

  // Update DOM
  setTimeout(() => {
    animateCount(total_users_display, uniqueUsers.size);
  }, 0);

  setTimeout(() => {
    animateCount(total_budgets_display, uniqueBudgets.size);
  }, 150);
}

function animateCount(element, endValue, duration = 1200) {
  let startTime = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(currentTime) {
    if (!startTime) startTime = currentTime;

    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = easeOutCubic(progress);

    const currentValue = Math.floor(eased * endValue);

    element.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = endValue.toLocaleString();
    }
  }

  requestAnimationFrame(step);
}

// On Load
display_totals();
