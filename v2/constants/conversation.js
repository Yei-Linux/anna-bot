const { EVENTS } = require('@bot-whatsapp/bot');

const conversation = {
  welcomeStep: {
    keywords: [EVENTS.WELCOME],
    questions: [
      `Bienvenido a Anna.😄`,
      `¡Bienvenido de vuelta{{name}}¡😄 Soy Anna, tu asistente medico.`,
    ],
  },
  fullNameStep: {
    keywords: [],
    questions: ['Me podrías brindar tu nombre para poder ayudarte? '],
  },
  genderStep: {
    keywords: ['.'],
    questions: ['¿Cuál es tu género?'],
    buttons: [{ body: 'Masculino 🧑' }, { body: 'Femenino 👩' }],
  },
  emailStep: {
    keywords: ['Masculino 🧑', 'Femenino 👩'],
    questions: ['¿Cuál es tu correo electrónico?'],
  },

  servicesMenuStep: {
    keywords: ['.'],
    questions: [
      'Por favor, selecciona el servicio que necesitas de las opciones 😄',
    ],
    list: {
      headerText: '',
      bodyText: 'Estos son algunos de los servicios que tenemos para ti',
      footerText: '',
      buttonList: 'Nuestros servicios',
      listParams: [
        {
          title: 'Nuestros servicios',
          rows: [
            {
              id: 'ID_1',
              title: 'Consulta al especialista',
              description:
                'Habla con un especialista entendiendo tus problemas y síntomas',
            },
            {
              id: 'ID_2',
              title: 'Mi examen de laboratorio',
              description:
                'Podrás hablar con un personal para que pueda ayudarte en la reserva',
            },
          ],
        },
      ],
    },
  },

  complaintsListStep: {
    keywords: ['ID_1'],
    questions: ['Por favor, Selecciona tus síntomas de las opciones 😄'],
    list: {
      headerText: '',
      bodyText: 'Cuéntanos, ¿Cómo te sientes?',
      footerText: '',
      buttonList: 'Lista de Síntomas',
      listParams: [
        {
          title: 'Lista de Síntomas',
          rows: [
            {
              id: 'ID_1',
              title: 'Resfriado o alergia',
              description: 'Te atenderá un MEDICO GENERAL',
            },
            {
              id: 'ID_2',
              title: 'Tos persistente',
              description: 'Te atenderá un NEUMÓLOGO',
            },
            {
              id: 'ID_3',
              title: 'Asma,Neumonía,EPOC',
              description: 'Te atenderá un NEUMÓLOGO',
            },
            {
              id: 'ID_4',
              title: 'Me duele la cabeza',
              description: 'Te atenderá un NEURÓLOGO',
            },
            {
              id: 'ID_5',
              title: 'Me duele el estómago',
              description: 'Te atenderá un GASTROENTEROLOGO',
            },
            {
              id: 'ID_6',
              title: 'Afección en la piel',
              description: 'Te atenderá un DERMATÓLOGO',
            },
            {
              id: 'ID_7',
              title: 'Diabetes-Hipertiroidismo',
              description: 'Te atenderá un ENDOCRINÓLOGO',
            },
            {
              id: 'ID_8',
              title: 'Chequeo médico',
              description: 'Es importante realizarte un chequeo para tu salud',
            },
            {
              id: 'ID_9',
              title: 'Quiero un Nutricionista',
              description: 'Es imporante un abordaje nutricional para tu salud',
            },
            {
              id: 'ID_10',
              title: 'Quiero un psicólogo',
              description: 'Es imporante un abordaje psicologico para tu salud',
            },
          ],
        },
      ],
    },
  },
  appointmentTurnStep: {
    keywords: [
      'ID_1',
      'ID_2',
      'ID_3',
      'ID_4',
      'ID_5',
      'ID_6',
      'ID_7',
      'ID_8',
      'ID_9',
      'ID_10',
      'ID_11',
    ],
    questions: [
      'No te preocupes estamos para ayudarte. Un médico especialista te atenderá.',
      'Selecciona el horario que deseas atenderte 😄',
    ],
    buttons: [{ body: 'Mañana' }, { body: 'Tarde' }, { body: 'Noche' }],
  },

  appointmentDayStep: {
    keywords: ['Mañana', 'Tarde', 'Noche'],
    questions: ['Por favor, selecciona el dia que tengas disponible 😄'],
    list: {
      headerText: '',
      bodyText: '¿Que día tienes disponible?',
      footerText: '',
      buttonList: 'Selecciona el día',
      listParams: [
        {
          title: 'Selecciona el día',
          rows: [
            {
              id: 'ID_1',
              title: 'Lunes',
              description: '',
            },
            {
              id: 'ID_2',
              title: 'Martes',
              description: '',
            },
            {
              id: 'ID_3',
              title: 'Miércoles',
              description: '',
            },
            {
              id: 'ID_4',
              title: 'Jueves',
              description: '',
            },
            {
              id: 'ID_5',
              title: 'Viernes',
              description: '',
            },
            {
              id: 'ID_6',
              title: 'Sábado',
              description: '',
            },
            {
              id: 'ID_7',
              title: 'Domingo',
              description: '',
            },
          ],
        },
      ],
    },
  },

  appointmentTimeStep: {
    keywords: ['ID_1', 'ID_2', 'ID_3', 'ID_4', 'ID_5', 'ID_6', 'ID_7'],
    questions: ['Por favor, selecciona la hora que tengas disponible 😄'],
    list: {
      headerText: '',
      bodyText: '¿Que hora tienes disponible?',
      footerText: '',
      buttonList: 'Selecciona la hora',
      listParams: [
        {
          title: 'Selecciona la hora',
          rows: [
            {
              id: 'ID_1',
              title: '9 a 10',
              description: '',
            },
            {
              id: 'ID_2',
              title: '10 a 11',
              description: '',
            },
            {
              id: 'ID_3',
              title: '11 a 12',
              description: '',
            },
            {
              id: 'ID_4',
              title: '12 a 13',
              description: '',
            },
            {
              id: 'ID_5',
              title: '13 a 14',
              description: '',
            },
            {
              id: 'ID_6',
              title: '14 a 15',
              description: '',
            },
            {
              id: 'ID_7',
              title: '15 a 16',
              description: '',
            },
            {
              id: 'ID_8',
              title: '16 a 17',
              description: '',
            },
            {
              id: 'ID_9',
              title: '17 a 18',
              description: '',
            },
            {
              id: 'ID_10',
              title: '18 a 19',
              description: '',
            },
          ],
        },
      ],
    },
  },

  medicalTestStep: {
    keywords: ['ID_2'],
    questions: [
      'Listo 😄. Un asesor se comunicará contigo para orientarte con tu examen de laboratorio. Muchas gracias!',
    ],
  },
};

module.exports = { conversation };
