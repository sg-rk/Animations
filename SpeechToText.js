const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const colors = ["lightsalmon", "salmon", "darksalmon", "lightcoral", "indianred", "crimson", "firebrick", "red", "darkred", "coral", "tomato", "orangered", "gold", "orange", "darkorange", "lightyellow", "lemonchiffon", "lightgoldenrodyellow", "papayawhip", "moccasin", "peachpuff", "palegoldenrod", "khaki", "darkkhaki", "yellow", "lawngreen", "chartreuse", "limegreen", "lime", "forestgreen", "green", "darkgreen", "greenyellow", "yellowgreen", "springgreen", "mediumspringgreen", "lightgreen", "palegreen", "darkseagreen", "mediumseagreen", "seagreen", "olive", "darkolivegreen", "olivedrab", "lightcyan", "cyan", "aqua", "aquamarine", "mediumaquamarine", "paleturquoise", "turquoise", "mediumturquoise", "darkturquoise", "lightseagreen", "cadetblue", "darkcyan", "teal", "powderblue", "lightblue", "lightskyblue", "skyblue", "deepskyblue", "lightsteelblue", "dodgerblue", "cornflowerblue", "steelblue", "royalblue", "blue", "mediumblue", "darkblue", "navy", "midnightblue", "mediumslateblue", "slateblue", "darkslateblue", "lavender", "thistle", "plum", "violet", "orchid", "fuchsia", "magenta", "mediumorchid", "mediumpurple", "blueviolet", "darkviolet", "darkorchid", "darkmagenta", "purple", "indigo", "pink", "lightpink", "hotpink", "deeppink", "palevioletred", "mediumvioletred", "white", "snow", "honeydew", "mintcream", "azure", "aliceblue", "ghostwhite", "whitesmoke", "seashell", "beige", "oldlace", "floralwhite", "ivory", "antiquewhite", "linen", "lavenderblush", "mistyrose", "gainsboro", "lightgray", "silver", "darkgray", "gray", "dimgray", "lightslategray", "slategray", "darkslategray", "black", "cornsilk", "blanchedalmond", "bisque", "navajowhite", "wheat", "burlywood", "tan", "rosybrown", "sandybrown", "goldenrod", "peru", "chocolate", "saddlebrown", "sienna", "brown", "maroon"];
// const colors = ["aqua", "azure", "beige", "bisque", "black", "blue", "brown", "chocolate", "coral", "crimson", "cyan", "fuchsia", "ghostwhite", "gold", "goldenrod", "gray", "green", "indigo", "ivory", "khaki", "lavender", "lime", "linen", "magenta", "maroon", "moccasin", "navy", "olive", "orange", "orchid", "peru", "pink", "plum", "purple", "red", "salmon", "sienna", "silver", "snow", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "white", "yellow"];
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(
    " | "
)};`;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
const synth = window.speechSynthesis;

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector('.output');
const bg = document.querySelector('body');
const colorsBox = document.querySelector('.colorsBox');
const mic = document.querySelector('.mic');
const listen = document.querySelector('.listen');
const showColors = document.querySelector('.showColors');
const hideColors = document.querySelector('.hideColors');

let colorHTML = "";
colors.forEach((color, i) => {
    colorHTML += `<span class="color" style="background-color: ${color}">${color}</span>`
})
colorsBox.querySelector(".colorBoxes").innerHTML = `${colorHTML}`;

mic.onclick = () => {
    recognition.start();
    listen.style.display = "block";
    console.log('Ready to receive a color command.')
}

recognition.onresult = (event) => {
    console.log('rk result event ', event);
    const color = event.results[0][0].transcript;
    diagnostic.textContent = `Result received: ${color}.`;
    if(color.toUpperCase().includes("WHITE")){
        mic.style.color = "#000";
    }
    else {
        mic.style.color = "#fff";                
    }
    bg.style.backgroundColor = color;
    console.log(`Confidence: ${event.results[0][0].confidence}`);
}

recognition.onspeechend = () => {
    listen.style.display = "none";
    recognition.stop();
}

recognition.onnomatch = () => {
    listen.style.display = "none";
    diagnostic.textContent = `I didn't recognize the color!`;
}

recognition.onerror = (event) => {
    console.log('rk error event ', event);
    listen.style.display = "none";
    diagnostic.textContent = `Error occurred in recognition : ${event.error}`;
}

const cbox = document.querySelectorAll(".color");

for (let i = 0; i < cbox.length; i++) {
    cbox[i].addEventListener("click", function(e) {
        console.log('rk value ', e);
        console.log('rk value ', e.target.innerHTML);
        const utterance = new SpeechSynthesisUtterance(e.target.innerHTML);
        synth.speak(utterance);
    });
}

showColors.onclick = (e) => {
    e.preventDefault();
    e.srcElement.classList.add("d-none");
    colorsBox.classList.remove("hide");
}

hideColors.onclick = (e) => {
    e.preventDefault();
    showColors.classList.remove("d-none");
    colorsBox.classList.add("hide");
}