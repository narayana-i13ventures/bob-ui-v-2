import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { APIcreateCompany, APIfetchCompany } from "../../apiCalls";
import { Company } from "@/app/Interfaces";

export const fetchCompany = createAppAsyncThunk(
    'company/fetchCompany',
    async () => {
        const response = await APIfetchCompany()
        return response
    }
)
export const createCompany = createAppAsyncThunk(
    'company/createCompany',
    async (data: Company) => {
        const response = await APIcreateCompany(data)
        return response
    }
)