const express = require('express');
const router = express.Router();
const {
    Assignment,
    Complete
} = require('../models/assignment.model');

router.get('/', (req, res) => {
    Assignment.find({}, (err, assignments) => {
        if (err) throw err;
        res.render('layout', {
            assignments
        })
    })
})

router.post('/submit', (req, res) => {
    const {
        body,
        subject,
        dueDate
    } = req.body;
    const newAssignment = new Assignment({
        body,
        subject,
        dueDate
    })
    newAssignment.save()
        .then(() => {
            res.redirect('/')
        })
})

// Delete route

router.get('/cancel/:id', (req, res) => {
    Assignment.findByIdAndDelete(req.params.id, (err, deleted) => {
        if (err) res.redirect('/');
        if (deleted) {
            console.log('assignment deleted');
            res.redirect('/')
        }
    })
})

router.get('/complete/:id', (req, res) => {
    const newComplete = new Complete({
        comp: req.params.id
    })

    newComplete.save()
        .then(() => {
            console.log('saved completed assignment');
            Assignment.findOneAndDelete({
                body: req.params.id
            }, (err, deleted) => {
                if (err) res.redirect('/');
                if (deleted) {
                    console.log('assignment deleted');
                    res.redirect('/')
                }
            })
        })
})


module.exports = router;