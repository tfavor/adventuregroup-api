const AttendingService = {
    insertAttendee(knex, newAttendee) {
        return knex
            .insert(newAttendee)
            .into('adventuregroup_attending')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getByUserName(knex, user_name) {
        return knex
            .select('*')
            .from('adventuregroup_attending')
            .where('user_name', user_name)
    },
    getByEventId(knex, event_id) {
        return knex
            .select('*')
            .from('adventuregroup_attending')
            .where('event_id', event_id)
    },
    deleteAttendee(knex, id) {
        return knex('adventuregroup_attending')
            .where({ id })
            .delete()
    }
}

module.exports = AttendingService