import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { ImageSourcePropType } from 'react-native'

interface Props {
  t: any;
  theme: any;
  title: string;
  choose?: boolean;
  onPress: Function;
  recommended?: boolean;
  icon: ImageSourcePropType;
}

const RadioItem = ({
  t,
  icon,
  theme,
  title,
  onPress,
  choose = false,
  recommended = false,
}: Props) => {
  return (
    <Btn
      onPress={onPress}
      row
      radius={5}
      alignCenter
      padding={20}
      marginTop={10}
      borderWidth={1}
      justifySpaceBetween
      backgroundColor={theme.gray3}
      borderColor={choose ? colors.yellow2 : theme.gray}
    >
      <Box row alignCenter>
        <Icon
          size={20}
          source={icon}
          marginRight={20}
          resizeMode={'contain'}
        />
        <Box>
          <Txt fontFamily={fonts.IBMPM} color={theme.black}>
            {t(title)}
          </Txt>
          {recommended &&
            <Box
              padding={5}
              marginTop={10}
              alignSelf={'flex-start'}
              backgroundColor={theme.yellow}
            >
              <Txt fontFamily={fonts.IBMPR} size={13} color={colors.yellowBold}>
                {t('Recommended')}
              </Txt>
            </Box>
          }
        </Box>
      </Box>

      <Box
        width={20}
        height={20}
        radius={50}
        alignCenter
        justifyCenter
        borderWidth={1}
        borderColor={choose ? colors.yellow2 : theme.gray6}
        backgroundColor={theme.bg}
      >
        {choose &&
          <Box
            width={10}
            height={10}
            radius={50}
            backgroundColor={colors.yellow2}
          />
        }
      </Box>
    </Btn>
  )
}

export default RadioItem