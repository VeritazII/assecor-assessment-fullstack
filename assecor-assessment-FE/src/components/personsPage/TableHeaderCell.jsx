import { TableCell, Box, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from './SearchIcon';
import { styles } from '../styles';

function TableHeaderCell({ 
  columnKey, 
  label, 
  sortConfig, 
  hasFilter, 
  onSort, 
  onFilterClick, 
  onRemoveFilter 
}) {
  const getSortIcon = () => {
    if (sortConfig.key !== columnKey) return null;
    if (sortConfig.clickCount % 2 === 1) {
      return <ArrowUpwardIcon sx={styles.sortIcon} />;
    } else {
      return <ArrowDownwardIcon sx={styles.sortIcon} />;
    }
  };

  const handleFilterClick = (event) => {
    event.stopPropagation();
    onFilterClick(event, columnKey);
  };

  const handleRemoveFilter = (event) => {
    event.stopPropagation();
    onRemoveFilter(event, columnKey);
  };

  return (
    <TableCell onClick={() => onSort(columnKey)} sx={styles.tableHeaderCell}>
      <Box sx={styles.headerCellContent}>
        <Box sx={styles.headerCellLabel}>
          {label}
          {getSortIcon()}
        </Box>
        {hasFilter ? (
          <IconButton
            size="small"
            onClick={handleRemoveFilter}
            sx={styles.removeFilterButton}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        ) : (
          <IconButton
            size="small"
            onClick={handleFilterClick}
            sx={styles.filterIconButton}
          >
            <SearchIcon />
          </IconButton>
        )}
      </Box>
    </TableCell>
  );
}

export default TableHeaderCell;