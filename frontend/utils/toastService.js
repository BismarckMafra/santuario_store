import Toast from 'react-native-toast-message';

export const showToast = ({
  type = 'success',
  text1 = '',
  text2 = '',
  duration = 3000,
  position = 'top',
}) => {
  Toast.show({
    type,
    text1,
    text2,
    duration,
    position,
    topOffset: 60,
  });
};

export const toastSuccess = (message, subtitle = '') => {
  showToast({
    type: 'success',
    text1: '✅ Sucesso',
    text2: message,
  });
};

export const toastError = (message, subtitle = '') => {
  showToast({
    type: 'error',
    text1: '❌ Erro',
    text2: message,
  });
};

export const toastInfo = (message) => {
  showToast({
    type: 'info',
    text1: 'ℹ️ Informação',
    text2: message,
  });
};

export const toastWarning = (message) => {
  showToast({
    type: 'info',
    text1: '⚠️ Atenção',
    text2: message,
  });
};

export const toastLoginSuccess = (userName) => {
  showToast({
    type: 'success',
    text1: '🎉 Bem-vindo',
    text2: `Login realizado com sucesso, ${userName}!`,
  });
};

export const toastCreateSuccess = (itemName) => {
  showToast({
    type: 'success',
    text1: '✅ Cadastrado',
    text2: `${itemName} foi cadastrado com sucesso!`,
  });
};

export const toastDeleteSuccess = (itemName) => {
  showToast({
    type: 'success',
    text1: '🗑️ Excluído',
    text2: `${itemName} foi excluído com sucesso!`,
  });
};

export const toastUpdateSuccess = (itemName) => {
  showToast({
    type: 'success',
    text1: '✏️ Atualizado',
    text2: `${itemName} foi atualizado com sucesso!`,
  });
};

export const toastPermissionDenied = () => {
  showToast({
    type: 'error',
    text1: '🔒 Acesso Negado',
    text2: 'Apenas o gerente pode realizar esta ação.',
  });
};
