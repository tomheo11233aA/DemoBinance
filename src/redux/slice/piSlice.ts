import { createSlice } from "@reduxjs/toolkit";
import { LENGHT_CHART } from "@screen/PI.tsx";

interface IPiSlice {
    chart: any;
    chartLagre: any;
}

const initialState: IPiSlice = {
    chart: [],
    chartLagre: [],
}

const piSlice = createSlice({
    name: 'pi',
    initialState,
    reducers: {
        setChart: (state, { payload }) => {
            state.chart = payload.slice(payload.length - LENGHT_CHART, payload.length)
            state.chartLagre = payload
        },
        setChartFromSocket: (state, { payload }) => {
            state.chart[state.chart.length - 1] = payload
            state.chartLagre[state.chartLagre.length - 1] = payload
        },
    },
})

export const {
    setChart,
    setChartFromSocket,
} = piSlice.actions

export default piSlice