const resultElement = document.getElementById("result");
const yearsElement = document.getElementById("years");
const monthsElement = document.getElementById("months");
const weeksElement = document.getElementById("weeks");
const daysElement = document.getElementById("days");

const previousAge = {
  years: "",
  months: "",
  weeks: "",
  days: "",
};

const params = new URLSearchParams(window.location.search);

try {
  const dob = params.get("dob");

  if (dob) {
    const parsedDate = new Date(dob);
    if (isNaN(parsedDate)) {
      throw new Error("Invalid date format.");
    }
    parsedDate.setHours(0, 0, 0, 0);

    updateAge(parsedDate);
    resultElement.style.display = "block";

    setInterval(() => {
      updateAge(parsedDate);
    }, 1000);
  } else {
    throw new Error("dob not found.");
  }
} catch {
  const formElement = document.getElementById("form");
  if (formElement) {
    formElement.style.display = "block";
  } else {
    console.log("Form element not found.");
  }
}

function updateAge(dob) {
  const now = new Date();
  const ageBreakdown = calculateAgeBreakdown(dob, now);

  // Update each age unit with decimal precision
  updateAgeUnit(yearsElement, ageBreakdown.years.toFixed(7), previousAge.years);
  updateAgeUnit(monthsElement, ageBreakdown.months.toFixed(5), previousAge.months);
  updateAgeUnit(weeksElement, ageBreakdown.weeks.toFixed(4), previousAge.weeks);
  updateAgeUnit(daysElement, ageBreakdown.days.toFixed(3), previousAge.days);

  // Update previous values
  previousAge.years = ageBreakdown.years.toFixed(7);
  previousAge.months = ageBreakdown.months.toFixed(5);
  previousAge.weeks = ageBreakdown.weeks.toFixed(4);
  previousAge.days = ageBreakdown.days.toFixed(3);
}

function updateAgeUnit(element, currentValue, previousValue) {
  element.innerHTML = ""; // Clear previous content

  // Split the value into individual digits
  const digits = currentValue.split("");
  digits.forEach((digit, index) => {
    const span = document.createElement("span");
    span.className = "digit";
    if (!isNaN(digit)) {
      span.classList.add("card");
    }
    span.textContent = digit;

    // Apply flip animation only if the digit has changed
    if (previousValue[index] !== digit) {
      const randomDuration = (Math.random() * (0.5 - 0.05) + 0.05).toFixed(2) + "s";
      span.style.animationDuration = randomDuration;
      span.classList.add("slide");
    }

    element.appendChild(span);
  });
}

function calculateAgeBreakdown(dob, now) {
  const totalMilliseconds = now - dob;

  // Calculate precise decimal values
  const totalDays = totalMilliseconds / (1000 * 60 * 60 * 24);
  const totalWeeks = totalDays / 7;
  const totalMonths = totalDays / 30.44; // Average days per month
  const totalYears = totalDays / 365.25; // Account for leap years

  return {
    years: totalYears,
    months: totalMonths,
    weeks: totalWeeks,
    days: totalDays,
  };
}
