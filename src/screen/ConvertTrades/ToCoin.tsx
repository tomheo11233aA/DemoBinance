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
    coinTo: ICoins;
    textToInput: string;
    handleSwapCoin: Function;
    setInputChoosed: Function;
    setTextFromInput: Function;
    handleSetShowModalListCoin: Function;
}

const COLOR = '#838a94'
const ToCoin = ({
    coinTo,
    textToInput,
    handleSwapCoin,
    setInputChoosed,
    setTextFromInput,
    handleSetShowModalListCoin,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box marginTop={20}>
            <Btn onPress={handleSwapCoin}>
                <Box
                    width={25}
                    height={25}
                    radius={50}
                    alignCenter
                    justifyCenter
                    rotateZ={'90deg'}
                    alignSelf={'center'}
                    backgroundColor={theme.gray2}
                >
                    <Icon
                        size={15}
                        tintColor={colors.grayBlue}
                        resizeMode={'contain'}
                        source={require('@images/trade/convert.png')}
                    />
                </Box>
            </Btn>

            <Txt size={12} fontFamily={fonts.SGM} color={COLOR}>
                {t('To')}
            </Txt>

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
                    onPress={() => handleSetShowModalListCoin('to')}
                >
                    <Icon
                        size={16}
                        resizeMode='contain'
                        source={{ uri: contants.HOSTING + '/' + coinTo?.image }}
                    />
                    <Txt fontFamily={fonts.IBMPM} size={15} color={theme.black}>
                        {`  ${coinTo?.currency}   `}
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
                    value={textToInput}
                    selectionColor={colors.yellow}
                    placeholder={'1 - 3,800,000'}
                    showSoftInputOnFocus={false}
                    onFocus={() => {
                        setInputChoosed('to')
                        setTextFromInput('')
                    }}
                    style={{
                        flex: 1,
                        marginTop: 3,
                        fontSize: 16,
                        height: '100%',
                        color: theme.black,
                        fontFamily: fonts.M17,
                    }}
                />
            </Box>
        </Box>
    )
}

export default ToCoin