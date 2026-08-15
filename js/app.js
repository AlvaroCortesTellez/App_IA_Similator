/* ============================================================
   ¿LE CREES A LA IA?
   app.js

   Control principal de la experiencia
   ============================================================ */


/* ============================================================
   ESTADO DE LA APLICACIÓN
   ============================================================ */

const appState = {

    currentScreen: "welcome-screen",

    questionNumber: 0,

    totalQuestions: 5,

    currentScenario: null,

    waitingForTrust: false,

    stats: {

        trusted: 0,

        questioned: 0,

        verified: 0,

        trueAnswers: 0,

        partialAnswers: 0,

        falseAnswers: 0

    }

};


/* ============================================================
   ELEMENTOS DEL DOM
   ============================================================ */

const DOM = {

    screens: document.querySelectorAll(".screen"),

    startButton:
        document.getElementById("start-button"),

    revealButton:
        document.getElementById("reveal-button"),

    restartButton:
        document.getElementById("restart-button"),

    chatForm:
        document.getElementById("chat-form"),

    userInput:
        document.getElementById("user-input"),

    sendButton:
        document.getElementById("send-button"),

    chatContainer:
        document.getElementById("chat-container"),

    suggestions:
        document.getElementById("suggestions"),

    typingIndicator:
        document.getElementById("typing-indicator"),

    questionCounter:
        document.getElementById("question-counter"),

    characterCounter:
        document.getElementById("character-counter"),

    totalQuestions:
        document.getElementById("total-questions"),

    trustedAnswers:
        document.getElementById("trusted-answers"),

    doubtfulAnswers:
        document.getElementById("doubtful-answers")

};


/* ============================================================
   INICIALIZACIÓN
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);


function initializeApp() {

    questionManager.init();

    bindEvents();

    updateQuestionCounter();

    updateCharacterCounter();

}


/* ============================================================
   EVENTOS
   ============================================================ */

function bindEvents() {


    /* --------------------------------------------------------
       COMENZAR
       -------------------------------------------------------- */

    if (DOM.startButton) {

        DOM.startButton.addEventListener(
            "click",
            startExperience
        );

    }


    /* --------------------------------------------------------
       FORMULARIO DEL CHAT
       -------------------------------------------------------- */

    if (DOM.chatForm) {

        DOM.chatForm.addEventListener(
            "submit",
            handleSubmit
        );

    }


    /* --------------------------------------------------------
       CONTADOR
       -------------------------------------------------------- */

    if (DOM.userInput) {

        DOM.userInput.addEventListener(
            "input",
            updateCharacterCounter
        );


        DOM.userInput.addEventListener(
            "keydown",
            handleInputKeydown
        );

    }


    /* --------------------------------------------------------
       PREGUNTAS SUGERIDAS
       -------------------------------------------------------- */

    document
        .querySelectorAll(".suggestion-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                handleSuggestion
            );

        });


    /* --------------------------------------------------------
       CONFIABILIDAD
       -------------------------------------------------------- */

    document
        .querySelectorAll(".trust-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                handleTrustSelection
            );

        });


    /* --------------------------------------------------------
       REVELACIÓN
       -------------------------------------------------------- */

    if (DOM.revealButton) {

        DOM.revealButton.addEventListener(
            "click",
            showResults
        );

    }


    /* --------------------------------------------------------
       REINICIAR
       -------------------------------------------------------- */

    if (DOM.restartButton) {

        DOM.restartButton.addEventListener(
            "click",
            restartExperience
        );

    }

}


/* ============================================================
   CAMBIO DE PANTALLA
   ============================================================ */

function showScreen(screenId) {

    DOM.screens.forEach(
        screen => {

            screen.classList.remove(
                "active"
            );

        }
    );


    const target =
        document.getElementById(screenId);


    if (!target) {

        console.error(
            `No existe la pantalla: ${screenId}`
        );

        return;

    }


    target.classList.add("active");


    appState.currentScreen =
        screenId;


    window.scrollTo(
        0,
        0
    );

}


