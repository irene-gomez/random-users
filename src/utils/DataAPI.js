const API = 'https://randomuser.me/api/?results=50';

const fetch = () => fetch(API).then(response => response.json());

export { fetch };