import Box from '@commom/Box'
import Txt from '@commom/Txt'
import LoadingBlack from '@reuse/LoadingBlack'
import Pagination from '@reuse/Pagination'
import { getHistoryDeposit } from '@service/fundingService'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import HeaderTableHistory from './HeaderTableHistory'
import ItemHistory from './ItemHistory'
import ModalDetailHistory from './ModalDetailHistory'

const History = () => {
    const { t } = useTranslation()
    const [historys, setHistorys] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [historyDetail, setHistoryDetail] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        handleGetHistoryDeposit(1)
    }, [])

    const handleGetHistoryDeposit = async (page: number) => {
        setLoading(true)
        const res = await getHistoryDeposit({
            limit: 10,
            page
        })
        if (res.status) {
            setHistorys(res.data.array)
            setTotal(res.data.total)
            setLoading(false)
            setPage(page)
        }
    }

    const handleShowDetailHistory = async (history: any) => {
        setHistoryDetail(history)
        setShowModal(true)
    }

    return (
        <Box marginTop={20} paddingHorizontal={10}>
            <Txt bold size={18}>{t('Deposit history')}</Txt>
            {loading ? (
                <LoadingBlack />
            ) : (
                <>
                    <Pagination
                        marginTop={10}
                        indexPage={page}
                        total={total}
                        onNext={() => handleGetHistoryDeposit(page + 1)}
                        onBack={() => handleGetHistoryDeposit(page - 1)}
                    />
                    <HeaderTableHistory />
                    {historys.map((history: any) =>
                        <ItemHistory
                            key={history.id}
                            history={history}
                            onShowDetailHistory={handleShowDetailHistory}
                            t={t}
                        />
                    )}
                </>
            )}
            <ModalDetailHistory
                show={showModal}
                setShow={setShowModal}
                histoyDetail={historyDetail}
            />
        </Box>
    )
}

export default History