import KeyBoardSafe from '@reuse/KeyBoardSafe'
import React, { useState } from 'react'
import Header from './Header'
import DatePNL from './DatePNL'
import Footer from './Footer'
import { hideBottomTab } from '@hooks/index'
import { delay } from '@method/alert'

const PNLAnalysis = () => {
  hideBottomTab()

  const [refresh, setRefresh] = useState(false)

  const handleRefresh = async () => {
    setRefresh(true)
    await delay(2000)
    setRefresh(false)
  }

  return (
    <KeyBoardSafe
      refesh={refresh}
      onRefesh={handleRefresh}
    >
      {refresh ?
        <></>
        :
        <>
          <Header />
          <DatePNL />
          <Footer />
        </>
      }
    </KeyBoardSafe>
  )
}

export default PNLAnalysis