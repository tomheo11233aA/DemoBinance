import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import Modality from '@reuse/Modality'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import { colors } from '@theme/colors'
import { height, width } from '@util/responsive'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KeyboardAvoidingView, Pressable } from 'react-native'
import ItemModalType from './ItemModalType'

interface Props {
    type: string;
    show: boolean;
    setShow: Function;
    onSetType: Function;
}

const ModalType = ({
    show,
    type,
    setShow,
    onSetType,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const coins = useAppSelector(coinsFuturesChartSelector)
    const [search, setSearch] = useState('')

    const data = ['Limit', 'Market']

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
                    width={'100%'}
                    paddingBottom={50}
                    paddingHorizontal={20}
                    borderTopLeftRadius={10}
                    borderTopRightRadius={10}
                    backgroundColor={theme.bg}
                >
                    <Box>
                        <Btn
                            justifySpaceBetween
                            paddingVertical={20}
                            borderBottomWidth={1}
                            borderColor={theme.gray2}
                            onPress={() => onSetType('All')}
                        >
                            <Txt color={type === 'All' ? colors.yellow : colors.grayBlue}>
                                {t('All')}
                            </Txt>
                        </Btn>
                        {data.map((item) =>
                            <ItemModalType
                                t={t}
                                item={item}
                                type={type}
                                key={item}
                                theme={theme}
                                onSetType={onSetType}
                            />
                        )}
                    </Box>
                </Box>
            </KeyboardAvoidingView>

        </Modality>
    )
}

export default ModalType