export const ROOT_URL = '/react-mesto-auth/';

export const popupConfig = {
  avatar: {
    name: 'avatar',
    title: 'Обновить аватар',
    btnTitleSaving: 'Сохранить...',
    btnTitle: 'Сохранить',

    inputs: [
      {
        id: 1,
        type: null,
        name: 'avatar',
        placeholder: 'Ссылка на картинку',
        typeAttribute: 'url',
        minLength: '2',
        maxLength: '200',
      },
    ],
  },

  profile: {
    name: 'profile',
    title: 'Редактировать профиль',
    btnTitleSaving: 'Сохранить...',
    btnTitle: 'Сохранить',

    inputs: [
      {
        id: 1,
        type: null,
        name: 'name',
        placeholder: 'Имя',
        typeAttribute: 'text',
        minLength: '2',
        maxLength: '40',
      },

      {
        id: 2,
        type: null,
        name: 'about',
        placeholder: 'О себе',
        typeAttribute: 'text',
        minLength: '2',
        maxLength: '200',
      },
    ],
  },

  card: {
    name: 'card',
    title: 'Новое место',
    btnTitleSaving: 'Сохранить...',
    btnTitle: 'Сохранить',

    inputs: [
      {
        id: 1,
        type: null,
        name: 'name',
        placeholder: 'Название',
        typeAttribute: 'text',
        minLength: '2',
        maxLength: '30',
      },

      {
        id: 2,
        type: null,
        name: 'link',
        placeholder: 'Ссылка на картинку',
        typeAttribute: 'url',
        minLength: '2',
        maxLength: '200',
      },
    ],
  },

  delCard: {
    name: 'del-card',
    title: 'Вы уверены?',
    btnTitleSaving: 'Да...',
    btnTitle: 'Да',
  },

  image: {
    name: 'zoom-picture',
  },
};

export const authConfig = {
  login: {
    name: 'auth',
    title: 'Вход',
    btnTitleSaving: 'Войти...',
    btnTitle: 'Войти',

    inputs: [
      {
        id: 1,
        type: 'auth',
        name: 'email',
        placeholder: 'Email',
        typeAttribute: 'email',
      },

      {
        id: 2,
        type: 'auth',
        name: 'password',
        placeholder: 'Пароль',
        typeAttribute: 'password',
        minLength: '2',
        maxLength: '12',
      },
    ],
  },

  register: {
    name: 'auth',
    title: 'Регистрация',
    btnTitleSaving: 'Зарегистрироваться...',
    btnTitle: 'Зарегистрироваться',

    inputs: [
      {
        id: 1,
        type: 'auth',
        name: 'email',
        placeholder: 'Email',
        typeAttribute: 'email',
      },

      {
        id: 2,
        type: 'auth',
        name: 'password',
        placeholder: 'Пароль',
        typeAttribute: 'password',
        minLength: '2',
        maxLength: '12',
      },
    ],
  },
};

export const infoConfig = {
  name: 'info',
  success: {
    text: 'Вы успешно зарегистрировались!',
  },

  fail: {
    text: 'Что-то пошло не так! Попробуйте ещё раз.',
  },
};
