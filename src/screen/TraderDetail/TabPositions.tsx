import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import TabCurrentPosition from './TabCurrentPosition'

const TabPositions = ({ theme, t }: any) => {
    return (
        <Box>
            {/* <Box row marginTop={20}>
                <Box
                    radius={50}
                    paddingVertical={7}
                    paddingHorizontal={10}
                    backgroundColor={theme.yellow}
                >
                    <Txt color={colors.yellowBold} fontFamily={fonts.IBMPR}>
                        {t('Positions')}
                    </Txt>
                </Box>
                <Box
                    radius={50}
                    paddingVertical={7}
                    paddingHorizontal={10}
                    backgroundColor={theme.bg}
                >
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR}>
                        {t('Transaction history')}
                    </Txt>
                </Box>
            </Box> */}

            <TabCurrentPosition {...{ theme, t }} />
        </Box>
    )
}

export default TabPositions