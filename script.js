// ==========================================
// AMETZ AI
// ==========================================

let currentLanguage = "ru";

const chat = document.getElementById("chat");
const welcome = document.getElementById("welcome");

const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

const languageSelect = document.getElementById("language");

const themeButton = document.getElementById("themeButton");

const newChat = document.getElementById("newChat");

const mobileMenu = document.getElementById("mobileMenu");
const sidebar = document.querySelector(".sidebar");


// ==========================================
// LANGUAGE
// ==========================================

const translations = {

    ru: {
        placeholder: "Напишите сообщение AMETZ AI..."
    },

    en: {
        placeholder: "Message AMETZ AI..."
    },

    kk: {
        placeholder: "AMETZ AI-ға хабарлама жазыңыз..."
    },

    tr: {
        placeholder: "AMETZ AI'ya mesaj yazın..."
    },

    uz: {
        placeholder: "AMETZ AI ga xabar yozing..."
    },

    ky: {
        placeholder: "AMETZ AI'га билдирүү жазыңыз..."
    },

    de: {
        placeholder: "Nachricht an AMETZ AI..."
    },

    fr: {
        placeholder: "Écrivez à AMETZ AI..."
    },

    es: {
        placeholder: "Escribe a AMETZ AI..."
    },

    ar: {
        placeholder: "اكتب رسالة إلى AMETZ AI..."
    },

    zh: {
        placeholder: "给 AMETZ AI 发消息..."
    },

    ja: {
        placeholder: "AMETZ AI にメッセージ..."
    },

    ko: {
        placeholder: "AMETZ AI에게 메시지..."
    },

    hi: {
        placeholder: "AMETZ AI को संदेश लिखें..."
    }

};


function setLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;


    document
        .querySelectorAll("[data-ru]")
        .forEach(element => {

            const text =
                element.dataset[language];

            if (text) {
                element.textContent = text;
            }

        });


    if (translations[language]) {

        input.placeholder =
            translations[language].placeholder;

    }

}


languageSelect.addEventListener(
    "change",
    () => {

        setLanguage(
            languageSelect.value
        );

    }
);


// ==========================================
// CREATE MESSAGE
// ==========================================

function addMessage(text, type) {

    if (welcome) {
        welcome.style.display = "none";
    }


    const message =
        document.createElement("div");

    message.className =
        `message ${type}`;


    if (type === "ai") {

        message.innerHTML = `

            <div class="avatar">
                A
            </div>

            <div class="message-content">
                ${text}
            </div>

        `;

    } else {

        message.innerHTML = `

            <div class="message-content">
                ${text}
            </div>

        `;

    }


    chat.appendChild(message);

    chat.scrollTop =
        chat.scrollHeight;
}


// ==========================================
// AI DEMO RESPONSE
// ==========================================

function getDemoResponse(text) {

    const lower =
        text.toLowerCase();


    if (
        lower.includes("python") ||
        lower.includes("пайтон")
    ) {

        if (currentLanguage === "en") {

            return "Python is a programming language known for its simple syntax. I can help you learn it step by step.";

        }

        if (currentLanguage === "kk") {

            return "Python — синтаксисі қарапайым бағдарламалау тілі. Мен оны қадам бойынша үйренуге көмектесе аламын.";

        }

        return "Python — это язык программирования с простым и понятным синтаксисом. Я могу помочь тебе изучить его с нуля и постепенно перейти к созданию настоящих проектов.";

    }


    if (
        lower.includes("сайт") ||
        lower.includes("website")
    ) {

        if (currentLanguage === "en") {

            return "I can help you create a modern website using HTML, CSS and JavaScript.";

        }

        return "Конечно. AMETZ AI может помочь придумать структуру сайта, написать HTML, CSS и JavaScript и постепенно собрать полноценный проект.";

    }


    if (
        lower.includes("привет") ||
        lower.includes("hello") ||
        lower.includes("сәлем")
    ) {

        if (currentLanguage === "kk") {
            return "Сәлем! Мен AMETZ AI. Саған көмектесуге дайынмын. 🤖";
        }

        if (currentLanguage === "en") {
            return "Hello! I'm AMETZ AI. I'm ready to help you. 🤖";
        }

        return "Привет! Я AMETZ AI. Готов помочь тебе с программированием, текстами, идеями, обучением и многим другим. 🤖";

    }


    if (currentLanguage === "en") {

        return "I'm AMETZ AI. This is currently a demo version. The real AI model will be connected through an API.";

    }


    if (currentLanguage === "kk") {

        return "Мен AMETZ AI-мын. Қазір бұл демонстрациялық нұсқа. Кейін нақты AI моделі API арқылы қосылады.";

    }


    return "Я AMETZ AI. Сейчас это демонстрационная версия интерфейса. Следующим этапом мы подключим настоящую AI-модель через API, и я смогу генерировать полноценные ответы на разных языках.";

}


