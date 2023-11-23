import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import { useTheme } from '@hooks/index'
import { fonts } from '@theme/fonts'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'
import { navigate } from '@navigation/navigationRef'
import { screen } from '@util/screens'
import { colors } from '@theme/colors'
import ModalWithdraw from './ModalWithdraw'

const Footer = ({ coin }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const [isShowModalWithdraw, setShowModalWithdraw] = useState(false)

    return (
        <Box
            backgroundColor={theme.bg}
            paddingVertical={20}
            paddingHorizontal={15}
        >
            <Box row>
                <Btn
                    onPress={() => setShowModalWithdraw(true)}
                    flex={1}
                    backgroundColor={theme.gray}
                    height={32}
                    radius={5}
                >
                    <Txt fontFamily={fonts.AS} size={13} color={theme.black}>
                        {t('Withdraw')}
                    </Txt>
                </Btn>

                <Btn
                    onPress={() => navigate(screen.DEPOSIT_CRYPTO, { coin })}
                    flex={1}
                    backgroundColor={colors.yellow}
                    height={32}
                    radius={5}
                    marginLeft={10}
                >
                    <Txt fontFamily={fonts.AS} size={13}>
                        {t('Deposit')}
                    </Txt>
                </Btn>
            </Box>

            <ModalWithdraw
                {...{
                    coin,
                    isShow: isShowModalWithdraw,
                    setShow: setShowModalWithdraw,
                }}
            />
        </Box>
    )
}

export default Footer