import { API_URL } from '../configuration';


export function navigateToPersons(navigate) {
    fetch(`${API_URL}/persons`)
        .then(() => navigate('/persons'))
        .catch(error => console.error('Error fetching person:', error));
}

export const navigateToPerson = (navigate, id) => {
    navigate(`/persons/${id}`);
};