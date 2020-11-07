const { Client } = require('pg');
const moment = require('moment');
const _ = require('lodash');


const User = require('../server/models/User')
const CleaningWeek = require('../server/models/MrClean/CleaningWeek')
const { createAddress } = require('../server/utils/createAddress');


// const createTablesQuery = `
//   drop table if exists fc_users;
//   drop table if exists cleaning_weeks;

//   create table fc_users (
//     id           serial primary key
//   , email        text unique
//   , address      text
//   , metadata     jsonb default '{}'
//   , created_at   timestamp default now()
//   );

//   create table cleaning_weeks (
//     id            serial primary key
//   , week_number   int
//   , year          int
//   , confirmations jsonb default '{}'
//   );
// `
// const migrate = async (req, res) => {
//   try {
//     const users = await User.find({})
//     console.log('num users:', users.length)
//     const cleaningWeeks = await CleaningWeek.find({})
//     console.log('num weeks:', cleaningWeeks.length)

//     const payload = await client.query(createTablesQuery)
//     console.log('created tables')

//     const userInserts = users.map(u => {
//       const user = u.toObject()
//       return client.query(
//         `insert into fc_users (email, address, created_at) values ($1, $2, $3)`,
//         [user.email, user.address, user.createdAt.toISOString()]
//       )
//     })

//     const cleaningWeekInserts = cleaningWeeks.map(cw => {
//       const cleaningWeek = cw.toObject()
//       return client.query(
//         `insert into cleaning_weeks (week_number, year, confirmations) values ($1, $2, $3)`,
//         [cleaningWeek.weekNumber, cleaningWeek.year, JSON.stringify(cleaningWeek.confirmations)]
//       )
//     })
//     console.log('...')
//     const results = await Promise.all([
//       ...userInserts,
//       ...cleaningWeekInserts,
//     ])
//     console.log(',,,')

//     console.log('results')
//     console.log(results)

//     const uResults = await client.query('select count(*) from fc_users;')
//     const cwResults = await client.query('select count(*) from cleaning_weeks;')
//     res.send(JSON.stringify({
//       users: uResults.rows,
//       weeks: cwResults.rows,
//     }, null, 4))
//   } catch (e) {
//     res.send(JSON.stringify(e.where, null, 4))
//   }
// }

const createUser = async (req, res) => {
  try {
    const { email, metadata } = req.body;
    const email_ = Array.isArray(email) ? email[0] : email

    if (!email_.match(/^\S+@\S+$/)) {
      res.status(500).send(`Invalid email: ${email_}`)
      return
    }

    const existingUser = await client.query(
      'select email from fc_users where email = $1;',
      [email_]
    )

    if (existingUser.rows.length) {
      res.status(500).send(`User with email ${email_} already exists`)
      return
    }


    await client.query(
      `insert into fc_users (email, address, metadata) values ($1, $2, $3)`,
      [email_, createAddress(), metadata ? JSON.stringify(metadata) : '{}']
    )

    const newUser = await client.query(
      'select * from fc_users where email = $1;',
      [email_]
    )

    res.send(JSON.stringify(newUser.rows[0], null, 4))
  } catch (e) {
    res.send(e)
  }
}

const getUsers = async (req, res) => {
  const users = await client.query('select * from fc_users;')
  res.send(JSON.stringify(users.rows, null, 4))
}

const getOrCreateCurrentWeek = async () => {
  const today = moment().subtract(5, 'hours');
  const weekNumber = today.isoWeek();
  const year = today.year();
  console.log('THIS IS WEEK NUMBER ' + weekNumber);

  let currentWeek = await client.query('select * from cleaning_weeks where week_number = $1 and year = $2;', [weekNumber, year])

  if (!currentWeek.rows.length) {
    await client.query(
      `insert into cleaning_weeks (week_number, year) values ($1, $2)`,
      [weekNumber, year]
    )
    currentWeek = await client.query('select * from cleaning_weeks where week_number = $1 and year = $2;', [weekNumber, year])
  }

  return currentWeek.rows[0]
}

const getWeek = async (req, res) => {
  const currentWeek = await getOrCreateCurrentWeek()

  res.send({
    week: {
      _id: currentWeek.id,
      weekNumber: currentWeek.week_number,
      year: currentWeek.year,
      confirmations: currentWeek.confirmations
    }
  })
}

const markWeekComplete = async (req, res) => {
  const name = req.body.name || req.params.name;
  const currentWeek = await getOrCreateCurrentWeek()

  const confirmations = _.uniq([name, ...currentWeek.confirmations])
  await client.query(
    'update cleaning_weeks set confirmations = $1 where id = $2',
    [JSON.stringify(confirmations), currentWeek.id]
  )

  const _currentWeek = await getOrCreateCurrentWeek()

  res.send({
    week: {
      _id: _currentWeek.id,
      weekNumber: _currentWeek.week_number,
      year: _currentWeek.year,
      confirmations: _currentWeek.confirmations
    }
  })
}


const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = (app) => {
  // app.post('/api/migrate', migrate)
  app.post(['/api/users', '/api/users/'], createUser)
  app.get(['/api/users', '/api/users/'], getUsers)
  app.get('/api/mrclean/getWeek', getWeek);
  app.post('/api/mrclean/markWeekComplete/:name', markWeekComplete);
}



// users
  // id
  // email
  // address
  // createdAt
// cleaning weeks
  // weekNumber
  // year
  // confirmations ['max', 'tom', 'steve']
