import { colors } from '@theme/colors';
import React from 'react'
import { TextInput } from 'react-native'

interface Props {
  theme: any;
  value: string;
  placeholder: string;
  marginHorizontal?: number;
  onChangeText: (txt: string) => void;
}

const InputDob = ({
  value,
  theme,
  placeholder,
  onChangeText,
  marginHorizontal,
}: Props) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor={theme.bg != 'white' ? colors.grayBlue : colors.gray2}
      style={{
        flex: 1,
        height: 40,
        marginHorizontal,
        paddingHorizontal: 10,
        backgroundColor: theme.gray2,
        color: theme.black
      }}
    />
  )
}

export default InputDob