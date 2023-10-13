const { EVENTS } = require('@bot-whatsapp/bot');

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION = 2 * HOUR;
const DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION_WHEN_FINISHED_CONVERSATION =
  5 * MINUTE;
const linkForThirdVariation1 = {
  1: {
    message: 'https://agendalo.io/anna-equipo/equipo-medico',
  },
  2: {
    message: 'https://agendalo.io/anna-equipo/turno-tarde',
  },
  3: {
    message: 'https://agendalo.io/anna-equipo/turno-noche',
  },
};

const linkForThirdVariation2 = {
  1: {
    message: 'https://agendalo.io/anna-equipo/consulta-medica-dr-angello',
  },
  2: {
    message: 'https://agendalo.io/anna-equipo/consulta-medica-dr-angello',
  },
  3: {
    message: 'https://agendalo.io/anna-equipo/consulta-medica-dr-angello',
  },
};

const linkForMedicalAppointments = {
  1: {
    message:
      'Haz clic aquí para agendar tu cita virtual: https://agendalo.io/anna-equipo/equipo-medico',
  },
  2: {
    message:
      'Haz clic aquí para agendar tu cita virtual: https://agendalo.io/anna-equipo/turno-noche',
  },
  3: {
    message:
      'Haz clic aquí para agendar tu cita virtual: https://agendalo.io/anna-equipo/turno-tarde',
  },
};

const linkForExamFromHome = {
  1: {
    message:
      'Listo, para efectuar el pago tenemos YAPE/PLIN con el siguiente número: 992 428 082. El servicio sera en 72 horas',
  },
  2: {
    message:
      'Listo, para efectuar el pago tenemos YAPE/PLIN con el siguiente número: 992 428 082. El servicio sera en 72 horas',
  },
};

const missingDocumentNumberMessage = 'Nos falta tener tu dni 😃';
const missingGenderMessage = 'Nos falta tener tu sexo 😃';

const firstFinalMessageToShow = `Agenda un consulta virtual aqui.`;
const secondFinalMessageToShow =
  'Una vez programada tu cita, nos contactaremos por aquí para que efectúes el pago.';

const noteForOptions = 'Escribe el numero para seleccionar la opcion';
const optionsForTreatmentToShow = [
  noteForOptions,
  '*1. Mañana ☀️*',
  '*2. Tarde 🌥️*',
  '*3. Noche 🌙*',
];

const warningImBot =
  'Recuerda que soy un bot, a continuacion te mostrare un Menú ( si tienes una consulta marca la opción 5 )';

