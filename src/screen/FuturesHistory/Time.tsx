import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Time = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const times = ['1 day', '1 week', '1 month', '3 month']

  return (
    <Box>
      <Txt color={colors.grayBlue} size={13} fontFamily={fonts.SGM}>
        {t('Time')}
      </Txt>
      <Box
        row
        marginTop={10}
        borderTopWidth={1}
        justifySpaceBetween
        paddingVertical={15}
        borderColor={theme.gray2}
      >
        {times.map((time) => {
          const number = time.slice(0, time.indexOf(" "))
          const text = time.slice(time.indexOf(" "), time.length)

          return (
            <Box
              row
              key={time}
              alignCenter
              justifyCenter
              width={'23%'}
              paddingVertical={3}
              paddingHorizontal={7}
              backgroundColor={theme.gray2}
            >
              <Txt
                size={14}
                fontFamily={fonts.M24}
                color={colors.grayBlue}
              >
                {number}
              </Txt>
              <Txt
                fontFamily={fonts.IBMPM}
                color={colors.grayBlue}
                size={13}
              >
                {text}
              </Txt>
            </Box>
          )
        })}
      </Box>

      <Box row alignCenter justifySpaceBetween>
        <Box
          radius={3}
          paddingVertical={10}
          paddingHorizontal={30}
          backgroundColor={theme.gray2}
        >
          <Txt color={theme.black} fontFamily={fonts.M24}>
            2023-06-02
          </Txt>
        </Box>
        <Box>
          <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR}>
            {t('to')}
          </Txt>
        </Box>
        <Box
          radius={3}
          paddingVertical={10}
          paddingHorizontal={30}
          backgroundColor={theme.gray2}
        >
          <Txt color={theme.black} fontFamily={fonts.M24}>
            2023-08-31
          </Txt>
        </Box>
      </Box>

      <Txt
        size={13}
        marginVertical={20}
        color={colors.grayBlue}
        fontFamily={fonts.IBMPR}
      >
        {t('The system only displays transaction history within the past 3 months. For more data, go to the web and export the report.')}
      </Txt>
    </Box>
  )
}

export default Time