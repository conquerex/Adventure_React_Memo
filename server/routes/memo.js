import express from 'express';
import memo from '../models/memo';
import mongoose from 'mongoose';

const router = express.Router();

/* 
    WRITE MEMO: POST /api/memo
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY CONTENTS
*/
router.post('/', (req, res) => {
    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    };

    // CHECK CONTENTS VALID
    if(typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    };

    if(req.body.contents === '') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    };

    // CREATE NEW MEMO
    let memo = new memo({
        writer: req.session.loginInfo.username,
        contents: req.body.contents
    });

    // SAVE IN DATABASE
    memo.save( err => {
        if(err) throw err;
        return res.json({ success: true });
    });
});

// MODIFY MEMO
router.put('/:id', (req, res) => {

});

// DELETE MEMO
router.delete('/:id', (req, res) => {

});

/*
    READ MEMO: GET /api/memo
*/
router.get('/', (req, res) => {
    Memo.find()
        .sort({"_id": -1})
        .limit(6)
        .exec((err, memos) => {
            if(err) throw err;
            res.json(memos);
        });

});

export default router;