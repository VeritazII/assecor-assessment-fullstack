import { useNavigate } from 'react-router-dom';
import { navigateToPersons } from './Navigate';
import { API_URL, assecorLogo } from '../configuration';
import { Button, Box } from '@mui/material';

function HomePage() {
    const navigate = useNavigate();

    const handleImport = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (file.type !== 'text/csv') {
            alert('Choose a CSV-file!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${API_URL}/persons/import`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigateToPersons(navigate);
            } else {
                alert('import failed!');
            }
        } catch (error) {
            console.error('Import-error:', error);
            alert('import failed!');
        }

        event.target.value = '';
    };

    return (
        <div className='home'>
            <div>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    marginBottom: '40px'
                }}>
                    <img 
                        src={assecorLogo}                     
                        alt="ASSECOR logo" 
                    />
                </Box>
                <Box sx={{ 
                    display: 'flex', 
                    gap: '16px', 
                    justifyContent: 'center'
                }}>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleImport}
                        style={{ display: 'none' }}
                        id="csvInput"
                    />
                    <Button
                        variant="contained"
                        component="label"
                        htmlFor="csvInput"
                        sx={{
                            backgroundColor: '#ffff58',
                            color: '#071225',
                            fontWeight: 'bold',
                            borderRadius: '0px',
                            padding: '10px 24px'
                        }}
                    >
                        IMPORT DATA
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigateToPersons(navigate)}
                        sx={{
                            backgroundColor: '#5564d7',
                            color: '#071225',
                            fontWeight: 'bold',
                            borderRadius: '0px',
                            padding: '10px 24px'
                        }}
                    >
                        GET PERSONS
                    </Button>
                </Box>
            </div>
        </div>
    );
}

export default HomePage;