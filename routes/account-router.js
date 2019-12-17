const router = require('express').Router()

const db = require('../data/dbConfig.js')


router.get('/', (req, res) => {
    db('accounts')
    .then(accounts => {
        res.json(accounts)
    }) .catch (err => {
        console.log(`err`, err)
        res.status(500).json({
            message: 'Failed to get accounts'
        })
    })
})

router.post('/', (req, res) => {
    const accountData = req.body
      db('accounts').insert(accountData)
        .then(ids => {
            res.status(201).json({ newAccountId: ids[0]} )
        }) .catch(error => {
            console.log(error)
          res.status(500).json({ message: 'Could not add the account'
         });
        });
    })


module.exports = router;