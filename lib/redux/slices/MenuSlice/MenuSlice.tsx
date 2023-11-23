
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchMenu, updateMenuLock, updateMenuSelected } from './thunks';

const initialState: any = []
export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        // Action to toggle the 'selected' state of a canvas by name
        setCanvasSelected: (state, action) => {
            const { canvasName, value } = action.payload;
            const canvas = state[0].frameworks[0].canvases.find((c: any) => c.name === canvasName);
            if (canvas) {
                canvas.selected = value;
            }
        },

        // Action to toggle the 'locked' state of a canvas by name
        toggleCanvasLocked: (state, action) => {
            const { canvasName, value } = action.payload;
            const canvas = state[0].frameworks[0].canvases.find((c: any) => c.name === canvasName);
            if (canvas) {
                canvas.locked = value;
            }
        },
        setCanvas: (state, action) => {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state = action.payload;
                return state;
            })
            .addCase(updateMenuLock.fulfilled, (state, action) => {
                state = action.payload;
                return state;
            })
            .addCase(updateMenuSelected.fulfilled, (state, action) => {
                state = action.payload;
                return state;
            })
    }
})

