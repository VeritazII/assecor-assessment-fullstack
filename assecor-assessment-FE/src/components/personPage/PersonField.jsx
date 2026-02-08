import { TableCell, TableRow, TextField, Select, MenuItem, IconButton, Box } from '@mui/material';
import { assecorPen } from '../../configuration';
import ColorCodes, { ColorHashes } from '../../Colors';
import { styles } from '../styles';

function PersonField({ 
    field, 
    value, 
    isNew, 
    isEditing, 
    editValue,
    onEdit,
    onSave,
    onChange,
    onKeyPress
}) {
    const label = field.charAt(0).toUpperCase() + field.slice(1);
    
    const renderColorField = () => {
        if (isEditing && !isNew) {
            return (
                <Select
                    value={editValue}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onSave}
                    autoFocus
                    fullWidth
                    variant="standard"
                    sx={styles.select}
                    MenuProps={{ PaperProps: { sx: styles.selectMenu } }}
                >
                    {Object.entries(ColorHashes).map(([colorNum, colorHash]) => (
                        <MenuItem key={colorNum} value={Number(colorNum)}>
                            <Box sx={styles.colorOption}>
                                <Box sx={styles.colorSwatch(colorHash)} />
                                {ColorCodes[colorNum]}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            );
        }
        
        if (isNew) {
            return (
                <Select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                    variant="standard"
                    displayEmpty
                    sx={styles.select}
                    MenuProps={{ PaperProps: { sx: styles.selectMenu } }}
                >
                    <MenuItem value="" disabled>
                        <em>Select color</em>
                    </MenuItem>
                    {Object.entries(ColorHashes).map(([colorNum, colorHash]) => (
                        <MenuItem key={colorNum} value={Number(colorNum)}>
                            <Box sx={styles.colorOption}>
                                <Box sx={styles.colorSwatch(colorHash)} />
                                {ColorCodes[colorNum]}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            );
        }
        
        return ColorCodes[value] ?? '—';
    };
    
    const renderTextField = () => {
        if (isEditing && !isNew) {
            return (
                <TextField
                    value={editValue}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onSave}
                    onKeyDown={onKeyPress}
                    autoFocus
                    fullWidth
                    variant="standard"
                    sx={styles.textField}
                />
            );
        }
        
        if (isNew) {
            return (
                <TextField
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                    variant="standard"
                    placeholder={`Enter ${field}`}
                    sx={styles.textField}
                />
            );
        }
        
        return value ?? '—';
    };
    
    const valueCellSx = field === 'color' && value 
        ? {
            ...styles.valueCell,
            border: `3px solid ${ColorHashes[value]}`,
            boxShadow: `inset 0 0 0 1px ${ColorHashes[value]}`
        }
        : styles.valueCell;
    
    return (
        <TableRow>
            <TableCell sx={styles.labelCell}>
                {label}
            </TableCell>
            <TableCell sx={valueCellSx}>
                {field === 'color' ? renderColorField() : renderTextField()}
            </TableCell>
            <TableCell sx={styles.actionCell}>
                {!isNew && (
                    <IconButton
                        onClick={() => isEditing ? onSave() : onEdit()}
                        sx={styles.editButton}
                    >
                        <img src={assecorPen} alt="Edit" />
                    </IconButton>
                )}
            </TableCell>
        </TableRow>
    );
}

export default PersonField;