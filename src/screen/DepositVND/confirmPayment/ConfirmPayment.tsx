import KeyBoardSafe from '@reuse/KeyBoardSafe'
import React from 'react'
import Header from '../payment/Header'
import BuyOrSell from '../payment/BuyOrSell'
import Box from '@commom/Box'
import Form from './Form'

const ConfirmPayment = () => {
    return (
        <KeyBoardSafe>
            <Header />
            <Box paddingHorizontal={15}>
                <BuyOrSell />
                <Form />
            </Box>
        </KeyBoardSafe>
    )
}

export default ConfirmPayment