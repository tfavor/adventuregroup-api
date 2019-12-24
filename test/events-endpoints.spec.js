const knex = require('knex')
const app = require('../src/app')
const helper = require('./test-helper')

describe('Events Endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconect from db', () => db.destroy())
    before('clean the table', () => db.raw('TRUNCATE adventuregroup_events, adventuregroup_users RESTART IDENTITY CASCADE'))
    afterEach('clean the table', () => db.raw('TRUNCATE adventuregroup_events, adventuregroup_users RESTART IDENTITY CASCADE'))

    describe(`GET /api/events`, () => {
        context(`given no events`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get(`/api/events`)
                    .expect(200, [])
            })
        })
        context(`given events in database`, () => {
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
            it(`responds with 200 and all of the events`, () => {
                return supertest(app)
                    .get(`/api/events`)
                    .expect(200, testEvents)
            })
        })
    })
    describe(`GET /api/events/:event_id`, () => {
        context(`given no events`, () => {
            it(`responds with 404`, () => {
                const testId = 2
                return supertest(app)
                    .get(`/api/events/${testId}`)
                    .expect(404, { error: { message: `event does not exist` } })
            })
        })
        context(`givent events in the database`, () => {
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
            it(`responds with 200 and an event with id "testId"`, () => {
                const testId = 2
                const expectedEvent = testEvents[testId - 1]
                return supertest(app)
                    .get(`/api/events/${testId}`)
                    .expect(200, expectedEvent)
            })
        })
    })
    describe(`POST /api/events`, () => {
        const testUsers = helper.makeUsersArray()
        beforeEach(`insert data`, () => {
            return db
                .into('adventuregroup_users')
                .insert(testUsers)
        })  
        it(`responds with 201 created and the created event`, () => {
            const newEvent = {
                name: 'new event',
                location: 'Austin, Texas',
                date: '2019-06-23T05:00:00.000Z',
                time: '12:00:00', 
                type:'hiking',
                users_attending: 'user2',
                creator_id: 2,
                details: 'new details'
            }
            return supertest(app)
                .post(`/api/events`)
                .send(newEvent)
                .expect(201)
                .expect(res => {
                    expect(res.body.name).to.eql(newEvent.name)
                    expect(res.body.location).to.eql(newEvent.location)
                    expect(res.body.date).to.eql(newEvent.date)
                    expect(res.body.time).to.eql(newEvent.time)
                    expect(res.body.type).to.eql(newEvent.type)
                    expect(res.body.users_attending).to.eql(newEvent.users_attending)
                    expect(res.body.creator_id).to.eql(newEvent.creator_id)
                    expect(res.body.details).to.eql(newEvent.details)
                    expect(res.header.location).to.eql(`/api/events/${res.body.id}`)
                })
                .then(postRes => 
                    supertest(app)
                    .get(`/api/events/${postRes.body.id}`)
                    .expect(postRes.body)
                )
        })    
    })
    describe(`PATCH /api/event/:event_id`, () => {
        context(`given no events`, () => {
            it(`responds with status 404`, () => {
                const idToUpdate = 2
                return supertest(app)
                    .patch(`/api/events/${idToUpdate}`)
                    .expect(404)
            })
        })
        context(`given events in thee database`, () => {
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
            it(`responds with 204 and updates the event`, () => {
                const idToUpdate = 2
                const updatedEvent = {
                    name: 'updated event',
                    location: 'San Antonio, Texas',
                    date: '2019-06-23T05:00:00.000Z',
                    time: '11:00:00', 
                    type:'biking',
                    users_attending: 'user5, user2',
                    creator_id: 2,
                    details: 'updated details'
                }
                const expectedEvent = {
                    ...testEvents[idToUpdate - 1],
                    ...updatedEvent
                }
                return supertest(app)
                    .patch(`/api/events/${idToUpdate}`)
                    .send(updatedEvent)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                        .get(`/api/events/${idToUpdate}`)
                        .expect(expectedEvent)    
                    )
            })
        })
    })
    describe(`DELETE /api/events/:event_id`, () => {
        context(`given no events`, () => {
            it(`responds with 404`, () => {
                const idToDelete = 1234
                return supertest(app)
                    .delete(`/api/events/${idToDelete}`)
                    .expect(404)
            })
        })
        context(`given events in the database`, () => {
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
            it(`responds with 204 and removes the event`, () => {
                const idToDelete = 2
                const expectedEvents = testEvents.filter(event => event.id !== idToDelete)
                return supertest(app)
                    .delete(`/api/events/${idToDelete}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/events`)
                            .expect(expectedEvents)    
                    )
            })
        })
    })
})