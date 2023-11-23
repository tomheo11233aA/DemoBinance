import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import Clipboard from '@react-native-clipboard/clipboard'
import LoadingBlack from '@reuse/LoadingBlack'
import { createWallet } from '@service/userService'
import { colors } from '@theme/colors'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import Warning from './Warning'

const USDT = ({ toastTopRef }: any) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [wallet, setWallet] = useState<any>()

    useEffect(() => {
        handleCreateWallet()
    }, [])

    const handleCreateWallet = async () => {
        const res = await createWallet({
            symbol: "USDT.BEP20"
        })
        if (res.status) {
            setWallet(res.data)
            setLoading(false)
        }
    }

    const handleCopyABC = async () => {
        Clipboard.setString(wallet.address)
        toastTopRef.current.slideDown(t('Coppy success'), true)
    }

    return (
        <Box style={[styles.container, { marginTop: 10 }]}>
            <Txt bold size={18}>{t('Wallet USDT')}</Txt>
            {loading ? (
                <LoadingBlack />
            ) : (
                <>
                    <Btn
                        width={75}
                        height={35}
                        marginTop={10}
                        backgroundColor={colors.yellow}
                    >
                        <Txt size={12}>BEP20</Txt>
                    </Btn>

                    {wallet?.address &&
                        <Box alignCenter marginTop={20}>
                            <QRCode
                                backgroundColor={colors.white}
                                value={wallet?.address}
                                size={150}
                            />
                            <Box width={240} marginTop={20}>
                                <Txt numberOfLines={10} center bold size={13}>{wallet?.address}</Txt>
                            </Box>

                            <Btn
                                onPress={handleCopyABC}
                                paddingHorizontal={60}
                                height={40}
                                marginTop={20}
                                backgroundColor={colors.yellow}
                            >
                                <Txt numberOfLines={10}>{t('Coppy address')}</Txt>
                            </Btn>
                        </Box>
                    }
                    <Box marginTop={20} marginRight={20}>
                        <Warning text={t('You have to deposit at least 5 USDT to be credited. Any deposit that is less than 5 USDT will not be refunded.')} />
                        <Warning text={t('This deposit address only accepts USDT. Do not send other coins to it.')} />
                    </Box>
                </>
            )}
        </Box>
    )
}

export default USDT

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: colors.gray,
    },
})