import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { goBack } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'
import { TouchableOpacity } from 'react-native'
import { Coin } from 'src/model/tradeModel'

interface Props {
    t: any;
    theme: any;
    coin: Coin;
    network: any;
    address: string;
}

const Header = ({ coin, network, theme, address, t }: Props) => {
    return (
        <Box paddingHorizontal={10}>
            <Box alignCenter>
                <Txt
                    size={16}
                    fontFamily={fonts.IBMPM}
                    color={theme.black}
                >
                    {t('Deposit')} {coin.currency}
                </Txt>

                <TouchableOpacity
                    onPress={() => goBack()}
                    style={{
                        top: 4,
                        left: 10,
                        position: 'absolute',
                    }}
                >
                    <Icon
                        size={18}
                        source={require('@images/back2.png')}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </Box>

            <Box alignCenter>
                {(network.name && address) ?
                    <Box marginTop={40}>
                        <QRCode
                            size={150}
                            value={address}
                            color={theme.grayBlue}
                            backgroundColor={theme.bg}
                        />
                    </Box>
                    :
                    <Icon
                        source={require('@images/wallet/hourglass.png')}
                        size={60}
                        marginTop={40}
                    />
                }

                <Txt fontFamily={fonts.IBMPM} marginVertical={15} color={theme.black}>
                    {t('Choose network to get deposit address')}
                </Txt>
                <Txt paddingHorizontal={20} color={colors.gray5} center fontFamily={fonts.IBMPR} size={12}>
                    {t('Wait for the blockchain network to confirm your transfer. After the network confirmation, Binance will credit the crypto for you')}
                </Txt>
            </Box>
        </Box>
    )
}

export default Header