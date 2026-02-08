import { TableRow, TableCell } from '@mui/material';
import { ColorCodes, ColorHashes } from '../../Colors';
import { styles } from '../styles';

function PersonRow({ person, index, isPortrait, onClick }) {
  const rowColor = ColorHashes[person.color];
  
  const rowStyle = isPortrait 
    ? styles.tableRowPortrait(index, rowColor)
    : styles.tableRow(index);

  return (
    <TableRow
      onClick={() => onClick(person.id)}
      sx={rowStyle}
    >
      <TableCell sx={styles.tableCell}>{person.name}</TableCell>
      <TableCell sx={styles.tableCell}>{person.lastname}</TableCell>
      {!isPortrait && (
        <>
          <TableCell sx={styles.tableCell}>{person.zipcode}</TableCell>
          <TableCell sx={styles.tableCell}>{person.city}</TableCell>
          <TableCell sx={styles.tableCell}>{ColorCodes[person.color]}</TableCell>
        </>
      )}
    </TableRow>
  );
}

export default PersonRow;