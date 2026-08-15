/* ============================================================
   ¿LE CREES A LA IA?
   questions.js

   Gestión de preguntas y escenarios
   ============================================================ */


/* ============================================================
   CONFIGURACIÓN
   ============================================================ */

const QUESTION_CONFIG = {

    /* Cantidad de preguntas antes de la revelación */
    totalQuestions: 5,

    /* Evita repetir inmediatamente el mismo escenario */
    avoidImmediateRepeat: true

};


/* ============================================================
   ESTADO DEL SISTEMA DE PREGUNTAS
   ============================================================ */

const questionManager = {

    available: [],

    used: [],

    current: null,

    /* --------------------------------------------------------
       Inicializar
       -------------------------------------------------------- */

    init() {

        this.available = [...scenarios];

        this.used = [];

        this.current = null;

        this.shuffle(this.available);

    },


    /* --------------------------------------------------------
       Mezclar array
       Algoritmo Fisher-Yates
       -------------------------------------------------------- */

    shuffle(array) {

        for (
            let i = array.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );

            [
                array[i],
                array[j]
            ] =
            [
                array[j],
                array[i]
            ];

        }

        return array;

    },


    /* --------------------------------------------------------
       Obtener escenario aleatorio
       -------------------------------------------------------- */

    getNext() {

        if (this.available.length === 0) {

            this.available = scenarios.filter(
                scenario =>
                    !this.used.some(
                        used =>
                            used.id === scenario.id
                    )
            );

            this.shuffle(this.available);

        }


        let scenario =
            this.available.shift();


        /* Evitar repetir el anterior */

        if (
            QUESTION_CONFIG.avoidImmediateRepeat &&
            this.current &&
            scenario &&
            scenario.id === this.current.id &&
            this.available.length > 0
        ) {

            const alternative =
                this.available.shift();

            this.available.push(scenario);

            scenario = alternative;

        }


        if (scenario) {

            this.current = scenario;

            this.used.push(scenario);

        }


        return scenario;

    },


    /* --------------------------------------------------------
       Buscar por categoría
       -------------------------------------------------------- */

    getByCategory(category) {

        const categoryScenarios =
            scenarios.filter(
                scenario =>
                    scenario.category === category
            );


        if (
            categoryScenarios.length === 0
        ) {

            return this.getNext();

        }


        const unused =
            categoryScenarios.filter(
                scenario =>
                    !this.used.some(
                        used =>
                            used.id === scenario.id
                    )
            );


        const pool =
            unused.length > 0
                ? unused
                : categoryScenarios;


        const index =
            Math.floor(
                Math.random() * pool.length
            );


        const scenario =
            pool[index];


        this.current = scenario;

        this.used.push(scenario);


        this.available =
            this.available.filter(
                item =>
                    item.id !== scenario.id
            );


        return scenario;

    },


    /* --------------------------------------------------------
       Buscar escenario por ID
       -------------------------------------------------------- */

    getById(id) {

        return scenarios.find(
            scenario =>
                scenario.id === Number(id)
        );

    },


    /* --------------------------------------------------------
       Cantidad utilizada
       -------------------------------------------------------- */

    getUsedCount() {

        return this.used.length;

    },


    /* --------------------------------------------------------
       Comprobar si terminó la experiencia
       -------------------------------------------------------- */

    hasFinished() {

        return (
            this.used.length >=
            QUESTION_CONFIG.totalQuestions
        );

    },


    /* --------------------------------------------------------
       Reiniciar
       -------------------------------------------------------- */

    reset() {

        this.available = [...scenarios];

        this.used = [];

        this.current = null;

        this.shuffle(this.available);

    }

};


/* ============================================================
   BANCO DE PREGUNTAS SUGERIDAS
   ============================================================ */

