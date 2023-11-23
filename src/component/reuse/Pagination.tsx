import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import React from 'react'

const Pagination = ({
    indexPage,
    total,
    onNext,
    onBack,
    marginTop = 20,
    alignSefl = 'flex-end',
}: any) => {
    return (
        <Box
            row
            alignCenter
            marginTop={marginTop}
            alignSelf={alignSefl}
        >
            <Btn
                onPress={onBack}
                disabled={indexPage < 2}
                opacity={indexPage < 2 ? .5 : 1}
                borderColor={'#3f4041'}
                borderWidth={1}
                height={30}
                width={30}
                alignCenter
                justifyCenter
                radius={5}
            >
                <Txt>{'<'}</Txt>
            </Btn>

            <Box
                borderColor={colors.yellow}
                borderWidth={1}
                height={32}
                width={32}
                alignCenter
                justifyCenter
                radius={5}
                marginHorizontal={2}
            >
                <Txt color={colors.yellow}>{indexPage}</Txt>
            </Box>

            <Btn
                onPress={onNext}
                disabled={!(total >= 1 + indexPage * 10)}
                opacity={!(total >= 1 + indexPage * 10) ? .5 : 1}
                borderColor={'#3f4041'}
                borderWidth={1}
                height={30}
                width={30}
                alignCenter
                justifyCenter
                radius={5}
            >
                <Txt>{'>'}</Txt>
            </Btn>
        </Box>
    )
}

export default Pagination