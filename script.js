let btn = document.querySelector("#btn");
let content = document.querySelector("#content");

function speak(text) {
    let text_speech = new SpeechSynthesisUtterance(text);
    text_speech.rate = 1;
    text_speech.pitch = 1;
    text_speech.volume = 1;
    text_speech.lang = "en-IN";
    window.speechSynthesis.speak(text_speech);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon sir");
    } else {
        speak("Good Evening sir");
    }
}

window.addEventListener('load', () => { wishMe(); });

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.interimResults = false;

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript.toLowerCase().trim(); // Convert to lowercase for consistency
    content.innerText = transcript;
    takeCommand(transcript);
};

btn.addEventListener("click", () => {
    recognition.start();
});

function takeCommand(message) {
    let handled = false;  // Flag to check if a command was executed

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, what can I help you with?");
        handled = true;
    } else if (message.includes("who are you")) {
        speak("I am a virtual Assistant");
        handled = true;
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
        handled = true;
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("https://web.whatsapp.com/", "_blank");
        handled = true;
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
        handled = true;
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The time is ${time}`);
        handled = true;
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(`Today's date is ${date}`);
        handled = true;
    } else if (message.includes("play")) {
        let searchQuery = message.replace("play", "").trim();
        if (searchQuery) {
            speak(`Playing ${searchQuery}`);
            window.open(`https://www.youtube.com/watch?search_query=${searchQuery}`, "_blank");
            handled = true;
        }
    }


    if (!handled) {
        speak(`Searching for ${message}`);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}