const suggestedQuestions = {

    ciencia: {

        label: "Ciencia",

        icon: "🧠",

        questions: [

            "¿Es verdad que escuchar música clásica aumenta la inteligencia?",

            "¿Beber ocho vasos de agua al día es obligatorio para todas las personas?"

        ]

    },


    historia: {

        label: "Historia",

        icon: "📚",

        questions: [

            "¿Quién inventó Internet?"

        ]

    },


    tecnologia: {

        label: "Tecnología",

        icon: "💻",

        questions: [

            "¿La inteligencia artificial puede reemplazar completamente a los programadores?"

        ]

    },


    educacion: {

        label: "Educación",

        icon: "🎓",

        questions: [

            "¿Usar inteligencia artificial para hacer una tarea es hacer trampa?"

        ]

    },


    ia: {

        label: "Inteligencia artificial",

        icon: "🤖",

        questions: [

            "¿Una inteligencia artificial sabe cuándo está diciendo una mentira?",

            "¿Si una IA proporciona una referencia bibliográfica, significa que la fuente existe?",

            "¿Puedo compartir información personal con una IA si solo la utilizo para hacer una consulta?",

            "¿Las inteligencias artificiales son completamente neutrales?",

            "¿La inteligencia artificial puede cometer errores aunque responda con seguridad?",

            "¿Es recomendable verificar una información importante generada por IA?"

        ]

    }

};


/* ============================================================
   GENERAR PREGUNTA ALEATORIA PARA UNA CATEGORÍA
   ============================================================ */

function getSuggestedQuestion(category) {

    const group =
        suggestedQuestions[category];


    if (!group) {

        return null;

    }


    const index =
        Math.floor(
            Math.random() *
            group.questions.length
        );


    return group.questions[index];

}


/* ============================================================
   IDENTIFICAR CATEGORÍA A PARTIR DE LA PREGUNTA
   ============================================================ */

function detectCategory(question) {

    const text =
        question
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            );


    const categories = {

        ciencia: [
            "ciencia",
            "cientifico",
            "cerebro",
            "memoria",
            "agua",
            "salud",
            "medicina",
            "musica",
            "inteligencia"
        ],

        historia: [
            "historia",
            "historico",
            "internet",
            "inventor",
            "guerra",
            "presidente",
            "revolucion"
        ],

        tecnologia: [
            "tecnologia",
            "programador",
            "programacion",
            "codigo",
            "software",
            "computador",
            "robot"
        ],

        educacion: [
            "educacion",
            "educativo",
            "estudiante",
            "tarea",
            "profesor",
            "aprendiz",
            "escuela",
            "universidad"
        ],

        ia: [
            "ia",
            "inteligencia artificial",
            "chatgpt",
            "algoritmo",
            "modelo",
            "prompt",
            "datos",
            "privacidad",
            "sesgo",
            "referencia"
        ]

    };


    for (
        const category in categories
    ) {

        const keywords =
            categories[category];


        const found =
            keywords.some(
                keyword =>
                    text.includes(keyword)
            );


        if (found) {

            return category;

        }

    }


    return "ia";

}


/* ============================================================
   BUSCAR ESCENARIO ADECUADO PARA UNA PREGUNTA
   ============================================================ */

function findScenarioForQuestion(question) {

    if (!question) {

        return null;

    }


    const normalizedQuestion =
        question
            .toLowerCase()
            .trim();


    /*
       Primero buscamos coincidencia directa.
    */

    const exactMatch =
        scenarios.find(
            scenario =>
                scenario.question
                    .toLowerCase()
                    .trim() ===
                normalizedQuestion
        );


    if (exactMatch) {

        return exactMatch;

    }


    /*
       Después intentamos identificar
       la categoría.
    */

    const category =
        detectCategory(question);


    /*
       Buscamos escenarios todavía no utilizados.
    */

    const unused =
        scenarios.filter(
            scenario =>
                scenario.category === category &&
                !questionManager.used.some(
                    used =>
                        used.id === scenario.id
                )
        );


    if (unused.length > 0) {

        const index =
            Math.floor(
                Math.random() *
                unused.length
            );

        return unused[index];

    }


    /*
       Si ya no hay escenarios de esa categoría,
       utilizamos uno nuevo cualquiera.
    */

    return questionManager.getNext();

}


/* ============================================================
   OBTENER PREGUNTA PARA UNA CATEGORÍA
   ============================================================ */

function getQuestionForCategory(category) {

    const scenario =
        questionManager.getByCategory(
            category
        );


    if (!scenario) {

        return null;

    }


    return scenario;

}


/* ============================================================
   EXPORTACIÓN GLOBAL
   ============================================================ */

window.QuestionManager =
    questionManager;

window.SuggestedQuestions =
    suggestedQuestions;

window.getSuggestedQuestion =
    getSuggestedQuestion;

window.detectCategory =
    detectCategory;

window.findScenarioForQuestion =
    findScenarioForQuestion;

window.getQuestionForCategory =
    getQuestionForCategory;