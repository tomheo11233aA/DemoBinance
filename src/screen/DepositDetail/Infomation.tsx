import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import Clipboard from '@react-native-clipboard/clipboard'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

const SIZE_12 = 12
const MRT_25 = 25
const Infomation = ({ depositItem }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box paddingHorizontal={15}>
            <Box row justifySpaceBetween alignCenter marginTop={MRT_25}>
                <Box row alignCenter>
                    <Txt style={styles.textGray}>
                        {t('Confirm') + '  '}
                    </Txt>
                    <Icon
                        size={11}
                        source={require('@images/future/info.png')}
                    />
                </Box>
                <Txt color={theme.black} fontFamily={fonts.IBMPR} size={SIZE_12}>
                    {t('Success')}
                </Txt>
            </Box>

            <Box row justifySpaceBetween alignCenter marginTop={MRT_25}>
                <Txt style={styles.textGray}>
                    {t('Wallet')}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.IBMPR} size={SIZE_12}>
                    {t('Spot wallet')}
                </Txt>
            </Box>

            <Box row justifySpaceBetween alignCenter marginTop={MRT_25}>
                <Txt style={styles.textGray}>
                    {t('Network')}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.IBMPR} size={SIZE_12}>
                    {depositItem?.coin_key == 'USDT.BEP20' ? 'BSC' :
                        depositItem?.coin_key == 'USDT.ERC20' ? 'ETH' : '--'
                    }
                </Txt>
            </Box>

            <Box row justifySpaceBetween alignStart marginTop={MRT_25}>
                <Txt style={styles.textGray}>
                    {t('Address')}
                </Txt>
                <Box row width={'60%'} marginRight={15} alignStart>
                    <Txt
                        color={theme.black}
                        fontFamily={fonts.IBMPR}
                        size={SIZE_12}
                        right
                    >
                        {depositItem.address}
                    </Txt>
                    <Btn
                        onPress={() => Clipboard.setString(depositItem.address)}
                        marginLeft={10}
                    >
                        <Icon
                            size={12}
                            source={require('@images/wallet/copy.png')}
                        />
                    </Btn>
                </Box>
            </Box>

            <Box row justifySpaceBetween alignStart marginTop={MRT_25}>
                <Txt style={styles.textGray}>
                    {t('Txid')}
                </Txt>
                <Box row width={'60%'} marginRight={15} alignStart>
                    <Txt
                        color={theme.black}
                        fontFamily={fonts.IBMPR}
                        size={SIZE_12}
                        right
                        line
                    >
                        {depositItem.hash}
                    </Txt>
                    <Btn
                        marginLeft={10}
                        onPress={() => Clipboard.setString(depositItem.hash)}
                    >
                        <Icon
                            size={12}
                            source={require('@images/wallet/copy.png')}
                        />
                    </Btn>
                </Box>
            </Box>

            <Box row justifySpaceBetween alignCenter marginTop={MRT_25}>
                <Txt style={styles.textGray}>
                    {t('Time')}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.M23}>
                    {depositItem.created_at}
                </Txt>
            </Box>

            <Box alignSelf={'center'} marginTop={30}>
                <Txt size={SIZE_12} color={colors.yellow} fontFamily={fonts.IBMPM}>
                    {t('Do you need help? See frequently asked questions')}
                </Txt>
            </Box>
        </Box>
    )
}

export default Infomation

const styles = StyleSheet.create({
    textGray: {
        fontSize: 12,
        color: colors.grayBlue,
        fontFamily: fonts.IBMPR,
    }
})