import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Input from '@commom/Input'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import Modality from '@reuse/Modality'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import { height, width } from '@util/responsive'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable } from 'react-native'
import { ICoins } from 'src/model/futuresModel'

interface Props {
    coins: ICoins[];
    coinTo: ICoins;
    coinFrom: ICoins;
    handleSetCoin: Function;
    setCoinChoosed: Function;
    coinChoosed: 'to' | 'from';
    isShowModalListCoin: boolean;
    setShowModalListCoin: Function;
}
const COLOR = '#838a94'
const ModalListCoin = ({
    coins,
    coinTo,
    coinFrom,
    coinChoosed,
    handleSetCoin,
    setCoinChoosed,
    isShowModalListCoin,
    setShowModalListCoin,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Modality
            animation={'slide'}
            show={isShowModalListCoin}
            setShow={setShowModalListCoin}
        >
            <Pressable
                style={{
                    bottom: 0,
                    padding: 20,
                    width: width,
                    paddingBottom: 50,
                    position: 'absolute',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    backgroundColor: theme.bg,
                }}
            >
                <Box row alignCenter backgroundColor={theme.gray2} padding={5} radius={5}>
                    <Btn
                        row
                        flex={1}
                        radius={5}
                        height={40}
                        onPress={() => setCoinChoosed('from')}
                        backgroundColor={coinChoosed === 'from' && theme.bg}
                    >
                        <Txt size={12} fontFamily={fonts.SGM} color={COLOR}>
                            {t('From')}
                        </Txt>
                        <Icon
                            size={18}
                            marginHorizontal={5}
                            source={{ uri: contants.HOSTING + '/' + coinFrom?.image }}
                        />
                        <Txt size={14} fontFamily={fonts.SGM} color={COLOR}>
                            {coinFrom?.currency}
                        </Txt>
                    </Btn>
                    <Btn
                        row
                        flex={1}
                        radius={5}
                        height={40}
                        onPress={() => setCoinChoosed('to')}
                        backgroundColor={coinChoosed === 'to' && theme.bg}
                    >
                        <Txt size={12} fontFamily={fonts.SGM} color={COLOR}>
                            {t('To')}
                        </Txt>
                        <Icon
                            size={18}
                            marginHorizontal={5}
                            source={{ uri: contants.HOSTING + '/' + coinTo?.image }}
                        />
                        <Txt size={14} fontFamily={fonts.SGM} color={theme.black}>
                            {coinTo?.currency}
                        </Txt>
                    </Btn>
                </Box>

                <Txt fontFamily={fonts.AS} marginVertical={20} color={theme.black}>
                    {t('Convert to')}
                </Txt>

                <Box
                    backgroundColor={theme.gray2}
                    height={30}
                    flex={1}
                    radius={20}
                    justifyCenter
                >
                    <Input
                        height={40}
                        hint={t('Search')}
                        paddingHorizontal={40}
                        color={colors.grayBlue}
                        style={{ fontSize: 12 }}
                    />
                    <Box width={20} absolute left={10}>
                        <Icon
                            source={require('@images/home/search.png')}
                            size={14}
                        />
                    </Box>
                </Box>

                <Scroll marginTop={10} height={height * 30 / 100}>
                    {coins.map((coin) =>
                        <Btn
                            row
                            alignCenter
                            marginVertical={15}
                            key={coin.currency}
                            justifyCenter={false}
                            onPress={() => handleSetCoin(coin)}
                        >
                            <Icon
                                source={{ uri: contants.HOSTING + '/' + coin?.image }}
                                size={18}
                                marginRight={10}
                            />
                            <Box>
                                <Txt fontFamily={fonts.AS} size={12} color={theme.black}>
                                    {coin?.currency}
                                </Txt>
                                <Txt color={theme.gray6} size={12} fontFamily={fonts.IBMPR}>
                                    {coin?.symbol}
                                </Txt>
                            </Box>
                        </Btn>
                    )}
                </Scroll>
            </Pressable>
        </Modality>
    )
}

export default ModalListCoin