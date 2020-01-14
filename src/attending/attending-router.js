const express = require('express')
const AttendingService = require('./attending-service')
const path = require('path')
const { requireAuth } = require('../middleware/jwt-auth')

const attendingRouter = express.Router()
const jsonParser = express.json()

const serializeAtttendee = attendee => ({
    id: attendee.id,
    event_id: attendee.event_id,
    user_name: attendee.user_name
})

attendingRouter
    .route('/')
    .post(requireAuth, jsonParser, (req, res, next) => {
        const { user_name, event_id, creator } = req.body
        const newAttendee = { user_name, creator }
        for(const [key, value] of Object.entries(newAttendee)) {
            if(value == null) {
                return res.status(400).json({
                    error: { mesage: `Missing '${key}' in request body` }
                })
            }
        }
        newAttendee.event_id = event_id
        AttendingService.insertAttendee(
            req.app.get('db'),
            newAttendee
        )
        .then(attendee => {
            res.status(201).location(path.posix.join(req.originalUrl + `/${attendee.id}`))
            .json(attendee)
        })
        .catch(next)
    })
attendingRouter
    .route('/:attendee_id')
    .all(requireAuth)
    .delete(jsonParser, (req, res, next) => {
        AttendingService.deleteAttendee(
            req.app.get('db'),
            req.params.attendee_id          
        )
        .then((attendee) => {
            if(!attendee) {
                return res.status(404).json({
                    error: { message: `attendee does not exist` }
                })
            }
            res.status(204).end()
        })
        .catch(next)
    })
attendingRouter
    .route('/by_event/:event_id')
    .all(requireAuth)
    .all((req, res, next) => {
        AttendingService.getByEventId(
            req.app.get('db'),
            req.params.event_id
        )
        .then(attendees => {
            if(attendees.length === 0) {
                return res.status(404).json({
                    error: { message: `attendee does not exist` }
                })
            }
            res.attendees = attendees
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(res.attendees)
    })
attendingRouter
    .route('/by_user/:user_name')
    .all(requireAuth)
    .all((req, res, next) => {
        AttendingService.getByUserName(
            req.app.get('db'),
            req.params.user_name
        )
        .then(attendees => {
            if(attendees.length === 0) {
                return res.status(404).json({
                    error: { message: `attendee does not exist` }
                })
            }
            res.attendees = attendees
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(res.attendees)
    })
module.exports = attendingRouter    