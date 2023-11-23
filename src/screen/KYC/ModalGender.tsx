import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import Modality from '@reuse/Modality'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ModalGender = ({ show, setShow, onChangeGender }: any) => {
    const { t } = useTranslation()
    const theme = useTheme()
    return (
        <Modality
            show={show}
            animation={'slide'}
            setShow={() => setShow(false)}
        >
            <Box
                absolute
                bottom={0}
                width={'100%'}
                height={'20%'}
                borderTopLeftRadius={15}
                borderTopRightRadius={15}
                backgroundColor={theme.bg}
            >
                <Btn
                    onPress={() => onChangeGender(1)}
                    padding={15}
                    width={'100%'}
                    alignCenter={false}
                >
                    <Txt color={theme.black}>{t('Male')}</Txt>
                </Btn>

                <Btn
                    onPress={() => onChangeGender(2)}
                    padding={15}
                    width={'100%'}
                    alignCenter={false}
                >
                    <Txt color={theme.black}>{t('Female')}</Txt>
                </Btn>
            </Box>
        </Modality>
    )
}

export default ModalGender