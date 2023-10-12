const { EVENTS } = require('@bot-whatsapp/bot');

const conversation = {
  welcomeStep: {
    keywords: [EVENTS.WELCOME],
    questions: [
      `Bienvenido a Anna.😄`,
      `¡Bienvenido de vuelta {{name}}¡😄  Soy Anna, tu asistente medico.`,
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
      'Porfavor, selecciona el servicio que necesitas de las opciones 😄',
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
    questions: ['Porfavor, Selecciona tus síntomas de las opciones 😄'],
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
              title: 'Creo que estoy resfriado/gripe',
              description:
                'Es posible que tengas algún proceso gripal, resfriado o alergia, por lo que te atenderá un MEDICO GENERAL',
            },
            {
              id: 'ID_2',
              title:
                'Creo que tengo tos persistente y dificultad para respirar',
              description:
                'Es posible que tengas alguna afección pulmonar, por lo que te atenderá un NEUMÓLOGO.',
            },
            {
              id: 'ID_3',
              title: 'Creo que sufro de Asma, Neumonía, EPOC o fibrosis',
              description:
                'Parece que tienes una afección pulmonar crónica, por lo que te atenderá un NEUMÓLOGO.',
            },
            {
              id: 'ID_4',
              title: 'Me duele la cabeza',
              description:
                'Es importante abodar el origen y causa de los dolores, por lo que te atenderá un NEURÓLOGO.',
            },
            {
              id: 'ID_5',
              title: 'Me duele el abdomen (estómago)',
              description:
                'Es posible que tengas alguna afección gatrointestinal, por lo que te atenderá un GATROENTEROLOGO.',
            },
            {
              id: 'ID_6',
              title: 'Creo que tengo una afección en la piel',
              description:
                'Es posible que tengas alguna afección en la piel, por lo que te atenderá un DERMATÓLOGO.',
            },
            {
              id: 'ID_7',
              title: 'Creo que tengo Diabetes o Hipertiroidismo',
              description:
                'Es posible que tengas alguna afección endocrina crónica, por lo que te atenderá un ENDOCRINÓLOGO.',
            },
            {
              id: 'ID_8',
              title: 'Quiero hacerme un chequeo médico',
              description:
                'Es importante realizar un chequeo anual, a continuación te mostraremos nuestras opciones en paquetes de chequeo.',
            },
            {
              id: 'ID_9',
              title: 'Necesito atención con un nutricionista',
              description:
                'Es imporante un abordaje nutricional para la salud, te agendaremos una cita con un nutricionista.',
            },
            {
              id: 'ID_10',
              title: 'Necesito atención con un psicólogo',
              description:
                'Es imporante un abordaje psicologico para la salud, te agendaremos una cita con un psicologo.',
            },
            {
              id: 'ID_11',
              title: 'No encontré en las opciones anteriores',
              description:
                'Por favor, cuentamos más sobre tus sintomas y encontraremos la atención médica que necesitas.',
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
    questions: ['Porfavor, selecciona el dia que tengas disponible 😄'],
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

  medicalTestStep: {
    keywords: ['ID_2'],
    questions: [
      'Listo 😄. Un asesor se comunicará contigo para orientarte con tu examen de laboratorio. Muchas gracias!',
    ],
  },
};

module.exports = { conversation };