/* ============================================================
   COMENZAR EXPERIENCIA
   ============================================================ */

function startExperience() {

    resetState();

    showScreen("chat-screen");

    setTimeout(
        () => {

            DOM.userInput.focus();

        },
        300
    );

}


/* ============================================================
   REINICIAR ESTADO
   ============================================================ */

function resetState() {

    appState.questionNumber = 0;

    appState.currentScenario = null;

    appState.waitingForTrust = false;


    appState.stats = {

        trusted: 0,

        questioned: 0,

        verified: 0,

        trueAnswers: 0,

        partialAnswers: 0,

        falseAnswers: 0

    };


    questionManager.reset();


    clearDynamicMessages();


    updateQuestionCounter();

}


/* ============================================================
   LIMPIAR MENSAJES DINÁMICOS
   ============================================================ */

function clearDynamicMessages() {

    document
        .querySelectorAll(
            ".dynamic-message"
        )
        .forEach(
            element =>
                element.remove()
        );


    if (DOM.suggestions) {

        DOM.suggestions.style.display =
            "block";

    }

}


/* ============================================================
   ENVÍO DEL FORMULARIO
   ============================================================ */

function handleSubmit(event) {

    event.preventDefault();


    if (appState.waitingForTrust) {

        return;

    }


    const question =
        DOM.userInput.value.trim();


    if (!question) {

        return;

    }


    processQuestion(question);

}


/* ============================================================
   TECLA ENTER
   ============================================================ */

function handleInputKeydown(event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        DOM.chatForm.requestSubmit();

    }

}


/* ============================================================
   PREGUNTA SUGERIDA
   ============================================================ */

function handleSuggestion(event) {

    if (appState.waitingForTrust) {

        return;

    }


    const category =
        event.currentTarget.dataset.category;


    const question =
        getSuggestedQuestion(
            category
        );


    if (!question) {

        return;

    }


    DOM.userInput.value =
        question;


    updateCharacterCounter();


    processQuestion(question);

}


/* ============================================================
   PROCESAR PREGUNTA
   ============================================================ */

function processQuestion(question) {

    if (
        appState.questionNumber >=
        appState.totalQuestions
    ) {

        return;

    }


    /* Ocultar sugerencias después de comenzar */

    if (DOM.suggestions) {

        DOM.suggestions.style.display =
            "none";

    }


    /* --------------------------------------------------------
       Mostrar mensaje del usuario
       -------------------------------------------------------- */

    addUserMessage(question);


    /* --------------------------------------------------------
       Limpiar input
       -------------------------------------------------------- */

    DOM.userInput.value = "";

    updateCharacterCounter();


    /* --------------------------------------------------------
       Incrementar contador
       -------------------------------------------------------- */

    appState.questionNumber++;

    updateQuestionCounter();


    /* --------------------------------------------------------
       Buscar escenario
       -------------------------------------------------------- */

    const scenario =
        findScenarioForQuestion(
            question
        );


    if (!scenario) {

        generateFallbackResponse();

        return;

    }


    appState.currentScenario =
        scenario;


    /* --------------------------------------------------------
       Mostrar indicador de IA
       -------------------------------------------------------- */

    showTyping();


    /* --------------------------------------------------------
       Simular procesamiento
       -------------------------------------------------------- */

    const delay =
        calculateResponseDelay(
            scenario.response
        );


    setTimeout(
        () => {

            hideTyping();

            showAIResponse(
                scenario
            );

        },
        delay
    );

}


/* ============================================================
   RETRASO DE RESPUESTA
   ============================================================ */

function calculateResponseDelay(response) {

    const textLength =
        response
            .replace(/<[^>]*>/g, "")
            .length;


    const base = 900;

    const additional =
        Math.min(
            textLength * 8,
            2600
        );


    const variation =
        Math.floor(
            Math.random() * 500
        );


    return (
        base +
        additional +
        variation
    );

}


