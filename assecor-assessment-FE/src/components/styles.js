import { colors } from '../theme';

export const styles = {
    // Existing styles
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: colors.background.primary,
        position: 'relative'
    },
    
    backButton: {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        backgroundColor: colors.accent.primary,
        color: colors.background.primary,
        fontWeight: 'bold',
        borderRadius: 0,
        zIndex: 1000
    },
    
    paper: {
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'transparent'
    },
    
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: colors.text.primary
    },
    
    labelCell: {
        padding: '8px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        backgroundColor: colors.background.primary,
        color: colors.text.primary,
        border: 'none',
        width: '50vh'
    },
    
    valueCell: {
        padding: '8px',
        fontSize: '1.1rem',
        backgroundColor: colors.background.secondary,
        color: colors.text.primary,
        border: 'none'
    },
    
    actionCell: {
        width: '60px',
        padding: '2px',
        backgroundColor: colors.background.secondary,
        border: 'none'
    },
    
    editButton: {
        backgroundColor: colors.accent.secondary,
        borderRadius: 0,
        padding: '8px'
    },
    
    textField: {
        '& .MuiInputBase-input': {
            color: colors.text.primary,
            fontSize: '1.1rem'
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: colors.text.primary
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: colors.accent.secondary
        }
    },
    
    select: {
        color: colors.text.primary,
        fontSize: '1.1rem',
        '& .MuiSelect-icon': {
            color: colors.text.primary
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: colors.text.primary
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: colors.accent.secondary
        }
    },
    
    selectMenu: {
        backgroundColor: colors.background.secondary,
        '& .MuiMenuItem-root': {
            color: colors.text.primary
        }
    },
    
    colorOption: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    
    colorSwatch: (colorHash) => ({
        width: '24px',
        height: '24px',
        backgroundColor: colorHash,
        border: `2px solid ${colors.text.primary}`
    }),
    
    createButtonContainer: {
        padding: '16px',
        textAlign: 'center'
    },
    
    createButton: {
        backgroundColor: colors.accent.secondary,
        color: colors.background.primary,
        borderRadius: 0,
        '&:disabled': {
            backgroundColor: colors.disabled.background,
            color: colors.disabled.text
        }
    },

    // PersonsPage styles
    personsPageContainer: {
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        position: 'relative'
    },

    tableContainer: {
        height: '100vh',
        overflow: 'auto',
        backgroundColor: colors.background.primary,
    },

    tableHead: {
        position: 'sticky',
        top: 0,
        zIndex: 10,
    },

    tableHeaderCell: {
        backgroundColor: colors.background.primary,
        color: colors.text.primary,
        fontWeight: 'bold',
        borderBottom: `3px solid ${colors.border.primary}`,
        padding: '10px',
        cursor: 'pointer',
        userSelect: 'none'
    },

    headerCellContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    headerCellLabel: {
        display: 'flex',
        alignItems: 'center'
    },

    sortIcon: {
        fontSize: 16,
        ml: 0.5
    },

    filterIconButton: {
        color: colors.text.primary,
        p: 0.5
    },

    removeFilterButton: {
        color: colors.accent.danger,
        p: 0.5
    },

    tableRow: (index) => ({
        backgroundColor: index % 2 === 0 
            ? colors.background.secondary 
            : colors.background.tertiary,
        cursor: 'pointer',
        '& .MuiTableCell-root': {
            color: colors.text.primary,
            transition: 'all 0.2s ease',
        }
    }),

    tableRowPortrait: (index, rowColor) => ({
        backgroundColor: index % 2 === 0 
            ? colors.background.secondary 
            : colors.background.tertiary,
        cursor: 'pointer',
        boxShadow: `inset 0 0 0 1px ${rowColor}`,
        '& .MuiTableCell-root': {
            color: colors.text.primary,
            transition: 'all 0.2s ease',
        }
    }),

    tableCell: {
        padding: '10px',
    },

    addPersonRow: {
        position: 'sticky',
        bottom: 0,
        backgroundColor: colors.background.primary,
        zIndex: 9
    },

    addPersonButton: {
        backgroundColor: colors.accent.secondary,
        color: colors.background.primary,
        fontWeight: 'bold',
        borderRadius: 0,
    },

    filterPopover: {
        p: 2,
        backgroundColor: colors.background.tertiary
    },

    filterTextField: {
        '& .MuiInputBase-root': {
            color: colors.text.primary,
            backgroundColor: colors.background.secondary,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border.primary,
        },
        '& .MuiInputBase-input::placeholder': {
            color: colors.text.secondary,
            opacity: 1,
        }
    },
};