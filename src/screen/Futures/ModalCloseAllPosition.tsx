import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import Modality from '@reuse/Modality'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ModalCloseAllPosition = ({ show, setShow, closeAllPosition }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Modality
            show={show}
            animation='none'
        >
            <Box
                radius={10}
                width={'70%'}
                paddingVertical={20}
                paddingHorizontal={15}
                backgroundColor={theme.bg}
            >
                <Icon
                    alignSelf={'center'}
                    size={30}
                    marginBottom={20}
                    tintColor={colors.yellow}
                    source={require('@images/future/info.png')}
                />
                <Txt
                    size={13}
                    color={theme.black}
                    fontFamily={fonts.IBMPR}
                >
                    {t('Close all positions, cancel all positions in USDⓢ-M and close all positions in USDⓢ-M with Market orders.')}
                </Txt>
                <Txt
                    marginTop={5}
                    size={13}
                    color={theme.black}
                    fontFamily={fonts.IBMPR}
                >
                    {t('Are you sure you want to close all positions.')}
                </Txt>
                <Box
                    row
                    alignCenter
                    marginTop={20}
                >
                    <Btn
                        flex={1}
                        radius={5}
                        height={30}
                        backgroundColor={theme.gray2}
                        onPress={() => setShow(false)}
                    >
                        <Txt fontFamily={fonts.IBMPM} color={theme.black}>
                            {t('Cancel')}
                        </Txt>
                    </Btn>
                    <Btn
                        flex={1}
                        radius={5}
                        height={30}
                        marginLeft={10}
                        onPress={closeAllPosition}
                        backgroundColor={colors.yellow}
                    >
                        <Txt fontFamily={fonts.IBMPM}>{t('Confirm')}</Txt>
                    </Btn>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalCloseAllPosition