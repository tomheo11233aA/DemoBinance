import Box from '@commom/Box';
import Txt from '@commom/Txt';
import { delay } from '@method/alert';
import Modality from '@reuse/Modality'
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Modal, Pressable } from 'react-native';

interface Props {
    show: boolean;
    message: string;
    setShow: Function;
    setMessage: Function,
}

const ModalAlertOrder = ({
    show,
    setShow,
    message,
    setMessage,
}: Props) => {
    const { t } = useTranslation()

    useEffect(() => {
        handleTimeOut()
    }, [])

    const handleTimeOut = async () => {
        await delay(2000)
        setShow(false)
        setMessage('')
    }

    return (
        <Modal
            visible={show}
            transparent={true}
            animationType={'fade'}
        >
            <Pressable
                onPress={() => setShow(false)}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
                <Box
                    radius={5}
                    maxWidth={'90%'}
                    paddingVertical={10}
                    paddingHorizontal={20}
                    backgroundColor={colors.grayBlue4}
                >
                    <Txt color={'white'} fontFamily={fonts.IBMPM}>
                        {t(message)}
                    </Txt>
                </Box>
            </Pressable>
        </Modal>
    )
}

export default ModalAlertOrder