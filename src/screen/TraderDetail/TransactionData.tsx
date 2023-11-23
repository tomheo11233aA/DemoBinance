import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import TabTradingData from './TabTradingData'
import TabPositions from './TabPositions'
import TabCopiers from './TabCopiers'
import TabFutureHistory from './TabFutureHistory'
import Scroll from '@commom/Scroll'

const TRADING_DATA = 'Trading data'
const POSITIONS = 'Positions'
const COPIERS = 'Copiers'
const FUTURE_HISTORY = 'Future history'

const TransactionData = ({ theme, t }: any) => {
  const [tabChoosed, setTabChoosed] = useState(TRADING_DATA)
  const tabs = [TRADING_DATA, POSITIONS, COPIERS, FUTURE_HISTORY]

  return (
    <Box paddingHorizontal={15} marginTop={20}>
      <Scroll horizontal>
        <Box row borderBottomWidth={1} borderColor={theme.gray2}>
          {tabs.map((tab) =>
            <Btn
              key={tab}
              marginRight={20}
              justifySpaceBetween
              onPress={() => setTabChoosed(tab)}
            >
              <Txt
                marginVertical={10}
                fontFamily={fonts.IBMPM}
                color={tabChoosed == tab ? theme.black : colors.grayBlue}
              >
                {t(tab)}
              </Txt>
              {tabChoosed == tab &&
                <Box width={'100%'} height={2} backgroundColor={theme.black} marginBottom={-1} />
              }
            </Btn>
          )}
        </Box>
      </Scroll>

      {tabChoosed == TRADING_DATA ?
        <TabTradingData {...{ theme, t }} /> :
        tabChoosed == POSITIONS ?
          <TabPositions {...{ theme, t }} /> :
          tabChoosed == COPIERS ?
            <TabCopiers {...{ theme, t }} /> : <TabFutureHistory {...{ theme, t }} />
      }
    </Box>
  )
}

export default TransactionData