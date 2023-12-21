import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
    company: {
        companyName: '',
        industry: '',
        vertical: '',
        companyType: '',
        companySize: '',
        companyHeadquarters: '',
        companyTargetRegions: '',
        fundingStage: '',
        annualRevenue: '',
        businessModel: '',
    },
}

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanyName(state, action) {
            state.company.companyName = action.payload;
        },
        setIndustry(state, action) {
            state.company.industry = action.payload;
        },
        setVertical(state, action) {
            state.company.vertical = action.payload;
        },
        setCompanyType(state, action) {
            state.company.companyType = action.payload;
        },
        setCompanySize(state, action) {
            state.company.companySize = action.payload;
        },
        setCompanyHeadquarters(state, action) {
            state.company.companyHeadquarters = action.payload;
        },
        setCompanyTargetRegions(state, action) {
            state.company.companyTargetRegions = action.payload;
        },
        setFundingStage(state, action) {
            state.company.fundingStage = action.payload;
        },
        setAnnualRevenue(state, action) {
            state.company.annualRevenue = action.payload;
        },
        setBusinessModel(state, action) {
            state.company.businessModel = action.payload;
        }
    },
    extraReducers: (builder) => { },
})
