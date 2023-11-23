import { View, Text, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import Modality from '@reuse/Modality'
import Box from '@commom/Box'
import { useAppSelector, useTheme } from '@hooks/index'
import { useTranslation } from 'react-i18next'
import Txt from '@commom/Txt'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import { fonts } from '@theme/fonts'
import Input from '@commom/Input'
import { colors } from '@theme/colors'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import ItemModalAsset from './ItemModalAsset'
import { height, width } from '@util/responsive'
import Scroll from '@commom/Scroll'

interface Props {
    type: string;
    show: boolean;
    setShow: Function;
    onSetType: Function;
}

const ModalAsset = ({
    show,
    type,
    setShow,
    onSetType,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const coins = useAppSelector(coinsFuturesChartSelector)
    const [search, setSearch] = useState('')

    const data = coins.filter(
        (coin) => coin.currency.toLocaleUpperCase().includes(search.toLocaleUpperCase())
    )

    return (
        <Modality
            show={show}
            close={false}
            setShow={setShow}
            animation={'slide'}
        >
            <KeyboardAvoidingView behavior={"position"}>
                <Pressable onPress={() => setShow(false)}>
                    <Box width={width} height={height} opacity={0} />
                </Pressable>
                <Box
                    absolute
                    bottom={0}
                    padding={20}
                    width={'100%'}
                    paddingBottom={50}
                    borderTopLeftRadius={10}
                    borderTopRightRadius={10}
                    backgroundColor={theme.bg}
                >
                    <Box row justifySpaceBetween>
                        <Btn opacity={0}>
                            <Icon
                                size={12}
                                source={require('@images/future/close.png')}
                            />
                        </Btn>
                        <Txt fontFamily={fonts.IBMPM} color={theme.black}>
                            {t('Select asset')}
                        </Txt>
                        <Btn onPress={() => setShow(false)}>
                            <Icon
                                size={12}
                                source={require('@images/future/close.png')}
                            />
                        </Btn>
                    </Box>

                    <Box
                        row
                        alignCenter
                        marginTop={20}
                    >
                        <Box
                            flex={1}
                            height={30}
                            radius={20}
                            justifyCenter
                            backgroundColor={theme.gray2}
                        >
                            <Input
                                height={40}
                                paddingHorizontal={40}
                                color={colors.grayBlue}
                                style={{ fontSize: 12 }}
                                onChangeText={setSearch}
                                hint={t('Search for symbol')}
                            />
                            <Box width={20} absolute left={10}>
                                <Icon
                                    source={require('@images/home/search.png')}
                                    size={12}
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Scroll height={height * 40 / 100}>
                        <Btn
                            row
                            justifySpaceBetween
                            paddingVertical={20}
                            borderBottomWidth={1}
                            borderColor={theme.gray2}
                            onPress={() => onSetType('All')}
                        >
                            <Txt color={colors.grayBlue}>
                                {t('All')}
                            </Txt>
                            {type === 'All' &&
                                <Txt size={15} bold color={colors.yellow}>
                                    ✓
                                </Txt>
                            }
                        </Btn>
                        {data.map((coin) =>
                            <ItemModalAsset
                                coin={coin}
                                type={type}
                                key={coin.id}
                                theme={theme}
                                onSetType={onSetType}
                            />
                        )}
                    </Scroll>
                </Box>
            </KeyboardAvoidingView>

        </Modality>
    )
}

export default ModalAsset