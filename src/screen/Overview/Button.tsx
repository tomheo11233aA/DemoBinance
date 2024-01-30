import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import { navigate } from '@navigation/navigationRef'
import { profileUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { width } from '@util/responsive'
import { screen } from '@util/screens'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Profile } from 'src/model/userModel'

const Button = ({ t }: any) => {
    const theme = useTheme()
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    return (
        <Box zIndex={-1}> 
            <Box row alignCenter marginVertical={10}>
                <Btn
                    style={styles.btn}
                    // backgroundColor={theme.gray2}
                    backgroundColor={colors.yellow}
                    onPress={() => navigate(screen.SPOT_COIN, {
                        coin: {
                            currency: 'USDT',
                            balance: profile.balance,
                            exchangeRate: profile.balance,
                            id: 18092002,
                            wallet: 'USDT'
                        }
                    })}
                >
                    <Txt size={14} fontType={'500'} fontFamily={fonts.BNPSB}>
                        {t('Deposit')}
                    </Txt>
                </Btn>

                <Btn
                    onPress={() => navigate(screen.SPOT_COIN, {
                        coin: {
                            currency: 'USDT',
                            balance: profile.balance,
                            exchangeRate: profile.balance,
                            id: 18092002,
                            wallet: 'USDT'
                        }
                    })}
                    marginLeft={10}
                    style={styles.btn}
                    // backgroundColor={colors.yellow}
                    backgroundColor={theme.gray2}
                >
                    <Txt fontFamily={fonts.BNPSB} size={14} fontType={'500'} color={theme.black}>{t('Withdraw')}</Txt>
                </Btn>
            </Box>

            <Box
                height={4}
                width={width}
                marginTop={10}
                marginLeft={-20}
                backgroundColor={theme.gray}
            />
        </Box>
    )
}

export default Button

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        height: 33,
        borderRadius: 5,
        fontSize: 13,
    }
})