import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import Modality from '@reuse/Modality'
import { height, width } from '@util/responsive'
import React from 'react'
import { KeyboardAvoidingView, Pressable } from 'react-native'

const ModalTypeNetwork = ({ show, setShow, setNetWork }: any) => {
    const theme = useTheme()

    const data = ['TRC20', 'BEP20']

    return (
        <Modality
            show={show}
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
                    paddingBottom={100}
                    borderTopLeftRadius={10}
                    borderTopRightRadius={10}
                    backgroundColor={theme.bg}
                >
                    {data.map(item =>
                        <Btn
                            onPress={() => {
                                setShow(false)
                                setNetWork(item)
                            }}
                            key={item}
                            alignCenter={false}
                            paddingVertical={10}
                        >
                            <Txt color={theme.black}>
                                {item}
                            </Txt>
                        </Btn>
                    )}
                </Box>
            </KeyboardAvoidingView>
        </Modality>
    )
}

export default ModalTypeNetwork