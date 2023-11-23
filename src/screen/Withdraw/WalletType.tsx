import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { theme } from '@theme/index'
import { StyleSheet } from 'react-native'
import { BEP20, TRC20 } from './FormWithdraw'
import { colors } from '@theme/colors'
const HEIGHT_BUTTON = 35
const WIDTH_BUTTON = 80
const SIZE = 14

const WalletType = ({ wallet, setWallet, t }: any) => {
    return (
        <Box row marginTop={20} marginBottom={30}>
            {wallet === BEP20 ?
                <Btn
                    width={WIDTH_BUTTON}
                    height={HEIGHT_BUTTON}
                    backgroundColor={colors.yellow}
                >
                    <Txt>{t('BEP20')}</Txt>
                </Btn>
                :
                <Btn
                    style={[styles.buttonWallet, { marginRight: 10 }]}
                    onPress={() => setWallet(BEP20)}
                >
                    <Txt>{t('BEP20')}</Txt>
                </Btn>
            }

            {wallet === TRC20 ?
                <Btn
                    width={WIDTH_BUTTON}
                    height={HEIGHT_BUTTON}
                    backgroundColor={colors.yellow}
                >
                    <Txt>{t('TRC20')}</Txt>
                </Btn> :
                <Btn
                    style={[styles.buttonWallet, { marginLeft: 10 }]}
                    onPress={() => setWallet(TRC20)}
                >
                    <Txt>{t('TRC20')}</Txt>
                </Btn>
            }
        </Box>
    )
}

export default WalletType

const styles = StyleSheet.create({
    buttonWallet: {
        height: HEIGHT_BUTTON,
        width: WIDTH_BUTTON,
        borderWidth: 1,
        borderColor: theme.colors.gray4,
        backgroundColor: colors.gray3
    }
})