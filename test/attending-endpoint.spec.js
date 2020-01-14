const knex = require('knex')

const app = require('../src/app')
const helper = require('./test-helper')

describe('Attending Endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconect from db', () => db.destroy())
    before('clean the table', () => db.raw('TRUNCATE adventuregroup_events, adventuregroup_users, adventuregroup_attending RESTART IDENTITY CASCADE'))
    afterEach('clean the table', () => db.raw('TRUNCATE adventuregroup_events, adventuregroup_users, adventuregroup_attending RESTART IDENTITY CASCADE'))

    

    describe(`GET /api/attending/by_event/:event_id`, () => {
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
        context(`given no attendees`, () => {
            it(`responds with 404`, () => {
                const testId = 1232
                return supertest(app)
                    .get(`/api/attending/by_event/${testId}`)
                    .set('Authorization', helper.makeAuthHeader(testUsers[0]))
                    .expect(404, { error: { message: `attendee does not exist` } })
            })
        })
        context(`givent attendees in the database`, () => {
            it(`responds with 200 and an attendees with event_id "testId"`, () => {
                const testId = 2
                const expectedAttendees = testAttendees.filter(attendee => attendee.event_id == testId)
                console.log(expectedAttendees)
                return supertest(app)
                    .get(`/api/attending/by_event/${testId}`)
                    .set('Authorization', helper.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedAttendees)
            })
        })
    })
    describe(`GET /api/attending/by_user/:user_name`, () => {
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
        context(`given no attendees`, () => {
            it(`responds with 404`, () => {
                const testUserName = "user48"
                return supertest(app)
                    .get(`/api/attending/by_user/${testUserName}`)
                    .set('Authorization', helper.makeAuthHeader(testUsers[0]))
                    .expect(404, { error: { message: `attendee does not exist` } })
            })
        })
        context(`givent attendees in the database`, () => {
            it(`responds with 200 and an attendees with user "testUserName"`, () => {
                const testUserName = "user1"
                const expectedAttendee = testAttendees.filter(attendee => attendee.user_name == testUserName)
                return supertest(app)
                    .get(`/api/attending/by_user/${testUserName}`)
                    .set('Authorization', helper.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedAttendee)
            })
        })
    })
    describe(`POST /api/attending`, () => {
        const testUsers = helper.makeUsersArray()
        const testEvents = helper.makeEventsArray()
        beforeEach(`insert data`, () => {
            return db
                .into('adventuregroup_users')
                .insert(testUsers)
                .then(() => {
                    return db
                        .into('adventuregroup_events')
                        .insert(testEvents)
                })
        })
        it(`responds with 201 created and the created instance`, () => {
            const newAttendee = {
                event_id: 1,
                user_name: 'user1',
                creator: false
            }
            return supertest(app)
                .post(`/api/attending`)
                .set('Authorization', helper.makeAuthHeader(testUsers[0]))
                .send(newAttendee)
                .expect(201)
                .expect(res => {
                    expect(res.body.event_id).to.eql(newAttendee.event_id)
                    expect(res.body.user_name).to.eql(newAttendee.user_name)
                })
        })    
    })
    describe(`DELETE /api/attending/:attending_id`, () => {
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
        context(`given no attendees`, () => {
            it(`responds with 404`, () => {
                const idToDelete = 12345
                return supertest(app)
                    .delete(`/api/attending/${idToDelete}`)
                    .set('Authorization', helper.makeAuthHeader(testUsers[0]))
                    .expect(404, { error: { message: `attendee does not exist` } })
            })
        })
        context(`given attendees in the database`, () => {
            it(`responds with 204 and removes the attendee`, () => {
                const idToDelete = 1
                return supertest(app)
                    .delete(`/api/attending/${idToDelete}`)
                    .set('Authorization', helper.makeAuthHeader(testUsers[0]))
                    .expect(204)

            })
        })
    })
})