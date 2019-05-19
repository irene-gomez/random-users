const ENDPOINT = 'https://randomuser.me/api/?results=50';

const fetch = () => fetch(ENDPOINT).then(res => res.json());

export { fetch };