// ==========================================
// SEND
// ==========================================

function sendMessage() {

    const text =
        input.value.trim();


    if (!text) {
        return;
    }


    addMessage(
        text,
        "user"
    );


    input.value = "";

    input.style.height = "auto";


    const typing =
        document.createElement("div");

    typing.className =
        "message ai";

    typing.id =
        "typing";


    typing.innerHTML = `

        <div class="avatar">
            A
        </div>

        <div class="message-content">
            ● ● ●
        </div>

    `;


    chat.appendChild(typing);

    chat.scrollTop =
        chat.scrollHeight;


    setTimeout(() => {

        typing.remove();

        const response =
            getDemoResponse(text);

        addMessage(
            response,
            "ai"
        );

    }, 800);

}


sendButton.addEventListener(
    "click",
    sendMessage
);


// ENTER

input.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


// ==========================================
// AUTO RESIZE TEXTAREA
// ==========================================

input.addEventListener(
    "input",
    () => {

        input.style.height =
            "auto";

        input.style.height =
            Math.min(
                input.scrollHeight,
                180
            ) + "px";

    }
);


// ==========================================
// SUGGESTIONS
// ==========================================

document
    .querySelectorAll(".suggestions button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                input.value =
                    button.dataset.question;

                input.focus();

            }
        );

    });


// ==========================================
// NEW CHAT
// ==========================================

newChat.addEventListener(
    "click",
    () => {

        chat.innerHTML = "";

        chat.appendChild(welcome);

        welcome.style.display =
            "block";

        input.value = "";

        input.focus();

    }
);


// ==========================================
// DARK / LIGHT
// ==========================================

themeButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        if (
            document.body.classList.contains("light")
        ) {

            themeButton.textContent = "🌙";

        } else {

            themeButton.textContent = "☀";

        }

    }
);


// ==========================================
// MOBILE SIDEBAR
// ==========================================

mobileMenu.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);


// ==========================================
// FILE BUTTON
// ==========================================

const attachButton =
    document.getElementById("attachButton");

const fileInput =
    document.getElementById("fileInput");


attachButton.addEventListener(
    "click",
    () => {

        fileInput.click();

    }
);


fileInput.addEventListener(
    "change",
    () => {

        if (fileInput.files.length) {

            addMessage(
                "📎 " +
                fileInput.files[0].name,
                "user"
            );

            setTimeout(() => {

                addMessage(
                    "Файл получен. В полноценной версии AMETZ AI сможет анализировать загруженные документы.",
                    "ai"
                );

            }, 600);

        }

    }
);


// ==========================================
// VOICE DEMO
// ==========================================

const voiceButton =
    document.getElementById("voiceButton");


voiceButton.addEventListener(
    "click",
    () => {

        if (!("webkitSpeechRecognition" in window)) {

            alert(
                "Голосовой ввод не поддерживается этим браузером."
            );

            return;

        }


        const recognition =
            new webkitSpeechRecognition();


        recognition.lang =
            currentLanguage === "kk"
                ? "kk-KZ"
                : currentLanguage === "en"
                    ? "en-US"
                    : "ru-RU";


        recognition.start();


        recognition.onresult =
            event => {

                input.value =
                    event.results[0][0].transcript;

                input.focus();

            };

    }
);


// ==========================================
// START
// ==========================================

setLanguage("ru");