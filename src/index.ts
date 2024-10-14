import { apis } from './app';

apis.get('/', (req, res) => {
    res.send({
        message: 'Welcome to the APIs!',
    });
});

apis.listen(3000, () => {
    console.log('APIs are running on http://localhost:3000');
});
