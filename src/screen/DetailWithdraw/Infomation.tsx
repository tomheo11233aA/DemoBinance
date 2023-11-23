import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import Clipboard from '@react-native-clipboard/clipboard'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

const SIZE_12 = 12
const MRT_25 = 25
const Infomation = ({ withdrawItem }: any) => {
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
                    {t(withdrawItem?.hash ? 'Success' : 'Pending')}
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
                    {withdrawItem?.network}
                </Txt>
            </Box>

            <Box row justifySpaceBetween marginTop={MRT_25}>
                <Txt style={styles.textGray}>
                    {t('Address')}
                </Txt>
                <Box row alignStart width={'60%'} justifyEnd>
                    <Box alignEnd>
                        <Txt
                            color={theme.black}
                            fontFamily={fonts.IBMPR}
                            size={SIZE_12}
                            right
                        >
                            {withdrawItem?.toAddress}
                        </Txt>
                        <Txt color={colors.yellow} fontFamily={fonts.IBMPM} size={12} marginTop={5}>
                            {t('Save address')}
                        </Txt>
                    </Box>

                    <Btn
                        marginLeft={10}
                        onPress={() => Clipboard.setString(withdrawItem.address)}
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
                <Box
                    row
                    alignStart
                    width={'60%'}
                    justifyEnd
                >
                    <Txt
                        right
                        line
                        size={SIZE_12}
                        color={theme.black}
                        fontFamily={fonts.IBMPR}
                    >
                        {withdrawItem?.hash}
                    </Txt>
                    <Btn
                        marginLeft={10}
                        onPress={() => Clipboard.setString(withdrawItem.hash)}
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
                    {t('Network fee')}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.M23}>
                    {numberCommasDot(withdrawItem.feeWidthdraw)}
                    <Txt color={theme.black} size={11}>
                        {' USDT'}
                    </Txt>
                </Txt>
            </Box>

            <Box row justifySpaceBetween alignCenter marginTop={MRT_25}>
                <Txt style={styles.textGray}>
                    {t('Time')}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.M23}>
                    {withdrawItem.created_at}
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