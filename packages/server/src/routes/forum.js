const express = require("express");
const router = express.Router();
const { Users } = require('../postgres/models/users');
const { Answer, getAnswerOption } = require('../postgres/models/answer');
const { Questions, questionsOption } = require('../postgres/models/questions');
const { Owners } = require('../postgres/models/owners');
const { v4: uuidv4 } = require('uuid');



/** Questions */
router.get('/questions', async (req, res) => {
  await Questions.findAll(questionsOption())
    .then((questions) => {
      res.send(JSON.stringify(questions));
    })
    .catch((e) => {
      res.status(500).send(`database error ${e}`);
    });

})
router.get('/questions/:id', async (req, res) => {
  const queryParams = req.params
  await Questions.findByPk(queryParams.id, questionsOption())
    .then((question) => {
      if(!question) return;
      res.send(JSON.stringify(question));
    })
    .catch((e) => {
      res.status(500).send(`database error ${e}`);
    });
})

router.post('/questions', async (req, res) => {
  const { ownerId, title } = req.body
  const id = uuidv4();
    await Questions.create({
      id,
      ownerId,
      link: `questions/${id}/${title}`,
      title
    })
      .then((questions) => {
        res.send(JSON.stringify(questions));
      })
      .catch((e) => {
        res.status(500).send(`database error ${e}`);
      });
})

router.patch('/questions', async (req, res) => {
  const values = req.body.values;
  const where = req.body.where;
  await Questions.update(values, { where })
    .then(() => {
      res.send('Ok');
    })
    .catch(() => {
      res.status(500).send('database error');
    });
})

router.delete('/questions', (req, res) => {
  const where = req.body;
  Questions.destroy({ where })
    .then(function (deletedRecord) {
      if(deletedRecord === 1){
        res.status(200).json('Deleted successfully');          
      } else {
        res.status(404).send('record not found')
      }
    })
    .catch(() => {
      res.status(500).send('database error');
    });
});


/** Answer */
router.get('/answers', async (req, res) => {
  await Answer.findAll(getAnswerOption())
    .then((answer) => {
      res.send(JSON.stringify(answer));
    })
    .catch((e) => {
      res.status(500).send(`database error${e}`);
    });
});

router.get('/answers/:id', async (req, res) => {
  const queryParams = req.params
  await Answer.findByPk(queryParams.id, getAnswerOption())
    .then((answer) => {
      if(!answer) return;
      res.send(JSON.stringify(answer));
    })
    .catch((e) => {
      res.status(500).send(`database error ${e}`);
    });
});

router.post('/answers', async (req, res) => {
  const answer = req.body
  const uuid = uuidv4()
  await Answer.create({
    id: uuid,
    ...answer,
  })
    .then((questions) => {
      res.send(JSON.stringify(questions));
    })
    .catch((e) => {
      res.status(500).send(`database error ${e}`);
    });
})

/** Owners */
router.get('/owners', (req, res) => {
  const where = req.body;
  Owners.findAll({ 
    where, 
    attributes: ['id', 'reputation', 'accept_rate', 'link'],
    include: { 
      attributes: [
        ['id', 'user_id'],
        'profile_image', 
        'display_name', 
        'user_type'
      ],
      model: Users, as: 'user',
    },
  })
    .then((users) => {
      res.send(JSON.stringify(users));
    })
    .catch((e) => {
      res.status(500).send(`database error ${e}`);
    });
})

router.post('/owners/all', (req, res) => {
  const owners = req.body;
  
  Owners.bulkCreate(owners)
  .then(() => {
    res.send('Ok');
  })
    .catch((e) => {
      res.status(500).send(`database error: ${e}`);
    });
})

router.post('/owner', async (req, res) => {
  const owner = req.body;
  await Owners.create(owner)
    .then(() => {
      res.send('Ok');
    })
    .catch((e) => {
      res.status(500).send(`database error: ${e}`);
    });
})
router.delete('/owner', async (req, res) => {
  const where = req.body;
  await Owners.destroy({ where })
    .then(function (deletedRecord) {
      if(deletedRecord === 1){
        res.status(200).json('Deleted successfully');          
      } else {
        res.status(404).send('record not found')
      }
    })
    .catch(() => {
      res.status(500).send('database error');
    });
})

module.exports = router