/* ============================================================
   MOSTRAR MENSAJE DEL USUARIO
   ============================================================ */

function addUserMessage(text) {

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "user-message-wrapper dynamic-message";


    const message =
        document.createElement("div");


    message.className =
        "user-message";


    message.textContent =
        text;


    wrapper.appendChild(
        message
    );


    DOM.chatContainer.appendChild(
        wrapper
    );


    scrollChatToBottom();

}


/* ============================================================
   MOSTRAR RESPUESTA DE IA
   ============================================================ */

function showAIResponse(scenario) {

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "ai-response-wrapper dynamic-message";


    const avatar =
        document.createElement("div");


    avatar.className =
        "bot-avatar";


    avatar.textContent =
        "AI";


    const response =
        document.createElement("div");


    response.className =
        "ai-response";


    response.innerHTML =
        scenario.response;


    wrapper.appendChild(
        avatar
    );


    wrapper.appendChild(
        response
    );


    DOM.chatContainer.appendChild(
        wrapper
    );


    scrollChatToBottom();


    /*
       Registrar tipo de respuesta.
    */

    registerTruthType(
        scenario.truth
    );


    /*
       Después de mostrar la respuesta,
       preguntamos al usuario qué tan
       confiable le parece.
    */

    setTimeout(
        () => {

            showTrustQuestion();

        },
        700
    );

}


/* ============================================================
   RESPUESTA DE EMERGENCIA
   ============================================================ */

function generateFallbackResponse() {

    hideTyping();


    const wrapper =
        document.createElement("div");


    wrapper.className =
        "ai-response-wrapper dynamic-message";


    const avatar =
        document.createElement("div");


    avatar.className =
        "bot-avatar";


    avatar.textContent =
        "AI";


    const response =
        document.createElement("div");


    response.className =
        "ai-response";


    response.innerHTML = `
        <p>
            Es una pregunta interesante.
        </p>

        <p>
            No tengo suficiente información para ofrecer
            una respuesta completamente confiable.
        </p>

        <p>
            Te recomiendo consultar fuentes especializadas
            y contrastar la información antes de tomar una
            decisión.
        </p>
    `;


    wrapper.appendChild(
        avatar
    );

    wrapper.appendChild(
        response
    );


    DOM.chatContainer.appendChild(
        wrapper
    );


    appState.currentScenario = {

        truth: "true",

        explanation:
            "La respuesta reconoce sus límites en lugar de inventar información."

    };


    scrollChatToBottom();


    setTimeout(
        showTrustQuestion,
        600
    );

}


/* ============================================================
   REGISTRAR TIPO DE RESPUESTA
   ============================================================ */

function registerTruthType(truth) {

    if (truth === "true") {

        appState.stats.trueAnswers++;

    }


    if (truth === "partial") {

        appState.stats.partialAnswers++;

    }


    if (truth === "false") {

        appState.stats.falseAnswers++;

    }

}


/* ============================================================
   INDICADOR DE ESCRITURA
   ============================================================ */

function showTyping() {

    if (!DOM.typingIndicator) {

        return;

    }


    DOM.typingIndicator
        .classList
        .remove("hidden");

}


function hideTyping() {

    if (!DOM.typingIndicator) {

        return;

    }


    DOM.typingIndicator
        .classList
        .add("hidden");

}


/* ============================================================
   PREGUNTA DE CONFIABILIDAD
   ============================================================ */

function showTrustQuestion() {

    if (
        appState.currentScreen !==
        "chat-screen"
    ) {

        return;

    }


    appState.waitingForTrust =
        true;


    showScreen(
        "trust-screen"
    );

}


/* ============================================================
   SELECCIÓN DE CONFIANZA
   ============================================================ */

