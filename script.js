const userMessage = [
    ["hi", "hey", "hello"],
    ["sure", "yes", "no"],
    ["are you genious", "are you nerd", "are you intelligent"],
    ["i hate you", "i dont like you"],
    ["how are you", "how is life", "how are things", "how are you doing"],
    ["how is corona", "how is covid 19", "how is covid19 situation"],
    ["what are you doing", "what is going on", "what is up"],
    ["how old are you"],
    ["who are you", "are you human", "are you bot", "are you human or bot"],
    ["who created you", "who made you", "who is your creator"],

  
    [
      "your name please",
      "your name",
      "may i know your name",
      "what is your name",
      "what call yourself"
    ],
    ["i love you"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool", "very good"],
    ["bad", "bored", "tired"],
    ["help me", "tell me story", "tell me joke"],
    ["ah", "ok", "okay", "nice", "welcome"],
    ["thanks", "thank you"],
    ["what should i eat today"],
    ["bro"],
    ["what", "why", "how", "where", "when"],
    ["corona", "covid19", "coronavirus"],
    ["you are funny"],
    ["i dont know"],
    ["boring"],
    ["im tired"],
    ["tell me about india", "what is india", "india info", "facts about india"],
    ["tell me about sharda university", "sharda university info", "sharda facts"],
    ["courses in sharda"],
    ["how many engineering courses does sharda university offer"],
    ["what is the fee structure for btech programs"],
    ["are there any scholarships available for students"],
    ["what are the admission criteria for undergraduate courses"],
    ["when does the admission process start"],
    ["is there a hostel facility available"],
    ["how can I apply for admission to sharda university"],
    ["what are you"],
    ["what is the full form of kira","what is kira"]

  ];
  const botReply = [
    ["Hey","Hello","Hi there!"],
    ["Okay"],
    ["Yes I am! "],
    ["I'm sorry about that. But I like you dude."],
    [
      "Fantastic, how are you?",
      "I am fine... How are you ?",
      "Preety well .. How are you ?"

    ],
    ["Getting better. There?", "Somewhat okay!", "Yeah fine. Better stay home!"],
  
    [
      "Nothing much",
      "About to go to sleep",
      "Can you guess?",
      "I don't know actually"
    ],
    ["I am always young."],
    ["I am just a bot", "I am a bot. What are you?"],
    ["Sujay and Suryansh"],
    ["Hi I am KIRA"],
    ["I love you too", "Me too"],
    ["Have you ever felt bad?", "Glad to hear it"],
    ["Why?", "Why? You shouldn't!", "Try watching TV", "Chat with me."],
    ["What about?", "Once upon a time..."],
    ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
    ["You're welcome"],
    ["Briyani", "Burger", "Sushi", "Pizza"],
    ["Dude!"],
    ["Yes?"],
    ["Please stay home"],
    ["Glad to hear it"],
    ["Say something interesting"],
    ["Sorry for that. Let's chat!"],
    ["Take some rest, Dude!"],
    [
        "India is a country in South Asia, known for its rich history, diverse culture, and being the largest democracy in the world.",
        "India is known for its cultural heritage, unity in diversity, and being the seventh-largest country in the world.",
        "India is a land of many traditions, a rich history dating back thousands of years, and is home to over 1.4 billion people."
      ],
      [
        "Sharda University is a private university located in Greater Noida, India. It is known for its diverse student population and offers courses in various disciplines.",
        "Sharda University is renowned for its global faculty and world-class infrastructure, attracting students from over 85 countries.",
        "Sharda University offers more than 200 courses across a range of disciplines and is highly regarded for its international partnerships."
      ],
      ["Some of the courses are B.Tech, Biotech, Bsc, Msc, b.Pharma, MBBS"],
      ["Sharda University offers several engineering courses, including Computer Science, Mechanical, Civil, Electronics, and Electrical Engineering."],
      ["The fee for B.Tech programs typically ranges from ₹1,20,000 to ₹1,50,000 per year, depending on the specialization."],
      ["Yes, Sharda University offers various scholarships based on merit, need, and specific criteria like sports achievements."],
      ["Admissions are based on performance in qualifying exams such as JEE Main, UPSEE, or Sharda University Entrance Test (SUAT)."],
      ["The admission process generally begins in April and continues until July each year."],
      ["Yes, Sharda University provides separate hostels for boys and girls with various amenities."],
      ["You can apply online through the official Sharda University website by filling out the application form."],
      ["I am a chat Bot Assistant, always there to assist you"],
      ["Kira stands for Knowledgeable Interactive Resourse Assistant"]


  ];
  
  const alternative = [
    
    "Ask something else..."
    
  ];
  
  const synth = window.speechSynthesis;
  
  function voiceControl(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-us";
    u.volume = 10;
    u.rate = 1.0;
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
    let product;
  
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  
    text = text
      .replace(/[\W_]/g, " ")
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .trim();
  
    let comparedText = compare(userMessage, botReply, text);
  
    product = comparedText
      ? comparedText
      : alternative[Math.floor(Math.random() * alternative.length)];
    addChat(input, product);
  }
  
  function compare(triggerArray, replyArray, string) {
    let response = "";
    for (let x = 0; x < triggerArray.length; x++) {
      // Check if the user input matches one of the trigger phrases
      if (triggerArray[x].includes(string)) {
        // Pick a random reply from the array of possible responses
        response = replyArray[x][Math.floor(Math.random() * replyArray[x].length)];
        break;
      }
    }
    // If a match is found, return the random response, otherwise check in expected responses
    return response ? response : containMessageCheck(string);
  }
  
  

  
  function containMessageCheck(string) {
    let expectedReply = [
      [
        "Good Bye, dude",
        "Bye, See you!",
        "Dude, Bye. Take care of your health in this situation."
      ],
      ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
      ["Have a pleasant evening!", "Good evening too", "Evening!"],
      ["Good morning, Have a great day!", "Morning, dude!"],
      ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"]
    ];
    let expectedMessage = [
      ["bye", "tc", "take care"],
      ["night", "good night"],
      ["evening", "good evening"],
      ["morning", "good morning"],
      ["noon"]
    ];
    let item;
    for (let x = 0; x < expectedMessage.length; x++) {
      if (expectedMessage[x].includes(string)) {
        items = expectedReply[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
    return item;
  }
  function addChat(input, product) {
    const mainDiv = document.getElementById("message-section");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.classList.add("message");
    userDiv.innerHTML = `<span id="user-response">${input}</span>`;
    mainDiv.appendChild(userDiv);
  
    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.classList.add("message");
    botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
    mainDiv.appendChild(botDiv);
    var scroll = document.getElementById("message-section");
    scroll.scrollTop = scroll.scrollHeight;
    voiceControl(product);
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
          setTimeout(typeEffect, 50); // Adjust delay here (100ms = 0.1s per letter)
        } else {
          // After typing is finished, use voice synthesis
          voiceControl(product);
        }
      }
  
      typeEffect(); // Start the typing effect after the delay
    }, 2000); // 2-second delay before typing starts
  }
  