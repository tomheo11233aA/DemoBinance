import { View, Text } from 'react-native'
import React from 'react'
import Modality from '@reuse/Modality'
import Box from '@commom/Box'

const ModalBuy = ({ show, setShow }: any) => {
    return (
        <Modality
            show={show}
            setShow={setShow}
        >
            <Box></Box>
        </Modality>
    )
}

export default ModalBuy