function handleTrustSelection(event) {

    const trust =
        event.currentTarget
            .dataset
            .trust;


    registerTrustDecision(
        trust
    );


    const scenario =
        appState.currentScenario;


    if (scenario) {

        showFeedback(
            trust,
            scenario
        );

    }


    setTimeout(
        continueAfterTrust,
        1200
    );

}


/* ============================================================
   REGISTRAR DECISIÓN
   ============================================================ */

function registerTrustDecision(trust) {

    switch (trust) {

        case "high":

            appState.stats.trusted++;

            break;


        case "medium":

            appState.stats.questioned++;

            break;


        case "low":

            appState.stats.verified++;

            break;

    }

}


/* ============================================================
   RETROALIMENTACIÓN
   ============================================================ */

function showFeedback(
    trust,
    scenario
) {

    let message = "";


    /*
       No revelamos todavía si la respuesta
       era verdadera o falsa.

       Esto es deliberado.
    */

    if (trust === "high") {

        message =
            "Has decidido confiar en la respuesta.";

    }


    if (trust === "medium") {

        message =
            "Has decidido mantener cierta cautela.";

    }


    if (trust === "low") {

        message =
            "Has decidido que sería necesario verificar.";

    }


    console.log(
        "Decisión:",
        trust
    );


    console.log(
        "Escenario:",
        scenario.id
    );


    /*
       La retroalimentación visual completa
       se mostrará después de la revelación.
    */

}


/* ============================================================
   CONTINUAR DESPUÉS DE LA DECISIÓN
   ============================================================ */

function continueAfterTrust() {

    appState.waitingForTrust =
        false;


    /*
       Si ya completó las preguntas,
       pasamos a la revelación.
    */

    if (
        appState.questionNumber >=
        appState.totalQuestions
    ) {

        showReveal();

        return;

    }


    /*
       Continuar conversación.
    */

    showScreen(
        "chat-screen"
    );


    setTimeout(
        () => {

            DOM.userInput.focus();

        },
        200
    );

}


/* ============================================================
   REVELACIÓN
   ============================================================ */

function showReveal() {

    hideTyping();

    showScreen(
        "reveal-screen"
    );

}


/* ============================================================
   RESULTADOS
   ============================================================ */

function showResults() {

    updateResults();

    showScreen(
        "results-screen"
    );

}


/* ============================================================
   ACTUALIZAR RESULTADOS
   ============================================================ */

function updateResults() {

    if (DOM.totalQuestions) {

        DOM.totalQuestions.textContent =
            appState.questionNumber;

    }


    if (DOM.trustedAnswers) {

        DOM.trustedAnswers.textContent =
            appState.stats.trusted;

    }


    if (DOM.doubtfulAnswers) {

        DOM.doubtfulAnswers.textContent =
            (
                appState.stats.questioned +
                appState.stats.verified
            );

    }

}


/* ============================================================
   CONTADOR DE PREGUNTAS
   ============================================================ */

function updateQuestionCounter() {

    if (!DOM.questionCounter) {

        return;

    }


    DOM.questionCounter.textContent =

        `${appState.questionNumber} / ${appState.totalQuestions}`;

}


/* ============================================================
   CONTADOR DE CARACTERES
   ============================================================ */

function updateCharacterCounter() {

    if (
        !DOM.userInput ||
        !DOM.characterCounter
    ) {

        return;

    }


    const length =
        DOM.userInput.value.length;


    DOM.characterCounter.textContent =

        `${length} / 500`;

}


/* ============================================================
   SCROLL DEL CHAT
   ============================================================ */

function scrollChatToBottom() {

    setTimeout(
        () => {

            window.scrollTo({

                top:
                    document.body.scrollHeight,

                behavior:
                    "smooth"

            });

        },
        50
    );

}


/* ============================================================
   REINICIAR EXPERIENCIA
   ============================================================ */

function restartExperience() {

    resetState();

    showScreen(
        "welcome-screen"
    );

}


/* ============================================================
   EXPONER ESTADO PARA DEPURACIÓN
   ============================================================ */

window.AppState =
    appState;