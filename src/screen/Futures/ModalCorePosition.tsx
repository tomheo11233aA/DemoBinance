import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import Modality from '@reuse/Modality'
import { leverAdjustmentFuturesSelectoe } from '@selector/futuresSelector'
import futuresSlice from '@slice/futuresSlice'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SliderCorePosition from './SliderCorePosition'

const ModalCorePosition = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const leverAdjustment = useAppSelector(leverAdjustmentFuturesSelectoe)

    return (
        <Modality
            animation={'slide'}
            show={leverAdjustment.showModal}
            setShow={() => { }}
            close={false}
        >
            <Box
                width={'100%'}
                backgroundColor={theme.bg}
                absolute
                paddingBottom={50}
                bottom={0}
                borderTopRightRadius={10}
                borderTopLeftRadius={10}
                padding={20}
            >
                <Box
                    row
                    justifySpaceBetween
                    alignCenter
                >
                    <Box />
                    <Txt
                        bold
                        fontFamily={fonts.AS}
                        size={16}
                        marginBottom={10}
                        color={theme.black}
                    >
                        {t('Select Default Leverage')}
                    </Txt>
                    <Btn
                        onPress={() => dispatch(futuresSlice.actions.setLeverAdjustment({
                            ...leverAdjustment,
                            showModal: false,
                        }))
                        }
                    >
                        <Icon
                            size={17}
                            source={require('@images/future/close.png')}
                        />
                    </Btn>
                </Box>

                <SliderCorePosition />
            </Box>
        </Modality>
    )
}

export default ModalCorePosition