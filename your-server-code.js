/* eslint-env node */

'use strict'

const express = require('express')
const router = express.Router()

router.get('/headers', (req, res) => {
    const headers = req.headers
    res.json(headers)
  });

module.exports = router
