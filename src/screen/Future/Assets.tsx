import NoData from '@reuse/NoData'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Assets = () => {
  const { t } = useTranslation()
  return (
    <NoData message={t('You have no assets')} />
  )
}

export default Assets