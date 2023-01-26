const express = require("express");
const router = express.Router();
const { Users } = require('../postgres/models/users');
const { Owners } = require('../postgres/models/owners');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {
  const where = req.body;
  await Users.findAll({ where })
    .then((users) => {
      res.json(users);
    })
    .catch((e) => {
      res.status(500).send(`Database error ${e}`);
    });
})

router.post('/', async (req, res) => {
  const user = req.body;
  const uuid = uuidv4();
  await Users.create({
    id: uuid,
    profile_image: `/avatar/${uuid}/`,
    ...user,
    owners: {
      id: uuidv4(),
      user_id: uuid,
      link: `/users/${uuid}/${user.display_name}`
    }
  }, {
    include: [
      {
        model: Owners, as: 'owners',
      },
    ]
  })
    .then(() => {
      res.send('Ok');
    })
    .catch((e) => {
      res.status(500).send(`Database error ${e}`);
    });
})


router.put('/:id', async (req, res, next) => {
  const body = req.body
  await Users.update(
    body,
    {returning: true, where: {id: req.params.id} }
  )
  .then(() => {
    res.send('Ok')
  })
  .catch(next)
})

router.delete('/', async (req, res) => {
  const where = req.body;
  await Users.destroy({ where })
    .then(function (deletedRecord) {
      if(deletedRecord === 1){
        res.status(200).json('Deleted successfully');          
      } else {
        res.status(404).send('Record not found')
      }
    })
    .catch((e) => {
      res.status(500).send(`Database error ${e}`);
    });
});

module.exports = router

// app.get('/user', (req, res) => {
//   const where = req.body;
//   Users.findOne({ where })
//     .then((user) => {
//       if(!user) return;
//       res.send(JSON.stringify(user));
//     })
//     .catch(() => {
//       res.status(500).send('database error');
//     });
// });
