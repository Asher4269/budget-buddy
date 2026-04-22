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

formatCurrencyInput(mortgage_home_value_input);
formatCurrencyInput(mortgage_down_payment_input);
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

formatCurrencyInput(auto_value_input);
formatCurrencyInput(auto_down_payment_input);
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

//** INVESTMENT
// Investment Inputs
const investment_initial_input = document.querySelector("#investment-initial");
const investment_monthly_input = document.querySelector(
  "#investment-monthly-contribution",
);
const investment_interest_rate_input = document.querySelector(
  "#investment-interest-rate",
);
const investment_length_input = document.querySelector(
  "#investment-length-years",
);

formatCurrencyInput(investment_initial_input);
formatCurrencyInput(investment_monthly_input);

// Investment Calculate Button
const investment_calc_button = document.querySelector("#investment-button");

// Investment Output Spans
const investment_principal_output_span = document.querySelector(
  "#investment-principal-gain",
);
const investment_interest_output_span = document.querySelector(
  "#investment-interest-gain",
);
const investment_total_output_span = document.querySelector(
  "#investment-total-gain",
);

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

function calculate_investment() {
  // Get values from inputs
  const initial = stringMoney_to_float(investment_initial_input.value);
  const monthly_contribution = stringMoney_to_float(
    investment_monthly_input.value,
  );
  const annual_rate = parseFloat(investment_interest_rate_input.value) / 100;
  const years = parseFloat(investment_length_input.value);

  const monthly_rate = annual_rate / 12;
  const n = years * 12;

  // Future value of initial investment
  const future_initial = initial * Math.pow(1 + monthly_rate, n);

  // Future value of monthly contributions
  let future_contributions = 0;

  if (monthly_rate === 0) {
    // Edge case: 0% interest
    future_contributions = monthly_contribution * n;
  } else {
    future_contributions =
      monthly_contribution *
      ((Math.pow(1 + monthly_rate, n) - 1) / monthly_rate);
  }

  // Totals
  const total_value = future_initial + future_contributions;
  const total_principal = initial + monthly_contribution * n;
  const total_interest = total_value - total_principal;

  // Output (formatted)
  investment_principal_output_span.textContent = format_amount(total_principal);

  investment_interest_output_span.textContent = format_amount(total_interest);

  investment_total_output_span.textContent = format_amount(total_value);
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

function formatCurrencyInput(inputElement) {
  if (!inputElement) return;

  inputElement.addEventListener("input", (e) => {
    const el = e.target;
    let value = el.value;

    // Allow empty input
    if (value.trim() === "") {
      el.value = "";
      return;
    }

    let selectionStart = el.selectionStart;

    // Count digits before cursor
    const digitsBeforeCursor = value
      .slice(0, selectionStart)
      .replace(/[^\d]/g, "").length;

    // Detect if cursor is after decimal
    const cursorAfterDecimal = value.slice(0, selectionStart).includes(".");

    // Clean input
    let raw = value.replace(/[^\d.]/g, "");
    const parts = raw.split(".");

    let integerPart = parts[0] || "";
    let decimalPart = parts[1] || "";

    // Limit decimals to 2
    if (decimalPart.length > 2) {
      decimalPart = decimalPart.slice(0, 2);
    }

    // Format integer
    let formattedInt = integerPart
      ? new Intl.NumberFormat("en-US").format(parseInt(integerPart, 10))
      : "";

    // Build final value
    let finalValue = formattedInt ? "$" + formattedInt : "";

    if (raw.includes(".")) {
      finalValue += "." + decimalPart;
    }

    el.value = finalValue;

    // Restore cursor position
    let newCursorPos = finalValue.length;

    if (cursorAfterDecimal) {
      const decimalIndex = finalValue.indexOf(".");
      if (decimalIndex !== -1) {
        const digitsAfterDecimal = value
          .slice(value.indexOf(".") + 1, selectionStart)
          .replace(/[^\d]/g, "").length;

        newCursorPos = decimalIndex + 1 + digitsAfterDecimal;
      }
    } else {
      let digitCount = 0;

      for (let i = 0; i < finalValue.length; i++) {
        if (/\d/.test(finalValue[i])) digitCount++;
        if (digitCount >= digitsBeforeCursor) {
          newCursorPos = i + 1;
          break;
        }
      }
    }

    el.setSelectionRange(newCursorPos, newCursorPos);
  });

  // Format nicely on blur
  inputElement.addEventListener("blur", () => {
    let raw = inputElement.value.replace(/[^\d.]/g, "");
    let number = parseFloat(raw);

    if (!isNaN(number)) {
      inputElement.value = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number);
    }
  });

  // Gently keep cursor after "$"
  inputElement.addEventListener("focus", () => {
    if (inputElement.value.startsWith("$")) {
      setTimeout(() => {
        if (inputElement.selectionStart === 0) {
          inputElement.setSelectionRange(1, 1);
        }
      }, 0);
    }
  });
}

// * Event Listeners

mortgage_calc_button.addEventListener("click", calculate_mortgage);
auto_calc_button.addEventListener("click", calculate_auto);
investment_calc_button.addEventListener("click", calculate_investment);
