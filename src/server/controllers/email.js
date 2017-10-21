const express = require('express');
const router = express.Router();

const contactData = require('../data/contacts.json');

router.post('/', (req, res) => {
  const { to, copy, subject, body } = req.body;

  // TODO: Check valid email for to and copy
  if (!to) {
    res.status(400).json({
      message: 'Failed to include recipient'
    });
  }

  let chance = Math.random();

  // Let's make it an 80% chance that the POST is successful since
  // it needs to fail sometimes
  if (chance < 0.8) {
    res.json({
      success: true
    });
  }
  else {
    res.status(500).json({
      success: false
    });
  }
});

router.get('/contact', (req, res) => {
  const search = (req.query.search || '').toLowerCase();

  return res.json({
    results: contactData.filter((contact) => {
      return contact.name.first.toLowerCase().includes(search) ||
        contact.name.last.toLowerCase().includes(search) ||
        contact.email.toLowerCase().includes(search)
    })
  })

  return res.json(contactData);
});

module.exports = router;