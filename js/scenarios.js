/* ============================================================
   ¿LE CREES A LA IA?
   Escenarios educativos
   ============================================================ */

const scenarios = [

    /* ========================================================
       CIENCIA
    ======================================================== */

    {
        id: 1,

        category: "ciencia",

        question:
            "¿Es verdad que escuchar música clásica aumenta la inteligencia?",

        response: `
            <p>
                La relación entre música clásica y rendimiento
                cognitivo ha sido estudiada durante décadas.
            </p>

            <p>
                Algunos experimentos han encontrado mejoras
                temporales en determinadas tareas después de
                escuchar música, especialmente música clásica.
            </p>

            <p>
                Por eso, puede decirse que escuchar música clásica
                puede aumentar temporalmente determinadas
                capacidades cognitivas.
            </p>
        `,

        truth: "partial",

        explanation: `
            La respuesta parece científica, pero simplifica
            demasiado la evidencia. Los estudios no permiten
            afirmar que escuchar música clásica haga a una
            persona más inteligente de manera general o
            permanente.
        `,

        lesson:
            "Una respuesta puede utilizar lenguaje científico y aun así exagerar lo que realmente demuestra la evidencia.",

        sourceHint:
            "La investigación sobre el llamado 'efecto Mozart' no demuestra un aumento permanente de la inteligencia."
    },


    /* ========================================================
       HISTORIA
    ======================================================== */

    {
        id: 2,

        category: "historia",

        question:
            "¿Quién inventó Internet?",

        response: `
            <p>
                Internet fue inventado principalmente por
                <strong>Tim Berners-Lee</strong> a finales de
                la década de 1980.
            </p>

            <p>
                Berners-Lee desarrolló el sistema que permitió
                conectar documentos mediante enlaces y creó
                tecnologías fundamentales como HTML y HTTP.
            </p>

            <p>
                Su trabajo dio origen a la Internet que utilizamos
                actualmente.
            </p>
        `,

        truth: "false",

        explanation: `
            Aquí hay un error importante: Tim Berners-Lee no
            inventó Internet. Él creó la World Wide Web.
            Internet y la Web son conceptos diferentes.
        `,

        lesson:
            "Una IA puede confundir dos conceptos relacionados y construir una explicación completamente convincente alrededor del error.",

        sourceHint:
            "La Internet surgió de décadas de investigación y desarrollo de diferentes tecnologías y organizaciones. Berners-Lee creó la World Wide Web."
    },


    /* ========================================================
       TECNOLOGÍA
    ======================================================== */

    {
        id: 3,

        category: "tecnologia",

        question:
            "¿La inteligencia artificial puede reemplazar completamente a los programadores?",

        response: `
            <p>
                Sí. Los sistemas modernos de inteligencia artificial
                pueden generar código, detectar errores, crear
                aplicaciones y realizar tareas que anteriormente
                requerían programadores.
            </p>

            <p>
                Debido al rápido avance de estas herramientas,
                es posible que en el futuro la mayoría del desarrollo
                de software pueda realizarse automáticamente.
            </p>

            <p>
                Por esta razón, el papel tradicional del programador
                podría desaparecer progresivamente.
            </p>
        `,

        truth: "false",

        explanation: `
            La respuesta presenta una predicción como si fuera
            una conclusión inevitable. La IA puede automatizar
            muchas tareas de programación, pero eso no demuestra
            que los programadores vayan a desaparecer.
        `,

        lesson:
            "Las predicciones sobre el futuro no deben presentarse como hechos comprobados.",

        sourceHint:
            "La automatización puede transformar profesiones sin necesariamente eliminar todas las funciones humanas."
    },


    /* ========================================================
       EDUCACIÓN
    ======================================================== */

    {
        id: 4,

        category: "educacion",

        question:
            "¿Usar inteligencia artificial para hacer una tarea es hacer trampa?",

        response: `
            <p>
                Sí. Utilizar inteligencia artificial para realizar
                una tarea académica significa que la persona no
                hizo realmente el trabajo y, por lo tanto,
                constituye una forma de trampa.
            </p>

            <p>
                En consecuencia, los estudiantes deberían evitar
                utilizar herramientas de inteligencia artificial
                en cualquier actividad académica.
            </p>
        `,

        truth: "false",

        explanation: `
            La respuesta es demasiado absoluta. El uso de IA
            depende de las reglas de cada actividad, institución
            y docente. Puede existir un uso legítimo de IA para
            investigar, generar ideas, recibir retroalimentación
            o aprender.
        `,

        lesson:
            "La IA no es automáticamente buena ni mala. El contexto, la intención y las reglas de uso son fundamentales.",

        sourceHint:
            "El uso académico de IA debe ajustarse a las políticas de la institución y a las instrucciones de cada actividad."
    },


    /* ========================================================
       INTELIGENCIA ARTIFICIAL
    ======================================================== */

    {
        id: 5,

        category: "ia",

        question:
            "¿Una inteligencia artificial sabe cuándo está diciendo una mentira?",

        response: `
            <p>
                En general, sí. Los sistemas modernos de IA
                utilizan mecanismos de evaluación que les permiten
                identificar cuándo una respuesta es probablemente
                incorrecta.
            </p>

            <p>
                Además, los modelos pueden analizar la coherencia
                de sus propias respuestas antes de presentarlas
                al usuario.
            </p>

            <p>
                Por eso, cuando una IA responde con seguridad,
                normalmente existe un alto nivel de confianza
                en la información proporcionada.
            </p>
        `,

        truth: "false",

        explanation: `
            Esta es una de las trampas principales del experimento.
            Una IA generativa puede producir una respuesta falsa
            sin tener una intención consciente de mentir.
        `,

        lesson:
            "Una IA generativa no funciona como una persona que decide conscientemente decir la verdad o mentir.",

        sourceHint:
            "La seguridad con la que está redactada una respuesta no constituye una garantía de veracidad."
    },


    /* ========================================================
       CIENCIA / SALUD
       ======================================================== */

    {
        id: 6,

        category: "ciencia",

        question:
            "¿Beber ocho vasos de agua al día es obligatorio para todas las personas?",

        response: `
            <p>
                Sí. La recomendación general es que todas las
                personas deben beber exactamente ocho vasos de
                agua diariamente para mantenerse correctamente
                hidratadas.
            </p>

            <p>
                Esta cantidad garantiza que el organismo pueda
                realizar adecuadamente sus funciones y evita
                problemas relacionados con la deshidratación.
            </p>
        `,

        truth: "false",

        explanation: `
            No existe una cantidad única de agua que sea obligatoria
            para todas las personas. Las necesidades de hidratación
            dependen de factores como alimentación, actividad física,
            clima, edad y condiciones individuales.
        `,

        lesson:
            "Las reglas simples y fáciles de recordar pueden ser atractivas, pero no siempre representan toda la realidad.",

        sourceHint:
            "Las necesidades de líquidos varían entre personas y también pueden incluir agua obtenida de los alimentos y otras bebidas."
    },


    /* ========================================================
       IA / INFORMACIÓN
    ======================================================== */

    {
        id: 7,

        category: "ia",

        question:
            "¿Si una IA proporciona una referencia bibliográfica, significa que la fuente existe?",

        response: `
            <p>
                Generalmente sí. Cuando una inteligencia artificial
                genera una referencia bibliográfica con autor,
                título, año y editorial, esos datos suelen proceder
                de información existente en sus datos de entrenamiento.
            </p>

            <p>
                Por esta razón, una referencia presentada con todos
                sus datos puede considerarse suficientemente confiable
                para una investigación inicial.
            </p>
        `,

        truth: "false",

        explanation: `
            Una referencia puede parecer completamente real y,
            sin embargo, contener errores o incluso haber sido
            inventada por el modelo.
        `,

        lesson:
            "Nunca debes asumir que una referencia generada por IA existe simplemente porque tiene formato académico.",

        sourceHint:
            "Las referencias importantes deben comprobarse directamente en catálogos, bases de datos, bibliotecas o sitios oficiales."
    },


    /* ========================================================
       PRIVACIDAD
    ======================================================== */

    {
        id: 8,

        category: "ia",

        question:
            "¿Puedo compartir información personal con una IA si solo la utilizo para hacer una consulta?",

        response: `
            <p>
                Sí. Si la información se utiliza únicamente para
                contextualizar una pregunta, compartir datos
                personales puede ayudar a la IA a generar una
                respuesta más precisa.
            </p>

            <p>
                Por ejemplo, proporcionar nombre completo, número
                de identificación, dirección o información laboral
                puede mejorar la personalización de determinadas
                respuestas.
            </p>
        `,

        truth: "false",

        explanation: `
            Esta respuesta es deliberadamente peligrosa.
            No debemos compartir información personal o sensible
            sin comprender cómo será utilizada, almacenada o
            procesada.
        `,

        lesson:
            "Antes de introducir información personal en una herramienta de IA, piensa si realmente es necesaria.",

        sourceHint:
            "El principio de minimización de datos recomienda proporcionar únicamente la información necesaria para una finalidad determinada."
    },


    /* ========================================================
       PENSAMIENTO CRÍTICO
    ======================================================== */

    {
        id: 9,

        category: "ia",

        question:
            "¿Una respuesta larga y detallada es más confiable que una respuesta corta?",

        response: `
            <p>
                Generalmente sí. Una respuesta que contiene
                explicaciones detalladas, ejemplos y referencias
                suele indicar que el sistema tiene mayor cantidad
                de información sobre el tema.
            </p>

            <p>
                Por eso, cuando una IA ofrece una explicación
                extensa y estructurada, podemos considerarla
                normalmente más confiable.
            </p>
        `,

        truth: "false",

        explanation: `
            La extensión de una respuesta no demuestra su
            veracidad. Una IA puede producir una explicación
            extensa, coherente y completamente equivocada.
        `,

        lesson:
            "La apariencia de profundidad no equivale a precisión.",

        sourceHint:
            "La información debe evaluarse por su evidencia y fuentes, no por la cantidad de texto."
    },


    /* ========================================================
       SESGO
    ======================================================== */

    {
        id: 10,

        category: "ia",

        question:
            "¿Las inteligencias artificiales son completamente neutrales?",

        response: `
            <p>
                Sí. Como las inteligencias artificiales funcionan
                mediante algoritmos matemáticos, sus respuestas
                son objetivas y no están influenciadas por
                opiniones personales.
            </p>

            <p>
                Esto significa que una IA puede analizar información
                de manera más neutral que una persona.
            </p>
        `,

        truth: "false",

        explanation: `
            Las IA pueden reproducir sesgos presentes en los datos
            con los que fueron desarrolladas, en los procesos de
            entrenamiento, en las decisiones de diseño y en la
            información disponible.
        `,

        lesson:
            "Que una respuesta sea generada por una máquina no significa que esté libre de sesgos.",

        sourceHint:
            "Los sistemas de IA pueden reflejar o amplificar patrones y sesgos presentes en sus datos y procesos de desarrollo."
    },


    /* ========================================================
       CASO CORRECTO
    ======================================================== */

    {
        id: 11,

        category: "ia",

        question:
            "¿Es recomendable verificar una información importante generada por IA?",

        response: `
            <p>
                Sí.
            </p>

            <p>
                Cuando una respuesta puede afectar una decisión
                importante, es recomendable contrastarla con
                fuentes confiables y, cuando corresponda, consultar
                a una persona profesional o una fuente especializada.
            </p>

            <p>
                La IA puede ser una herramienta útil para orientarse,
                pero no debería ser la única fuente para decisiones
                de alto impacto.
            </p>
        `,

        truth: "true",

        explanation: `
            Esta vez la respuesta sí coincide con el principio
            que queremos desarrollar: utilizar IA implica mantener
            una actitud crítica y verificar información relevante.
        `,

        lesson:
            "La IA puede ayudarte a encontrar información, pero verificar es parte del uso responsable.",

        sourceHint:
            "La importancia de verificar aumenta cuando la información puede tener consecuencias académicas, profesionales, económicas o personales."
    },


    /* ========================================================
       CASO CORRECTO 2
    ======================================================== */

    {
        id: 12,

        category: "ia",

        question:
            "¿La inteligencia artificial puede cometer errores aunque responda con seguridad?",

        response: `
            <p>
                Sí.
            </p>

            <p>
                Un sistema de IA generativa puede producir
                información incorrecta, incompleta o inventada
                y expresarla de manera aparentemente segura.
            </p>

            <p>
                Por eso, la confianza del tono de una respuesta
                no debe confundirse con la certeza de que la
                información sea verdadera.
            </p>
        `,

        truth: "true",

        explanation: `
            Esta respuesta es correcta. Precisamente esta es una
            de las ideas centrales de la experiencia.
        `,

        lesson:
            "La seguridad del lenguaje no es una prueba de verdad.",

        sourceHint:
            "La evaluación crítica y la verificación externa siguen siendo importantes al utilizar IA generativa."
    }

];