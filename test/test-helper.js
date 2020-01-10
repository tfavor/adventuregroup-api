const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
        {
            id: 1,
            user_name: 'user1',
            password: 'Password1!',
            full_name: 'test full_name'
        },
        {
            id: 2,
            user_name: 'user2',
            password: 'Password2!',
            full_name: 'test full_name'
        },
        {
            id: 3,
            user_name: 'user3',
            password: 'Password3!',
            full_name: 'test full_name'
        },
        {
            id: 4,
            user_name: 'user4',
            password: 'Password4!',
            full_name: 'test full_name'
        },
    ]
}

function makeEventsArray() {
    return [
        {
            id: 1,
            name: 'test event1',
            location: 'Austin, Texas',
            date: '2019-06-23T00:00:00.000Z',
            type:'hiking',
            users_attending: 'user1, user3, user2, user4',
            creator_id: 1,
            details: 'test details 1'
        },
        {
            id: 2,
            name: 'test event2',
            location: 'SanAntonio, Texas',
            date: '2019-06-23T00:00:00.000Z',
            type:'hiking',
            users_attending: 'user1, user3, user2, user4',
            creator_id: 2,
            details: 'test details 2'
        },
        {
            id: 3,
            name: 'test event3',
            location: 'Austin, Texas',
            date: '2019-06-23T00:00:00.000Z',
            type:'hiking',
            users_attending: 'user1, user3, user2, user4',
            creator_id: 3,
            details: 'test details 3'
        },
        {
            id: 4,
            name: 'test event4',
            location: 'SanAntonio, Texas',
            date: '2019-06-23T00:00:00.000Z',
            type:'hiking',
            users_attending: 'user1, user3, user2, user4',
            creator_id: 4,
            details: 'test details 4'
        },
        {
            id: 5,
            name: 'test event5',
            location: 'Austin, Texas',
            date: '2019-06-23T00:00:00.000Z',
            type:'hiking',
            users_attending: 'user1, user3, user2, user4',
            creator_id: 2,
            details: 'test details 5'
        },
    ]
}

function makeAttendingArray() {
    return [
        {
            id: 1,
            event_id: 1,
            user_name: 'user1'
        },
        {
            id: 2,
            event_id: 2,
            user_name: 'user1'
        },
        {
            id: 3,
            event_id: 3,
            user_name: 'user1'
        },
        {
            id: 4,
            event_id: 1,
            user_name: 'user2'
        },
        {
            id: 5,
            event_id: 2,
            user_name: 'user3'
        },
    ]
}

function makeFixtures() {
    const testUsers = makeUsersArray()
    const testEvents = makeEventsArray(testUsers)
    return { testUsers, testEvents }
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_name,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
  }

  function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('adventuregroup_users').insert(preppedUsers)
      .then(() =>
        // update the auto sequence to stay in sync
        db.raw(
          `SELECT setval('adventuregroup_users_id_seq', ?)`,
          [users[users.length - 1].id],
        )
      )
  }

module.exports = {
    makeAuthHeader,
    makeEventsArray,
    makeUsersArray,
    makeAttendingArray,
    makeFixtures,
    seedUsers,
}