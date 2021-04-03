const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'ToGO',
        tasks: [
            {
                id: 'id1',
                name: 'Hello',
                isDone: true
            },
            {
                id: 'id2',
                name: 'World',
                isDone: false
            }
        ]
    });
});

module.exports = router;
