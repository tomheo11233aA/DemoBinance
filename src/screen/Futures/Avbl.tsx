import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppSelector } from '@hooks/index'
import { calcPositions, numberCommasDot } from '@method/format'
import { coinsFuturesChartSelector, positionsFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Profile } from 'src/model/userModel'

const Avbl = ({ theme }: any) => {
    const { t } = useTranslation()
    // const coins = useAppSelector(coinsFuturesChartSelector)
    // const positions = useAppSelector(positionsFuturesSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    // let result = profile.balance

    // const positionObj = calcPositions(positions, coins)
    // result = profile.balance + positionObj.pnl + positionObj.margin

    return (
        <Box
            row
            justifySpaceBetween
            marginBottom={7}
            alignCenter
        >
            <Txt color={colors.gray5} size={12}>
                {t('Avbl')}
            </Txt>

            <Box row>
                <Txt size={13} fontFamily={'Myfont21-Regular'} color={theme.black}>
                    {numberCommasDot(profile?.balance.toFixed(3))}
                    <Txt size={11} fontFamily={fonts.IBMPR} color={theme.black}>
                        {' USDT'}
                    </Txt>
                </Txt>

                <Icon
                    source={require('@images/future/cv.png')}
                    size={15}
                    resizeMode={'contain'}
                    marginLeft={10}
                    marginTop={0}
                />
            </Box>
        </Box>
    )
}

export default Avbl