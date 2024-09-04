const resultElement = document.getElementById("result");
const ageElement = document.getElementById("age");
let previousAge = "";

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
} catch (error) {
  const formElement = document.getElementById("form");
  if (formElement) {
    formElement.style.display = "block";
  } else {
    console.log("Form element not found.");
  }
}

function updateAge(dob) {
  const now = new Date();
  const ageInMilliseconds = now - dob;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
  const ageInYearsRounded = ageInYears.toFixed(7);

  ageElement.innerHTML = ""; // Clear previous content

  // Split the age into individual digits
  const digits = ageInYearsRounded.split("");
  digits.forEach((digit, index) => {
    const span = document.createElement("span");
    span.className = "digit";
    if (!isNaN(digit)) {
      span.classList.add("card");
    }
    span.textContent = digit;

    // Apply flip animation only if the digit has changed
    if (previousAge[index] !== digit) {
      const randomDuration = (Math.random() * (0.5 - 0.05) + 0.05).toFixed(2) + "s";
      span.style.animationDuration = randomDuration;
      span.classList.add("slide");
    }

    ageElement.appendChild(span);
  });

  previousAge = ageInYearsRounded;
}
