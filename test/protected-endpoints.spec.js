const knex = require('knex')
const app = require('../src/app')
const helper = require('./test-helper')

describe('Protected endpoints', function() {
    let db

    before('make knex instance', () => {
    db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())
    before('clean the table', () => db.raw('TRUNCATE adventuregroup_events, adventuregroup_users, adventuregroup_attending RESTART IDENTITY CASCADE'))
    afterEach('clean the table', () => db.raw('TRUNCATE adventuregroup_events, adventuregroup_users, adventuregroup_attending RESTART IDENTITY CASCADE'))

    const testUsers = helper.makeUsersArray()
    const testEvents = helper.makeEventsArray()
    const testAttendees = helper.makeAttendingArray()
    beforeEach(`insert data`, () => {
        return db
            .into('adventuregroup_users')
            .insert(testUsers)
            .then(() => {
                return db
                    .into('adventuregroup_events')
                    .insert(testEvents)
            })
            .then(() => {
                return db
                    .into('adventuregroup_attending')
                    .insert(testAttendees)
            })
    })

    const protectedEndpoints = [
    {
        name: 'GET /api/events/:event_id',
        path: '/api/events/1',
        method: supertest(app).get,
    },
    {
        name: 'POST /api/events',
        path: '/api/events',
        method: supertest(app).post,
    },
    {
        name: 'POST /api/attending',
        path: '/api/attending',
        method: supertest(app).post,
    },
    ]

    protectedEndpoints.forEach(endpoint => {
        describe(endpoint.name, () => {
            it(`responds 401 'Missing bearer token' when no bearer token`, () => {
            return endpoint.method(endpoint.path)
                .expect(401, { error: `Missing bearer token` })
            })

            it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
            const validUser = testUsers[0]
            const invalidSecret = 'bad-secret'
            return endpoint.method(endpoint.path)
                .set('Authorization', helper.makeAuthHeader(validUser, invalidSecret))
                .expect(401, { error: `Unauthorized request` })
            })

            it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
            const invalidUser = { user_name: 'user-not-existy', id: 1 }
            return endpoint.method(endpoint.path)
                .set('Authorization', helper.makeAuthHeader(invalidUser))
                .expect(401, { error: `Unauthorized request` })
            })
        })
    })
})