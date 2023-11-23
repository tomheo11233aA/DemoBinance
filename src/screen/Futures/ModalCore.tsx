import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import Modality from '@reuse/Modality'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SliderCore from './SliderCore'

interface Props {
    show: boolean,
    setShow: Function,
}

const ModalCore = ({ show, setShow }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Modality
            animation={'slide'}
            show={show}
            setShow={setShow}
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
                    <Txt bold fontFamily={fonts.AS} size={16} marginBottom={10} color={theme.black}>
                        {t('Select Default Leverage')}
                    </Txt>
                    <Btn onPress={() => setShow(false)}>
                        <Icon
                            source={require('@images/future/close.png')}
                            size={17}
                        />
                    </Btn>
                </Box>

                <SliderCore {...{ setShow, t }} />
            </Box>
        </Modality>
    )
}

export default ModalCore