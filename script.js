// Load questions and answers from an external file
async function loadQA() {
  const response = await fetch("questions_answers.txt");
  const text = await response.text();
  const qaPairs = [];

  text.split("\n").forEach(line => {
      if (line.trim()) {
          const [question, answers, keywords] = line.split("|");
          if (question && answers && keywords) {
              qaPairs.push({
                  question: question.trim(),
                  answers: answers.split(";").map(a => a.trim()),
                  keywords: keywords.split(",").map(k => k.trim())
              });
          }
      }
  });
  return qaPairs;
}

let faqData = [];

// Initialize the chatbot data
loadQA().then(data => faqData = data);

const synth = window.speechSynthesis;

function voiceControl(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.lang = "en-us";
  u.volume = 1;
  u.rate = 0.8;
  u.pitch = 1.2;
  synth.speak(u);
}

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
      if (e.code === "Enter") {
          let input = inputField.value.trim();
          input != "" && output(input);
          inputField.value = "";
      }
  });
});

function output(input) {
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "").trim();
  let product = getResponse(text);
  addChat(input, product);
}

// Updated getResponse function with keyword matching
function getResponse(userInput) {
  // Tokenize user input into lowercase keywords
  const userKeywords = userInput.toLowerCase().split(/\W+/);

  // Initialize variables to keep track of the best match
  let bestMatch = null;
  let highestScore = 0;

  // Loop through each FAQ entry
  faqData.forEach(faq => {
      // Calculate the score based on matched keywords
      let score = faq.keywords.reduce((acc, keyword) =>
          userKeywords.includes(keyword) ? acc + 1 : acc, 0);

      // Update best match if this entry has a higher score
      if (score > highestScore) {
          highestScore = score;
          bestMatch = faq;
      }
  });

  // Return the best match answer if a match is found
  if (bestMatch) {
      // Return a random answer from the matched question's possible answers
      return bestMatch.answers[Math.floor(Math.random() * bestMatch.answers.length)];
  }

  // Use an alternative response if no match is found
  const alternative = [
      "Same here, dude.",
      "That's cool! Go on...",
      "Dude...",
      "Ask something else...",
      "Hey, I'm listening..."
  ];
  return alternative[Math.floor(Math.random() * alternative.length)];
}

function addChat(input, product) {
  const mainDiv = document.getElementById("message-section");

  // User message
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.classList.add("message");
  userDiv.innerHTML = `<span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  // Bot typing animation (three dots)
  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.classList.add("message");
  let botResponse = document.createElement("span");
  botResponse.id = "bot-response";
  botResponse.innerHTML = "&#x2026;"; // Typing animation (three dots)
  botDiv.appendChild(botResponse);
  mainDiv.appendChild(botDiv);
  
  // Scroll to the bottom of the message section
  var scroll = document.getElementById("message-section");
  scroll.scrollTop = scroll.scrollHeight;

  // Wait for 2 seconds before typing the response
  setTimeout(() => {
      botResponse.innerHTML = ""; // Remove the typing animation

      // Typing effect
      let i = 0;
      function typeEffect() {
          if (i < product.length) {
              botResponse.innerHTML += product.charAt(i); // Add one letter at a time
              i++;
              setTimeout(typeEffect, 100); // Adjust delay here (100ms = 0.1s per letter)
          } else {
              // After typing is finished, use voice synthesis
              voiceControl(product);
          }
      }

      typeEffect(); // Start the typing effect after the delay
  }, 2000); // 2-second delay before typing starts
}

