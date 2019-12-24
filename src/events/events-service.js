const EventsService = {
    getAllEvents(knex) {
        return knex
            .select('*')
            .from('adventuregroup_events')
    },
    insertEvent(knex, newEvent) {
        return knex
            .insert(newEvent)
            .into('adventuregroup_events')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex
            .select('*')
            .from('adventuregroup_events')
            .where('id', id)
            .first()
    },
    updateEvent(knex, id, updatedFields) {
        return knex('adventuregroup_events')
            .where({ id })
            .update(updatedFields)
    },
    deleteEvent(knex, id) {
        return knex('adventuregroup_events')
            .where({ id })
            .delete()
    }
}

module.exports = EventsService