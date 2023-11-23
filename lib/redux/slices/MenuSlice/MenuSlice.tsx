
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchMenu, updateMenuLock, updateMenu, updateMenuSelected } from './thunks';

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
            .addCase(updateMenu.fulfilled, (state, action) => {
                state[0] = action.payload;
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



// {
//     methodology: "ThinkBeyond",
//     frameworks: [
//         {
//             name: "Micro Frameworks",
//             canvases: [
//                 {
//                     name: "Business Model Canvas",
//                     selected: false,
//                     locked: false,
//                     route: 'BMC'
//                 },
//                 {
//                     name: "Lean Canvas",
//                     selected: false,
//                     locked: true,
//                     route: ''
//                 },
//                 {
//                     name: "Buisness Environment Canvas",
//                     selected: false,
//                     locked: true,
//                     route: ''
//                 },
//                 {
//                     name: "Market Context Canvas",
//                     selected: false,
//                     locked: true,
//                     route: ''
//                 },
//                 {
//                     name: "Value Proposisition Canvas",
//                     selected: false,
//                     locked: true,
//                     route: 'CVP'
//                 },
//                 {
//                     name: "Empathy Canvas",
//                     selected: false,
//                     locked: true,
//                     route: ''
//                 },
//                 {
//                     name: "Personal Building Canvas",
//                     selected: false,
//                     locked: true,
//                     route: ''
//                 },
//                 {
//                     name: "Value Chain Mapping Canvas",
//                     selected: false,
//                     locked: true,
//                     route: ''
//                 },
//                 {
//                     name: "Competitor Matrix",
//                     selected: false,
//                     locked: true,
//                     route: ''
//                 },
//                 {
//                     name: "Journey Mapping Canvas",
//                     selected: false,
//                     locked: true,
//                     route: ''
//                 },
//                 {
//                     name: "Market Sizing Canvas",
//                     selected: false,
//                     locked: true,
//                     route: ''
//                 },
//             ],
//         },
//     ],
// }