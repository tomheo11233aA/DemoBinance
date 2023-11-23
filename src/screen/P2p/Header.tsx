import Box from '@commom/Box'
import React from 'react'
import Convert from './Convert'
import TabTop from './TabTop'
import RecommendFollow from './RecommendFollow'

const Header = () => {
  return (
    <Box paddingHorizontal={15}>
        <Convert />
        <TabTop />
        <RecommendFollow />
    </Box>
  )
}

export default Header