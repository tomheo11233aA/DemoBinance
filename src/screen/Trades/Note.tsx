import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

const Note = ({ text }: { text: string }) => {
    return (
        <Box row marginVertical={2}>
            <Txt size={6} marginTop={5} marginRight={15} color={colors.gray5}>●</Txt>
            <Txt fontFamily={fonts.SGM} color={colors.gray5}>
                {text}
            </Txt>
        </Box>
    )
}

export default Note