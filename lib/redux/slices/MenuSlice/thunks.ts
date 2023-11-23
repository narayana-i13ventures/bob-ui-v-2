import { APIfetchMenu, APIUpdateLock, APIUpdateMenu, APIUpdateSelected } from "../../apiCalls";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const fetchMenu = createAppAsyncThunk(
    'menu/fetchMenu',
    async () => {
        try {
            const response = await APIfetchMenu();
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const updateMenu = createAppAsyncThunk(
    'menu/updateMenu',
    async (data: any) => {
        try {
            const response = await APIUpdateMenu(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const updateMenuLock = createAppAsyncThunk(
    'menu/updateMenuLock',
    async (data: any) => {
        try {
            const response = await APIUpdateLock(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const updateMenuSelected = createAppAsyncThunk(
    'menu/updateMenuSelected',
    async (data: any) => {
        try {
            const response = await APIUpdateSelected(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
);


