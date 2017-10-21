const express = require('express');
const router = express.Router();

const contactData = require('../data/contacts.json').sort((a, b) => {
  if (a.name.last > b.name.last) {
    return 1;
  }
  else if (a.name.last < b.name.last) {
    return -1;
  }
  return 0;
});

router.post('/', (req, res) => {
  const { to, copy, subject, body } = req.body;

  // Sloppy invalid data check, just that it doesn't exist
  if (to === undefined || subject === undefined || body === undefined) {
    res.status(400).json({
      success: false,
      message: 'Your data was invalid, plese try again'
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
      success: false,
      message: 'There was a problem sending your email, please try again'
    });
  }
});

router.get('/contacts', (req, res) => {
  const search = (req.query.search || '').toLowerCase();

  if (!search) {
    return res.json({
      results: contactData
    });
  }

  return res.json({
    results: contactData.filter((contact) => {
      return `${contact.name.first} ${contact.name.last}`.toLowerCase().includes(search)
    })
  })

  return res.json(contactData);
});

module.exports = router;