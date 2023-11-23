import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { hideBottomTab, useTheme } from '@hooks/index'
import { useRoute } from '@react-navigation/native'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { createWallet } from '@service/fundingService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { width } from '@util/responsive'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import Header from './Header'
import ModalNetwork from './ModalNetwork'
import { useTranslation } from 'react-i18next'
import Clipboard from '@react-native-clipboard/clipboard'

const DepositCrypto = () => {
    const theme = useTheme()
    const route = useRoute<any>()
    const { coin } = route.params
    const { t } = useTranslation()
    const [network, setNetWork] = useState<any>({})
    const [address, setAddress] = useState<string>('')
    const [isShowModalNetwork, setShowModalNetWork] = useState<boolean>(true)

    hideBottomTab()

    useEffect(() => {
        if (network.name) {
            handleCreateWallet()
        }
    }, [network])

    const handleCreateWallet = async () => {
        const res = await createWallet('USDT.BEP20')
        if (res.status) {
            setAddress(res.data.address)
        }
    }

    return (
        <KeyBoardSafe>
            <Header {...{ coin, network, theme, address, t }} />
            <Box height={1} backgroundColor={theme.gray2} marginTop={40} />
            <Box padding={30}>
                <Btn
                    onPress={() => Clipboard.setString(address)}
                    alignCenter={false} marginBottom={30}
                >
                    <Txt color={colors.gray5} fontFamily={fonts.IBMPR} size={12}>
                        {t('Wallet address')}
                    </Txt>
                    <Box row justifySpaceBetween alignCenter>
                        <Txt
                            marginLeft={1}
                            fontFamily={fonts.IBMPM}
                            width={width * 70 / 100}
                            color={theme.black}
                        >
                            {network.name ? address || '--' : '--'}
                        </Txt>
                        <Icon
                            source={require('@images/wallet/copy.png')}
                            size={14}
                        />
                    </Box>
                </Btn>

                <Btn
                    alignCenter={false}
                    marginBottom={30}
                    onPress={() => setShowModalNetWork(true)}
                >
                    <Txt color={colors.gray5} size={12} fontFamily={fonts.IBMPR}>
                        {t('Network')}
                    </Txt>
                    <Box row justifySpaceBetween alignCenter>
                        <Txt marginLeft={1} fontFamily={fonts.IBMPM} color={theme.black}>
                            {network.name || '--'}
                        </Txt>
                        <Icon
                            size={20}
                            resizeMode={'contain'}
                            source={require('@images/wallet/convert.png')}
                        />
                    </Box>
                </Btn>

                <Btn alignCenter={false} marginBottom={30}>
                    <Box row alignCenter>
                        <Txt color={colors.gray5} size={12} fontFamily={fonts.IBMPR}>
                            {t('Selected Wallet')}
                        </Txt>
                        <Icon
                            source={require('@images/future/info.png')}
                            size={12}
                            marginLeft={10}
                        />
                    </Box>

                    <Txt marginLeft={1} fontFamily={fonts.IBMPM} color={theme.black}>
                        Spot Wallet
                    </Txt>
                </Btn>
            </Box>
            <ModalNetwork
                show={isShowModalNetwork}
                setShow={setShowModalNetWork}
                setNetWork={setNetWork}
            />
        </KeyBoardSafe>
    )
}

export default DepositCrypto

// import { View, Text } from 'react-native'
// import React from 'react'
// import ComingSoon from '@screen/ComingSoon'

// const DepositCrypto = () => {
//     return (
//         <ComingSoon />
//     )
// }

// export default DepositCrypto