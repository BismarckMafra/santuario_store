import React from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { colors } from '../estilos/estilos';

const toastConfig = {
  success: (props) => (
    <View
      style={{
        width: '90%',
        backgroundColor: colors.successLight,
        borderLeftWidth: 5,
        borderLeftColor: colors.success,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          color: colors.text,
          marginBottom: 4,
        }}
      >
        {props.text1}
      </Text>
      {props.text2 && (
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: colors.textLight,
          }}
        >
          {props.text2}
        </Text>
      )}
    </View>
  ),

  error: (props) => (
    <View
      style={{
        width: '90%',
        backgroundColor: colors.dangerLight,
        borderLeftWidth: 5,
        borderLeftColor: colors.danger,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          color: colors.danger,
          marginBottom: 4,
        }}
      >
        {props.text1}
      </Text>
      {props.text2 && (
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: colors.text,
          }}
        >
          {props.text2}
        </Text>
      )}
    </View>
  ),

  info: (props) => (
    <View
      style={{
        width: '90%',
        backgroundColor: '#E8F5E9',
        borderLeftWidth: 5,
        borderLeftColor: colors.primary,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          color: colors.primary,
          marginBottom: 4,
        }}
      >
        {props.text1}
      </Text>
      {props.text2 && (
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: colors.text,
          }}
        >
          {props.text2}
        </Text>
      )}
    </View>
  ),
};

export const ToastContainer = () => {
  return <Toast config={toastConfig} />;
};

export default toastConfig;
