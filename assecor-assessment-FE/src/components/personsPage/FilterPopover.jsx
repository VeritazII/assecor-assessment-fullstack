import { Popover, Box, TextField } from '@mui/material';
import { styles } from '../styles';

function FilterPopover({ 
  anchorEl, 
  onClose, 
  currentColumn, 
  filterValue, 
  onFilterChange 
}) {
  const open = Boolean(anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box sx={styles.filterPopover}>
        <TextField
          autoFocus
          size="small"
          placeholder={`Filter ${currentColumn}...`}
          value={filterValue || ''}
          onChange={(e) => onFilterChange(e.target.value)}
          sx={styles.filterTextField}
        />
      </Box>
    </Popover>
  );
}

export default FilterPopover;