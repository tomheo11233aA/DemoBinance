import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'
import { ICoins } from 'src/model/futuresModel'

interface Props {
    coinFrom: ICoins;
    textFromInput: string;
    setTextToInput: Function;
    setInputChoosed: Function;
    handleSetShowModalListCoin: Function;
}

const COLOR = '#838a94'
const FromCoin = ({
    coinFrom,
    textFromInput,
    setTextToInput,
    setInputChoosed,
    handleSetShowModalListCoin,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Box marginTop={20}>
            <Box row justifySpaceBetween alignCenter>
                <Txt size={12} fontFamily={fonts.SGM} color={COLOR}>
                    {t('From')}
                </Txt>
                <Box row alignCenter>
                    <Txt size={12} fontFamily={fonts.SGM} color={COLOR}>
                        {t('Spot Wallet')}
                    </Txt>
                    <Icon
                        source={require('@images/trade/convert.png')}
                        size={15}
                        resizeMode='contain'
                        tintColor={colors.yellow}
                        marginLeft={7}
                    />
                </Box>
            </Box>

            <Box
                row
                radius={5}
                alignCenter
                height={40}
                marginTop={10}
                paddingHorizontal={15}
                backgroundColor={theme.gray2}
            >
                <Btn
                    row
                    alignCenter
                    onPress={() => handleSetShowModalListCoin('from')}
                >
                    <Icon
                        size={16}
                        resizeMode='contain'
                        source={{ uri: contants.HOSTING + '/' + coinFrom?.image }}
                    />
                    <Txt fontFamily={fonts.IBMPM} size={15} color={theme.black}>
                        {`  ${coinFrom?.currency}   `}
                    </Txt>
                    <Icon
                        source={require('@images/trade/more.png')}
                        size={16}
                    />
                    <Txt size={15} color={colors.gray2}>
                        {'  | '}
                    </Txt>
                </Btn>

                <TextInput
                    value={textFromInput}
                    showSoftInputOnFocus={false}
                    placeholder={'1 - 3,800,000'}
                    selectionColor={colors.yellow}
                    onFocus={() => {
                        setInputChoosed('from')
                        setTextToInput('')
                    }}
                    style={{
                        flex: 1,
                        height: '100%',
                        color: theme.black,
                        fontFamily: fonts.M17,
                        fontSize: 16,
                        marginTop: 3,
                    }}
                />

                <Box marginLeft={10}>
                    <Txt fontFamily={fonts.IBMPM} color={'#d09e23'}>
                        {t('Limit')}
                    </Txt>
                </Box>
            </Box>

            <Txt size={11} color={colors.grayBlue2} marginTop={5}>
                {t('Available')}:
                <Txt size={13} fontFamily={fonts.M23} color={colors.grayBlue2}>
                    {' 36,37061206 '}
                </Txt>
                <Txt size={11} color={colors.grayBlue2}>USDT</Txt>
            </Txt>
        </Box>
    )
}

export default FromCoin