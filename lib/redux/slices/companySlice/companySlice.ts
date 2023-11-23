import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchCompany } from './thunks';

const initialState = {
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
    loading: true,
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompany.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCompany.fulfilled, (state, action) => {
                if (Object.keys(action.payload).length > 0) {
                    state.loading = false
                    const { id, ...companyWithoutId } = action.payload;
                    state.company = companyWithoutId;
                } else {
                    return state
                }
            })
            .addCase(fetchCompany.rejected, (state) => {
                state.loading = false
            })
    },
})
