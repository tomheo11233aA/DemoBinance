import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Back from '@reuse/Back'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import React from 'react'
import { useTranslation } from 'react-i18next'
import RNRestart from 'react-native-restart'
import { useSelector } from 'react-redux'

const LIGHT = 'Light Mode'
const DARK = 'Dark Mode'

const themes = [LIGHT, DARK]

const Appearance = () => {
  const color = useTheme()
  const { t } = useTranslation()
  const theme = useSelector(themeUserSelector)

  const handleChangeTheme = async (value: string) => {
    const payload = value === LIGHT ? 'light' : 'dark'
    await AsyncStorage.setItem(contants.THEME, payload)
    RNRestart.Restart()
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
          {t('Appearance')}
        </Txt>
        {themes.map(item =>
          <Item
            t={t}
            key={item}
            item={item}
            theme={theme}
            color={color}
            onChangeTheme={handleChangeTheme}
          />
        )}
      </Box>
    </KeyBoardSafe>
  )
}

interface IItem {
  t: any;
  item: string;
  theme: string;
  color: any;
  onChangeTheme: (value: string) => Promise<void>;
}

const Item = ({
  t,
  item,
  theme,
  color,
  onChangeTheme,
}: IItem) => {
  const THEME = theme === 'light' ? LIGHT : DARK

  return (
    <Btn
      row
      marginVertical={18}
      justifySpaceBetween
      onPress={() => onChangeTheme(item)}
    >
      <Txt size={12} fontFamily={fonts.SGM} color={color.black}>
        {t(item)}
      </Txt>
      {THEME === item &&
        <Txt size={14} bold color={colors.yellow}>✓</Txt>
      }
    </Btn>
  )
}

export default Appearance