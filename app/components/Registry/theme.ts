import { PaletteMode } from '@mui/material';

interface AppTheme {
    mode?: PaletteMode;
}

export const generateThemeOptions = (appTheme: AppTheme): any => {
    const mode = appTheme.mode || 'light';
    const primaryColor = '#5DD140';
    const secondaryColor = '#5DD140';
    const backgroundColor = mode === 'light' ? '#ffffff' : '#010101';
    const cardBackgroundColor = mode === 'light' ? '#f2f2f2' : '#272727';
    const lightBoxShadow = '2px 2px 10px rgba(0, 0, 0, 0.2)';
    const darkBoxShadow = '2px 2px 10px rgba(255, 255, 255, 0.3)';
    const contrastBg = mode === 'light' ? '#fff' : '#000';

    return {
        palette: {
            mode: mode,
            primary: {
                main: primaryColor,
            },
            secondary: {
                main: secondaryColor,
            },
            background: {
                default: backgroundColor,
            },
        },
        components: {
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: cardBackgroundColor,
                        backgroundImage: 'none',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        '&.MuiButton-contained:hover': {
                            backgroundColor: primaryColor,
                        },
                    },
                },
            },
        },
        custom: {
            greenShadow: '3px 3px 5px #5DD140',
            cardBackground: cardBackgroundColor,
            contrastBg
        }
    };
};
