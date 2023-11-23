import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import Modality from '@reuse/Modality'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { height } from '@util/responsive'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ModalNetwork = ({ show, setShow, setNetWork }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Modality
            show={show}
            setShow={setShow}
            animation={'slide'}
        >
            <Box
                absolute
                bottom={0}
                alignCenter
                width={'100%'}
                paddingHorizontal={20}
                borderTopLeftRadius={10}
                borderTopRightRadius={10}
                height={height * 60 / 100}
                backgroundColor={theme.bg}
            >
                <Txt fontFamily={fonts.IBMPM} marginVertical={10} color={theme.black}>
                    {t('Choose Network')}
                </Txt>
                <Box
                    row
                    backgroundColor={theme.yellow}
                    width={'100%'}
                    paddingHorizontal={10}
                    paddingVertical={15}
                    radius={3}
                >
                    <Icon
                        source={require('@images/profile/warning.png')}
                        size={16}
                        marginRight={10}
                    />
                    <Box flex={1}>
                        <Txt color={colors.yellowBold} size={12} fontFamily={fonts.IBMPR}>
                            {t('Please note that only supported networks on Binance platform are shown, if you deposit via another network your assets may be lost.')}
                        </Txt>
                    </Box>
                </Box>

                <Btn
                    onPress={() => {
                        setNetWork({
                            name: 'BNB Smart Chain (BEP20)',
                            value: 'SYMBOL_HERE'
                        })
                        setShow(false)
                    }}
                    alignCenter={false}
                    width={'100%'}
                    backgroundColor={theme.gray2}
                    marginTop={20}
                    height={60}
                    padding={10}
                >
                    <Txt
                        fontFamily={fonts.IBMPM}
                        color={theme.black}
                    >
                        BNB Smart Chain (BEP20)
                    </Txt>
                </Btn>

                {/* <Btn
                    onPress={() => {
                        setNetWork({
                            name: 'Ethereum (ERC20)',
                            value: 'SYMBOL_HERE'
                        })
                        setShow(false)
                    }}
                    alignCenter={false}
                    width={'100%'}
                    backgroundColor={theme.gray2}
                    marginTop={15}
                    height={60}
                    padding={10}
                >
                    <Txt
                        fontFamily={fonts.IBMPM}
                        color={theme.black}
                    >
                        Ethereum (ERC20)
                    </Txt>
                </Btn> */}
            </Box>
        </Modality>
    )
}

export default ModalNetwork