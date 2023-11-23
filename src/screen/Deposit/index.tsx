import Box from '@commom/Box'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import ToastTop from '@reuse/ToastTop'
import React, { useRef } from 'react'
import History from './History'
import USDT from './USDT'

const Deposit = () => {
  const toastTopRef = useRef(null)

  return (
    <Box flex={1}>
      <ToastTop ref={toastTopRef} />
      <KeyBoardSafe paddingBottom={0}>
        <USDT toastTopRef={toastTopRef} />
        <History />
      </KeyBoardSafe>
    </Box>
  )
}

export default Deposit