// components/PersonPage/PersonPage.jsx

import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../configuration';
import { useEffect, useState } from 'react';
import { Box, Paper, Button, Table, TableBody } from '@mui/material';
import { navigateToPersons } from './Navigate';
import PersonField from '../components/personPage/PersonField';
import { styles } from '../components/styles';

const FIELDS = ['name', 'lastname', 'zipcode', 'city', 'color'];

function PersonPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;
    
    const [person, setPerson] = useState(null);
    const [draft, setDraft] = useState({
        name: '',
        lastname: '',
        zipcode: '',
        city: '',
        color: ''
    });
    const [loading, setLoading] = useState(true);
    const [editingField, setEditingField] = useState(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        if (!isNew) {
            fetch(`${API_URL}/persons/${id}`)
                .then(res => res.json())
                .then(data => {
                    setPerson(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [id, isNew]);

    const isDraftComplete = () =>
        Object.values(draft).every(v => v !== '' && v !== null);

    const handleEdit = (field) => {
        setEditingField(field);
        setEditValue(person[field]);
    };

    const handleDraftChange = (field, value) => {
        setDraft(prev => ({ ...prev, [field]: value }));
    };

    const handleCreate = async () => {
        if (!isDraftComplete()) return;

        try {
            const payload = {
                ...draft,
                zipcode: Number(draft.zipcode),
                color: Number(draft.color)
            };

            const res = await fetch(`${API_URL}/persons`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Create failed');
            navigateToPersons(navigate);
        } catch (err) {
            console.error(err);
        }
    };

    const savePerson = async (field, value) => {
        try {
            const response = await fetch(`${API_URL}/persons/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [field]: value }),
            });

            if (!response.ok) throw new Error('Save failed');

            const savedPerson = await response.json();
            setPerson(savedPerson);
            setEditingField(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = (field) => {
        const value = field === 'zipcode' || field === 'color'
            ? Number(editValue)
            : editValue;
        savePerson(field, value);
    };

    const handleKeyPress = (e, field) => {
        if (e.key === 'Enter') {
            handleSave(field);
        } else if (e.key === 'Escape') {
            setEditingField(null);
        }
    };

    if (loading) {
        return <Box sx={styles.loading}>Laden...</Box>;
    }

    return (
        <Box sx={styles.container}>
            <Button
                variant="contained"
                onClick={() => navigateToPersons(navigate)}
                sx={styles.backButton}
            >
                ← Back to Persons
            </Button>

            <Paper elevation={0} sx={styles.paper}>
                <Table>
                    <TableBody>
                        {FIELDS.map((field) => (
                            <PersonField
                                key={field}
                                field={field}
                                value={isNew ? draft[field] : person?.[field]}
                                isNew={isNew}
                                isEditing={editingField === field}
                                editValue={editValue}
                                onEdit={() => handleEdit(field)}
                                onSave={() => handleSave(field)}
                                onChange={(value) => 
                                    isNew 
                                        ? handleDraftChange(field, value)
                                        : setEditValue(value)
                                }
                                onKeyPress={(e) => handleKeyPress(e, field)}
                            />
                        ))}
                    </TableBody>
                </Table>

                {isNew && (
                    <Box sx={styles.createButtonContainer}>
                        <Button
                            variant="contained"
                            onClick={handleCreate}
                            disabled={!isDraftComplete()}
                            sx={styles.createButton}
                        >
                            Create Person
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}

export default PersonPage;