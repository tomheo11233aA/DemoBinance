import { checkTransactionDepositVndThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import { hideBottomTab, useAppDispatch, useAppSelector } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import LoadingYellow from '@reuse/LoadingYellow'
import { loadingFundingSelector, stepDepositFunddingSelector } from '@selector/fundingSelector'
import { depositStep } from '@util/contants'
import { heightBottomTab } from '@util/responsive'
import React, { useEffect } from 'react'
import ConfirmPayment from './confirmPayment/ConfirmPayment'
import Done from './done/Done'
import Payment from './payment/Payment'
import SendImage from './sendImage/SendImage'

const DepositVND = () => {
  const dispatch = useAppDispatch()
  const step = useAppSelector(stepDepositFunddingSelector)

  const loading = useAppSelector(loadingFundingSelector)

  hideBottomTab()

  useEffect(() => {
    dispatch(checkTransactionDepositVndThunk())
  }, [])

  return (
    <>
      {loading ?
        <KeyBoardSafe paddingBottom={heightBottomTab()}>
          <Box flex={1} alignCenter justifyCenter>
            <LoadingYellow />
          </Box>
        </KeyBoardSafe>
        :
        <>
          {step === depositStep.CONFIRM_PAYMENT ?
            <ConfirmPayment /> : step === depositStep.SUBMIT_IMG ?
              <SendImage /> : step === depositStep.DONE ?
                <Done /> : <Payment />
          }
        </>
      }
    </>
  )
}

export default DepositVND