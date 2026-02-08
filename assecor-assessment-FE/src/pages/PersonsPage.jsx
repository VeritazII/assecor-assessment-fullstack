import { Box, Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_URL } from '../configuration';
import { ColorCodes } from '../Colors';
import PersonsTable from '../components/personsPage/PersonsTable';
import FilterPopover from '../components/personsPage/FilterPopover';
import { styles } from '../components/styles';

function PersonsPage() {
  const navigate = useNavigate();
  const isPortrait = useMediaQuery('(orientation: portrait)');
  
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, clickCount: 0 });
  const [filters, setFilters] = useState({
    name: '',
    lastname: '',
    zipcode: '',
    city: '',
    color: ''
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentFilterColumn, setCurrentFilterColumn] = useState(null);

  // Fetch persons from API
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await fetch(`${API_URL}/persons`);
        const data = await response.json();
        setPersons(data);
        setFilteredPersons(data);
      } catch (error) {
        console.error('Error fetching persons:', error);
      }
    };
    fetchPersons();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...persons];
    
    // Apply filters
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        filtered = filtered.filter(person => {
          const value = key === 'color' ? ColorCodes[person[key]] : person[key];
          return value?.toString().toLowerCase().includes(filters[key].toLowerCase());
        });
      }
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = sortConfig.key === 'color' ? ColorCodes[a[sortConfig.key]] : a[sortConfig.key];
        let bVal = sortConfig.key === 'color' ? ColorCodes[b[sortConfig.key]] : b[sortConfig.key];

        aVal = aVal?.toString().toLowerCase() || '';
        bVal = bVal?.toString().toLowerCase() || '';

        if (sortConfig.clickCount % 2 === 1) {
          // Odd = ASC
          return aVal > bVal ? 1 : -1;
        } else {
          // Even = DESC
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    setFilteredPersons(filtered);
  }, [persons, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key: key,
      clickCount: prev.key === key ? prev.clickCount + 1 : 1
    }));
  };

  const handleFilterClick = (event, column) => {
    setAnchorEl(event.currentTarget);
    setCurrentFilterColumn(column);
  };

  const handleRemoveFilter = (event, column) => {
    setFilters(prev => ({
      ...prev,
      [column]: ''
    }));
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setCurrentFilterColumn(null);
  };

  const handleFilterChange = (value) => {
    setFilters(prev => ({
      ...prev,
      [currentFilterColumn]: value
    }));
  };

  const handleRowClick = (id) => {
    navigate(`/persons/${id}`);
  };

  const handleAddPerson = () => {
    navigate('/persons/new');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box sx={styles.personsPageContainer}>
      <Button
        variant="contained"
        onClick={handleGoHome}
        sx={styles.backButton}
      >
        ← Home
      </Button>

      <PersonsTable
        persons={filteredPersons}
        isPortrait={isPortrait}
        sortConfig={sortConfig}
        filters={filters}
        onSort={handleSort}
        onFilterClick={handleFilterClick}
        onRemoveFilter={handleRemoveFilter}
        onRowClick={handleRowClick}
        onAddPerson={handleAddPerson}
      />

      <FilterPopover
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        currentColumn={currentFilterColumn}
        filterValue={filters[currentFilterColumn]}
        onFilterChange={handleFilterChange}
      />
    </Box>
  );
}

export default PersonsPage;