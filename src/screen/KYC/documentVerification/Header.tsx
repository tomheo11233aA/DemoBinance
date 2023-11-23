import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import { goBack } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { Animated, View } from 'react-native'
import ModalCountry from './ModalCountry'
import { countryKYCSelector } from '@selector/kycSelector'
import { SvgUri } from 'react-native-svg'
import { useTranslation } from 'react-i18next'

const Header = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const country = useAppSelector(countryKYCSelector)
    const [isShowModalCountry, setShowModalCountry] = useState<boolean>(false)

    return (
        <View>
            <Btn
                marginRight={20}
                alignSelf={'flex-end'}
                onPress={() => goBack()}
            >
                <Icon
                    size={15}
                    tintColor={'#b6bdc6'}
                    source={require('@images/future/close.png')}
                />
            </Btn>

            <Box marginTop={10}>
                <Box height={5} backgroundColor={theme.gray} />
                <Box height={5} backgroundColor={colors.yellow} width={'50%'} absolute />
            </Box>

            <Txt marginTop={25} color={theme.black} fontFamily={fonts.IBMPM} size={25}>
                {t('Document Verification')}
            </Txt>

            <Box>
                <Txt fontFamily={fonts.IBMPR} marginTop={15} size={15} color={theme.black}>
                    {t('Document Issuing Country/Region')}
                </Txt>
                <Btn
                    row
                    radius={5}
                    height={50}
                    padding={10}
                    marginTop={10}
                    borderWidth={1}
                    justifySpaceBetween
                    justifyCenter={false}
                    borderColor={theme.gray}
                    onPress={() => setShowModalCountry(true)}
                >
                    <Box row alignCenter>
                        <Animated.View style={{
                            width: 25,
                            height: 25,
                            borderRadius: 50,
                            overflow: 'hidden',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <SvgUri
                                width={35}
                                height={35}
                                uri={country.flag}
                            />
                        </Animated.View>
                        <Txt marginLeft={10} color={theme.black}>
                            {country.country}
                        </Txt>
                    </Box>
                    <Icon
                        size={15}
                        source={require('@images/trade/more.png')}
                    />
                </Btn>
            </Box>
            <ModalCountry
                show={isShowModalCountry}
                setShow={setShowModalCountry}
            />
        </View>
    )
}

export default Header