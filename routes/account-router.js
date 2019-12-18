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

router.get('/:id', (req, res) => {
    db('accounts').where('id', req.params.id).first()
    .then(account => {
       res.json(account)
        }) .catch (error => {
        console.log(error)
        res.status(500).json({
            message: 'unable to retrieve an account'
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
          res.status(500).json({ 
              message: 'Could not add the account'
         });
        });
    })



router.put('/:id', (req, res) => {
    const changedAccount = req.body
    db('accounts').where('id', req.params.id).update(changedAccount)
    .then(count => {
        if(count) {
            res.json({ updated: count })
        } else {
            res.status(404).json({
                message: 'Invalid account id'
            })
        }
    }) .catch (error => {
        res.status(500).json({
            message: 'Unable to update an account'
        })
    })
})

router.delete('/:id', (req, res) => {
    db('accounts').where('id', req.params.id).del()
    .then(count => {
        if(count) {
            res.json({
                message: `the account ${req.params.id} is nuked!`
            })
        } else {
            res.status(404).json({
                message: 'Invalid account id!'
            })
        }
    }) .catch(error => {
        res.status(500).json({
            message: `Unable to delete the account!!!`
        })
    })
})

module.exports = router;