const conversation = {
  welcomeStep: {
    keywords: [EVENTS.WELCOME],
    questions: [
      `¡Hola!`,
      `¡Hola{{name}}! ¿Qué deseas hacer hoy?`,
      `¡Hola! ${warningImBot}`,
      `¡Hola{{name}}! ${warningImBot}`,
    ],
  },
  fullNameStep: {
    keywords: [],
    questions: ['Por favor indícanos tu nombre completo para poder atenderte'],
  },
  documentStep: {
    keywords: ['.'],
    questions: ['Por favor indícanos el número de tu DNI'],
  },
  genderStep: {
    keywords: ['.'],
    questions: [
      'Por favor indícanos tu sexo',
      [noteForOptions, '*1.Masculino 🧑*', '*2.Femenino 👩*'],
    ],
  },

  menuStep: {
    keywords: ['.'],
    questions: [
      [
        '*1. Requiero una cita rápida (Medicina general) ⚡*',
        '*2. Requiero una cita médica especializada en diabetes, pulmonía, azucar alta, hipertensión,etc.🥋*',
        '*3. Examen de domicilio 🏠*',
        '*4. Quiero hacer mi test de salud (Diabetes) 📚*',
        '*5. Deseo hablar con un asesor 🙆*',
        noteForOptions,
      ],
    ],
  },
  scheduleMedicalAppointmentGeneral: {
    keywords: [/^(\.)?[1]{1,1}(\.)?$/],
    questions: [
      `Dime cuál es tu horario ideal`,
      [noteForOptions, '*1. Mañana ☀️*', '*2. Noche 🌙*'],
    ],
  },
  scheduleMedicalAppointmentSpecialist: {
    keywords: [/^(\.)?[2]{1,1}(\.)?$/],
    questions: [
      `De acuerdo {{name}}, para comenzar  con tu cita. Vamos a iniciar con tu examen de sangre a domicilio para que el doctor pueda conocerte mejor.`,
      [`¿Estás de acuerdo? ${noteForOptions}`, '*1. Si ✅*', '*2. No ✅*'],
    ],
  },
  acceptMedicalAppointmentSpecialist: {
    keywords: [/^(\.)?[1]{1,1}(\.)?$/],
    questions: [
      `Excelente elección {{name}} porque el examen de sangre tiene un pequeño costo a domicilio (S/) pero te llevas la consulta completamente gratis. Podrás pagarlo cuando el equipo medico llegue  a tu casa.`,
      'Porfavor comentame tu horario ideal para que el equipo médico pueda atenderte 🤗',
      'Listo 😄. Un asesor se comunicará contigo. Muchas gracias!',
    ],
  },
  scheduleExamFromHome: {
    keywords: [/^(\.)?[3]{1,1}(\.)?$/],
    questions: [
      `Mira las opciones y selecciona tu plan de laboratorio:`,
      [
        noteForOptions,
        '*1. Plan 1 (Precio: 80 soles + Domicilio: 40 soles): ✅*',
        ' - Hemoglobina',
        ' - Glucosa',
        '*2. Plan 2 (Precio: 220 soles + Domicilio: 40 soles): ✅*',
        ' - Orina Completa',
        ' - Hemograma',
        ' - Perfil Lipidico',
        ' - Perfil Hepatico',
        '*3. Plan 3 (Precio: 145 soles + Domicilio: 40 soles): ✅*',
        ' - Prueba de Tolerancia oral a la glucosa',
        ' - Creatina en Sangre',
        ' - Microalbuminuria en orina',
        '*4. ¿No encuentras tu examen? ✅*',
        '*5. Terminar conversacion ✅*',
      ],
    ],
  },
  scheduleExamFromHomeChooseTurn: {
    keywords: [/^(\.)?[1-3]{1,1}(\.)?$/],
    questions: [
      `Dime cuál es tu horario ideal`,
      [noteForOptions, '*1. Mañana ☀️*', '*2. Tarde 🌥️*'],
    ],
  },

  firstSurveyQuestion: {
    keywords: [/^(\.)?[1-2]{1,1}(\.)?$/],
    questions: [
      '1. ¿Cuántos años tiene usted?',
      [
        noteForOptions,
        '*1. Menos de 45 años*',
        '*2. 45 - 54 años*',
        '*3. 55 - 64 años*',
        '*4. Más de 64 años*',
      ],
    ],
    answerPoints: [0, 2, 3, 4],
  },
  secondSurveyQuestion: {
    keywords: [/^(\.)?[1-4]{1,1}(\.)?$/],
    questions: [
      '2. ¿Cuál es tu peso aproximado?',
      [
        noteForOptions,
        '*1. Mas que 70 kg*',
        '*2. Entre 65 a 50 kg*',
        '*3. Menor que 45 kg*',
      ],
    ],
    answerPoints: [3, 1, 2],
  },
  thirdSurveyQuestion: {
    keywords: [/^(\.)?[1-3]{1,1}(\.)?$/],
    questions: [
      '3. ¿Realiza habitualmente al menos 30 minutos de actividad fisica, en el trabajo y/o en el tiempo libre?',
      [noteForOptions, '*1. Si*', '*2. No*'],
    ],
    answerPoints: [0, 1],
  },
  fourthSurveyQuestion: {
    keywords: [/^(\.)?[1-2]{1,1}(\.)?$/],
    questions: [
      '4. ¿Con qué frecuencia come verduras o frutas?',
      [noteForOptions, '*1. Todos los días*', '*2. No todos los días*'],
    ],
    answerPoints: [0, 1],
  },
  fifthSurveyQuestion: {
    keywords: [/^(\.)?[1-2]{1,1}(\.)?$/],
    questions: [
      '5. ¿Toma medicación para la presión alta o padece de Hipertensión Arterial?',
      [noteForOptions, '*1. No*', '*2. Si*'],
    ],
    answerPoints: [0, 2],
  },
  sixthSurveyQuestion: {
    keywords: `^(\.)?[1-2]{1,1}(\.)?$`,
    questions: [
      '6. ¿Le han encotrado alguna vez valores de glucosa altos( por ejemplo, en un control médico o durante una enfermedad o durante el embarazo?',
      [noteForOptions, '*1. No*', '*2. Si*'],
    ],
    answerPoints: [0, 5],
  },
  lastSurveyQuestion: {
    keywords: [/^(\.)?[1-2]{1,1}(\.)?$/],
    questions: [
      '7. ¿Se le ha diagnosticado diabetes (tipo 1 o tipo 2) a alguno de sus familiares o parientes?',
      [
        noteForOptions,
        '*1. No*',
        '*2. Si: abuelos, tía, tío, primo y hermano*',
        '*3. Si: padres, hermanos, hijos*',
      ],
    ],
    answerPoints: [0, 3, 5],
  },
  resultsStepVariation1: {
    keywords: [/^(\.)?[1-3]{1,1}(\.)?$/],
    questions: [
      'Según tu estilo de vida, es probable que tengas un nivel Medio o Alto por ello, te recomendamos que puedas profundizar con un profesional de la salud.',
      'Acá tienes disponibilidad de nuestro staff médico inmediato altamente capacitado.  ¿Qué horarios te interesa?',
      optionsForTreatmentToShow,
    ],
  },
  resultsStepVariation2: {
    keywords: [/^(\.)?[1-3]{1,1}(\.)?$/],
    questions: [
      'Según tu estilo de vida, es probable que tengas un nivel Bajo 😃 por ello, te recomendamos que puedas profundizar con un profesional de la salud.',
      'Acá tienes disponibilidad de nuestro staff médico inmediato altamente capacitado.  ¿Qué horarios te interesa?',
      optionsForTreatmentToShow,
    ],
  },
};

module.exports = {
  conversation,
  missingDocumentNumberMessage,
  missingGenderMessage,
  linkForThirdVariation1,
  linkForThirdVariation2,
  firstFinalMessageToShow,
  secondFinalMessageToShow,
  linkForMedicalAppointments,
  linkForExamFromHome,
  DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION,
  DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION_WHEN_FINISHED_CONVERSATION,
};
