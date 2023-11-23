import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { useAppDispatch, useTheme } from '@hooks/index'
import Modality from '@reuse/Modality'
import { setCountry } from '@slice/kycSlice'
import { fonts } from '@theme/fonts'
import { IcountryImage, countryImage } from '@util/countryImage'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import Animated from 'react-native-reanimated'
import { SvgUri } from 'react-native-svg'

const ModalCountry = ({ show, setShow }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState<string>('')

    const renderItem = ({ item }: { item: IcountryImage }) => {
        return (
            <Btn
                row
                padding={15}
                justifyCenter={false}
                onPress={() => {
                    dispatch(setCountry(item))
                    setShow(false)
                }}
            >
                <Animated.View style={{
                    borderRadius: 50,
                    overflow: 'hidden',
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <SvgUri
                        width={40}
                        height={40}
                        uri={item.flag}
                    />
                </Animated.View>
                <Txt
                    marginLeft={10}
                    color={theme.black}
                    fontFamily={fonts.IBMPM}
                >
                    {item.country}
                </Txt>
            </Btn>
        )
    }

    const countryFilter = countryImage.filter(
        (country) => country.country.toLocaleUpperCase().includes(search.toLocaleUpperCase())
    )

    return (
        <Modality
            show={show}
            setShow={() => setShow(false)}
        >
            <Box
                absolute
                bottom={0}
                padding={20}
                width={'100%'}
                height={'70%'}
                borderTopLeftRadius={15}
                borderTopRightRadius={15}
                backgroundColor={theme.bg}
            >
                <Box row alignCenter justifySpaceBetween>
                    <Txt fontFamily={fonts.IBMPM} size={20} color={theme.black}>
                        {t('Country/Region of Issue')}
                    </Txt>
                    <Btn onPress={() => setShow(false)}>
                        <Icon
                            size={15}
                            source={require('@images/future/close.png')}
                        />
                    </Btn>
                </Box>
                <Box
                    row
                    radius={5}
                    height={45}
                    alignCenter
                    marginTop={15}
                    borderWidth={1}
                    borderColor={theme.gray}
                >
                    <Icon
                        size={17}
                        marginHorizontal={20}
                        source={require('@images/home/search.png')}
                    />
                    <Box flex={1}>
                        <Input
                            height={40}
                            value={search}
                            paddingRight={20}
                            hint={t('Search')}
                            color={theme.black}
                            onChangeText={setSearch}
                        />
                    </Box>
                </Box>
                <FlatList
                    data={countryFilter}
                    renderItem={renderItem}
                    keyExtractor={item => item.flag}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            </Box>
        </Modality>
    )
}

export default ModalCountry