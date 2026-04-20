// * Elements on DOM

// ** MORTGAGE
// Mortgage Inputs
const mortgage_home_value_input = document.querySelector(
  "#mortgage-home-value",
);
const mortgage_down_payment_input = document.querySelector(
  "#mortgage-down-payment",
);
const mortgage_interest_rate_input = document.querySelector(
  "#mortgage-interest-rate",
);
const mortgage_length_input = document.querySelector("#mortgage-length-years");

// Mortgage Calculate Button
const mortgage_calc_button = document.querySelector("#mortgage-button");

// Mortgage Output Spans
const mortgage_monthly_output_span = document.querySelector(
  "#mortgage-monthly-payment",
);
const mortgage_principal_output_span = document.querySelector(
  "#mortgage-principal-payment",
);
const mortgage_interest_output_span = document.querySelector(
  "#mortgage-interest-payment",
);
const mortgage_total_output_span = document.querySelector(
  "#mortgage-total-payment",
);

// ** AUTO
// Auto Inputs
const auto_value_input = document.querySelector("#auto-value");
const auto_down_payment_input = document.querySelector("#auto-down-payment");
const auto_interest_rate_input = document.querySelector("#auto-interest-rate");
const auto_length_input = document.querySelector("#auto-length-years");

// Auto Calculate Button
const auto_calc_button = document.querySelector("#auto-button");

// Auto Output Spans
const auto_monthly_output_span = document.querySelector(
  "#auto-monthly-payment",
);
const auto_principal_output_span = document.querySelector(
  "#auto-principal-payment",
);
const auto_interest_output_span = document.querySelector(
  "#auto-interest-payment",
);
const auto_total_output_span = document.querySelector("#auto-total-payment");

// * Functions

// Calculates Mortgage
function calculate_mortgage() {
  // Get values from inputs (convert to floats)
  const home_value = stringMoney_to_float(mortgage_home_value_input.value);
  const down_payment = stringMoney_to_float(mortgage_down_payment_input.value);
  const annual_interest_rate =
    parseFloat(mortgage_interest_rate_input.value) / 100;
  const loan_years = parseFloat(mortgage_length_input.value);

  // Core loan values
  const principal = home_value - down_payment;
  const monthly_rate = annual_interest_rate / 12;
  const number_of_payments = loan_years * 12;

  // Monthly payment formula
  let monthly_payment = 0;

  if (monthly_rate === 0) {
    // Edge case: 0% interest
    monthly_payment = principal / number_of_payments;
  } else {
    monthly_payment =
      (principal *
        monthly_rate *
        Math.pow(1 + monthly_rate, number_of_payments)) /
      (Math.pow(1 + monthly_rate, number_of_payments) - 1);
  }

  // Totals
  const total_payment = monthly_payment * number_of_payments;
  const total_interest = total_payment - principal;

  // Output (formatted)
  mortgage_monthly_output_span.textContent = format_amount(monthly_payment);

  mortgage_principal_output_span.textContent = format_amount(principal);

  mortgage_interest_output_span.textContent = format_amount(total_interest);

  mortgage_total_output_span.textContent = format_amount(total_payment);
}

function calculate_auto() {
  const auto_value = stringMoney_to_float(auto_value_input.value);
  const down_payment = stringMoney_to_float(auto_down_payment_input.value);
  const annual_interest_rate = parseFloat(auto_interest_rate_input.value) / 100;
  const loan_years = parseFloat(auto_length_input.value);

  const principal = auto_value - down_payment;
  const monthly_rate = annual_interest_rate / 12;
  const number_of_payments = loan_years * 12;

  let monthly_payment = 0;

  if (monthly_rate === 0) {
    // Edge case: 0% interest
    monthly_payment = principal / number_of_payments;
  } else {
    monthly_payment =
      (principal *
        monthly_rate *
        Math.pow(1 + monthly_rate, number_of_payments)) /
      (Math.pow(1 + monthly_rate, number_of_payments) - 1);
  }

  // Totals
  const total_payment = monthly_payment * number_of_payments;
  const total_interest = total_payment - principal;

  // Output (formatted)
  auto_monthly_output_span.textContent = format_amount(monthly_payment);
  auto_principal_output_span.textContent = format_amount(principal);
  auto_interest_output_span.textContent = format_amount(total_interest);
  auto_total_output_span.textContent = format_amount(total_payment);
}

// * Following two functions just help me flip-flop between floats and currency so that the database doesn't accidentally receive a string
// * and the user can read the money more easily.
function format_amount(value_amount) {
  return value_amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function stringMoney_to_float(amount) {
  return parseFloat(amount.replace(/[^0-9.-]+/g, ""));
}

// * Event Listeners

mortgage_calc_button.addEventListener("click", calculate_mortgage);
auto_calc_button.addEventListener("click", calculate_auto);
