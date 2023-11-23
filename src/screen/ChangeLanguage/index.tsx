import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { converLanguage } from '@method/format'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Back from '@reuse/Back'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const themes = ['en', 'vn', 'kp', 'jp', 'cn', 'th', 'kh', 'la', 'id']

const ChangeLanguage = () => {
  const color = useTheme()
  const { t, i18n } = useTranslation()
  const [render, setRender] = useState(false)

  const language = i18n.language

  const handleChangeLanguage = async (value: string) => {
    i18n.changeLanguage(value)
    await AsyncStorage.setItem(contants.LANGUAGE, value)
    setRender(!render)
  }

  return (
    <KeyBoardSafe>
      <Box padding={15}>
        <Back size={16} />
        <Txt
          size={18}
          fontFamily={fonts.AS}
          marginTop={18}
          marginBottom={20}
          color={color.black}
        >
          {t('Language')}
        </Txt>
        {themes.map(item =>
          <Item
            t={t}
            key={item}
            item={item}
            color={color}
            language={language}
            onChangeLanguage={handleChangeLanguage}
          />
        )}
      </Box>
    </KeyBoardSafe>
  )
}

interface IItem {
  t: any,
  color: any,
  item: string,
  language: string,
  onChangeLanguage: (value: string) => Promise<void>,
}

const Item = ({
  t,
  item,
  color,
  language,
  onChangeLanguage,
}: IItem) => {
  const CHOOSE = language === item

  return (
    <Btn
      row
      justifySpaceBetween
      marginVertical={20}
      onPress={() => onChangeLanguage(item)}
    >
      <Txt size={12} fontFamily={fonts.SGM} color={color.black}>
        {t(converLanguage(item))}
      </Txt>
      {CHOOSE && <Txt size={20} bold color={colors.yellow}>✓</Txt>}
    </Btn>
  )
}

export default ChangeLanguage