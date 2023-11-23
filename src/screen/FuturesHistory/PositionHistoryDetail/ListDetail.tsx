import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Item from './Item'

const ListDetail = ({ listDetail, positionItem }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box
            marginTop={5}
            paddingHorizontal={15}
            backgroundColor={theme.bg}
        >
            <Txt
                color={theme.black}
                fontFamily={fonts.IBMPM}
                paddingVertical={15}
            >
                {t('Transaction details')}
            </Txt>
            <Box>
                {listDetail.map((item: any) =>
                    <Item
                        t={t}
                        item={item}
                        theme={theme}
                        key={item.id}
                        positionItem={positionItem}
                    />
                )}
            </Box>
        </Box>
    )
}

export default ListDetail