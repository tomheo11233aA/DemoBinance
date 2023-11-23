import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import { fonts } from '@theme/fonts'
import { useAppSelector, useTheme } from '@hooks/index'
import Txt from '@commom/Txt'
import { kycUserSelector, profileUserSelector } from '@selector/userSelector'
import { Profile } from 'src/model/userModel'
import contants from '@util/contants'
import { useTranslation } from 'react-i18next'
import { colors } from '@theme/colors'
import Btn from '@commom/Btn'
import ModalExampleHX from './ModalExampleHX'

const TokenBalance = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const kyc = useAppSelector(kycUserSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    const [isShowModalHX, setShowModalHX] = useState(false)

    return (
        <>
            {kyc != contants.KYC_APPROVED ?
                <></> :
                <Box>
                    <Box row alignCenter justifySpaceBetween marginTop={25}>
                        <Box row alignCenter>
                            <Icon
                                source={require('@images/profile/user.png')}
                                size={15}
                                tintColor={'#90929E'}
                                marginRight={10}
                                resizeMode={'contain'}
                            />
                            <Txt fontFamily={fonts.IBMPR} size={12} color={theme.black}>
                                Token balance
                            </Txt>
                        </Box>
                        <Txt color={theme.black} fontFamily={fonts.M24}>
                            {profile.tokenBalance}
                        </Txt>
                    </Box>
                    <Txt
                        size={10}
                        color={theme.bg == 'white' ? colors.yellowBold : colors.yellow}
                        marginTop={5}
                    >
                        {t('Trade a certain volume and you will unlock a certain number of HX')}
                    </Txt>
                    <Btn
                        onPress={() => setShowModalHX(true)}
                        alignSelf={'flex-start'}
                        backgroundColor={colors.yellow}
                        paddingVertical={5}
                        paddingHorizontal={10}
                        radius={2}
                        marginTop={5}
                    >
                        <Txt size={12} fontFamily={fonts.AS}>
                            {t('Example')}
                        </Txt>
                    </Btn>
                </Box>
            }
            <ModalExampleHX
                show={isShowModalHX}
                setShow={setShowModalHX}
            />
        </>
    )
}

export default TokenBalance