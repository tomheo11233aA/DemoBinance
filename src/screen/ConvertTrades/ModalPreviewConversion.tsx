import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import Modality from '@reuse/Modality'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import { width } from '@util/responsive'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text } from 'react-native'
import { ICoins } from 'src/model/futuresModel'

interface Props {
    coinTo: ICoins,
    coinFrom: ICoins,
    isShowModalPreview: boolean,
    setShowModalPreview: Function,
}

const ModalPreviewConversion = ({
    coinTo,
    coinFrom,
    isShowModalPreview,
    setShowModalPreview,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Modality
            animation={'slide'}
            show={isShowModalPreview}
            setShow={setShowModalPreview}
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
                <Box
                    row
                    justifySpaceBetween
                    alignStart
                >
                    <Box />
                    <Txt
                        bold
                        fontFamily={fonts.AS}
                        size={16}
                        marginBottom={10}
                        color={theme.black}
                    >
                        {t('Confirm order')}
                    </Txt>
                    <Btn onPress={() => setShowModalPreview(false)}>
                        <Icon
                            size={14}
                            source={require('@images/future/close.png')}
                        />
                    </Btn>
                </Box>

                <Box row justifySpaceBetween alignCenter>
                    <Box alignCenter>
                        <Icon
                            size={30}
                            source={{ uri: contants.HOSTING + '/' + coinFrom?.image }}
                        />
                        <Txt color={theme.gray6} marginVertical={5}>
                            {t('From')}
                        </Txt>
                        <Txt fontFamily={fonts.M31} size={17} color={theme.black}>
                            0.00003483
                            <Txt fontFamily={fonts.AS} size={15} color={theme.black}>
                                {` ${coinFrom?.currency}`}
                            </Txt>
                        </Txt>
                    </Box>
                    <Box rotateZ={'180deg'}>
                        <Icon
                            source={require('@images/back2.png')}
                            size={20}
                            resizeMode={'contain'}
                        />
                    </Box>
                    <Box alignCenter>
                        <Icon
                            source={{ uri: contants.HOSTING + '/' + coinTo?.image }}
                            size={30}
                        />
                        <Txt color={theme.gray6} marginVertical={5}>
                            {t('Receive')}
                        </Txt>
                        <Txt fontFamily={fonts.M31} size={17} color={theme.black}>
                            0.00003483
                            <Txt fontFamily={fonts.AS} size={15} color={theme.black}>
                                {` ${coinTo?.currency}`}
                            </Txt>
                        </Txt>
                    </Box>
                </Box>

                <Box
                    radius={5}
                    padding={10}
                    marginTop={20}
                    backgroundColor={theme.gray2}
                >
                    <Box row justifySpaceBetween marginVertical={5}>
                        <Text style={styles.textTitle}>{t('Transaction Fees')}</Text>
                        <Box backgroundColor={theme.green} padding={5}>
                            <Txt color={'#3cb389'} size={12}>
                                {t('0 fees')}
                            </Txt>
                        </Box>
                    </Box>
                    <Box row justifySpaceBetween marginVertical={5}>
                        <Text style={styles.textTitle}>{t('Pay From')}</Text>
                        <Txt color={theme.black}>
                            Spot Wallet
                        </Txt>
                    </Box>
                    <Box row justifySpaceBetween marginVertical={5}>
                        <Text style={styles.textTitle}>{t('Type')}</Text>
                        <Txt color={theme.black}>
                            Market
                        </Txt>
                    </Box>
                    <Box row justifySpaceBetween marginVertical={5}>
                        <Text style={styles.textTitle}>{t('Rate')}</Text>
                        <Box row alignCenter>
                            <Txt fontFamily={fonts.M17} size={17} color={theme.black}>
                                1
                                <Txt color={theme.black}>
                                    {` ${coinFrom?.currency} ≈ `}
                                </Txt>
                                <Txt fontFamily={fonts.M17} size={17} color={theme.black}>
                                    94786.7
                                </Txt>
                                <Txt fontFamily={fonts.M17} size={17} color={theme.black}>
                                    {' 1'}
                                </Txt>
                                <Txt color={theme.black}>
                                    {` ${coinTo?.currency}  `}
                                </Txt>
                            </Txt>
                            <Icon
                                size={16}
                                tintColor={colors.yellow}
                                source={require('@images/trade/convert.png')}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box row marginTop={20} height={40}>
                    <Btn
                        flex={1}
                        radius={5}
                        backgroundColor={theme.gray}
                        onPress={() => setShowModalPreview(false)}
                    >
                        <Txt fontFamily={fonts.AS} color={theme.black}>{t('Back')}</Txt>
                    </Btn>
                    <Btn
                        flex={1}
                        radius={5}
                        marginLeft={10}
                        backgroundColor={colors.yellow}
                    >
                        <Txt fontFamily={fonts.AS}>{t('Deposit')}</Txt>
                    </Btn>
                </Box>
            </Pressable>
        </Modality>
    )
}

export default ModalPreviewConversion

export const styles = StyleSheet.create({
    textTitle: {
        color: colors.grayBlue,
        fontFamily: fonts.IBMPR,
    }
})