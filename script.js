let btn=document.querySelector("#btn")
let content=document.querySelector("#content")


function speak(text){
    let text_speech=new SpeechSynthesisUtterance(text)
    text_speech.rate=1
    text_speech.pitch=1
    text_speech.volume=1
    text_speech.lang="en-IN"
    window.speechSynthesis.speak(text_speech)
}
function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12&& hours<16){
        speak("Good Afternoon sir")
    }
    else {
        speak("Good Evening sir")
    }
}
window.addEventListener('load',()=>{wishMe()})
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition 
let recognition = new speechRecognition()
recognition.interimResults = false; 
recognition.onresult=(event)=>{
   let currentIndex=event.resultIndex
   let transcript=event.results[currentIndex][0].transcript
   content.innerText=transcript
    takeCommand(transcript)
    
}
btn.addEventListener("click",()=>{
    recognition.start() 
})
function takeCommand(message){
    if(message.includes("hello") || message.includes("hey")){
        speak("hello, what can i help you")
    }
    else if(message.includes("who are you")){
        speak("I am a virtual Assistant")
    }
    else if(message.includes("open YouTube")){
        speak("opening youtube...")
        
        window.open("https://www.youtube.com/","_blank")
    }
    
    else if(message.includes("open whatsApp")){
        speak("opening whatsapp...")
        window.open("https://web.whatsapp.com/")
    }
    else if(message.includes("open google")){
        speak("opening Google...")
        window.open("https://google.com/")
    }
    else if(message.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
    }
    else{
        speak("This is what i found on internet"+message.replace("shifra","") || message.replace("shipra",""))
        window.open(`https://www.google.com/search?q=${message}`)
    }
    
}



