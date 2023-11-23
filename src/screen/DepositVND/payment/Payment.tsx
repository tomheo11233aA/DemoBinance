import Box from '@commom/Box'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import React from 'react'
import { useTranslation } from 'react-i18next'
import BuyOrSell from './BuyOrSell'
import Form from './Form'
import Header from './Header'
import Warn from './Warn'

const Payment = () => {
    const { t } = useTranslation()

    return (
        <KeyBoardSafe>
            <Header />
            <Box paddingHorizontal={15}>
                <BuyOrSell />
                <Form />
                <Warn title={t('You must transfer the exact amount you created the order.')} />
                <Warn title={t('The system will automatically update the balance.')} />
                <Warn title={t('If you transfer the wrong amount of the order, we will not be responsible for the lost money.')} />
            </Box>
        </KeyBoardSafe>
    )
}

export default Payment