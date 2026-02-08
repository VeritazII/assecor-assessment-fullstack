import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button,
} from '@mui/material';
import TableHeaderCell from './TableHeaderCell';
import PersonRow from './PersonRow';
import { styles } from '../styles';

function PersonsTable({ 
  persons, 
  isPortrait, 
  sortConfig, 
  filters,
  onSort, 
  onFilterClick, 
  onRemoveFilter,
  onRowClick, 
  onAddPerson 
}) {
  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table stickyHeader>
        <TableHead sx={styles.tableHead}>
          <TableRow>
            <TableHeaderCell
              columnKey="name"
              label="Name"
              sortConfig={sortConfig}
              hasFilter={!!filters.name}
              onSort={onSort}
              onFilterClick={onFilterClick}
              onRemoveFilter={onRemoveFilter}
            />
            <TableHeaderCell
              columnKey="lastname"
              label="Lastname"
              sortConfig={sortConfig}
              hasFilter={!!filters.lastname}
              onSort={onSort}
              onFilterClick={onFilterClick}
              onRemoveFilter={onRemoveFilter}
            />
            {!isPortrait && (
              <>
                <TableHeaderCell
                  columnKey="zipcode"
                  label="Zipcode"
                  sortConfig={sortConfig}
                  hasFilter={!!filters.zipcode}
                  onSort={onSort}
                  onFilterClick={onFilterClick}
                  onRemoveFilter={onRemoveFilter}
                />
                <TableHeaderCell
                  columnKey="city"
                  label="City"
                  sortConfig={sortConfig}
                  hasFilter={!!filters.city}
                  onSort={onSort}
                  onFilterClick={onFilterClick}
                  onRemoveFilter={onRemoveFilter}
                />
                <TableHeaderCell
                  columnKey="color"
                  label="Color"
                  sortConfig={sortConfig}
                  hasFilter={!!filters.color}
                  onSort={onSort}
                  onFilterClick={onFilterClick}
                  onRemoveFilter={onRemoveFilter}
                />
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {persons.map((person, index) => (
            <PersonRow
              key={person.id}
              person={person}
              index={index}
              isPortrait={isPortrait}
              onClick={onRowClick}
            />
          ))}

          {/* Add Person Row */}
          <TableRow sx={styles.addPersonRow}>
            <TableCell colSpan={isPortrait ? 2 : 5} align="center">
              <Button
                variant="contained"
                onClick={onAddPerson}
                sx={styles.addPersonButton}
              >
                + Add Person
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PersonsTable;