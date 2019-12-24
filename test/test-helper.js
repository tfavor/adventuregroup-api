function makeUsersArray() {
    return [
        {
            id: 1,
            user_name: 'user1',
            password: 'password1'
        },
        {
            id: 2,
            user_name: 'user2',
            password: 'password2'
        },
        {
            id: 3,
            user_name: 'user3',
            password: 'password3'
        },
        {
            id: 4,
            user_name: 'user4',
            password: 'password4'
        },
    ]
}

function makeEventsArray() {
    return [
        {
            id: 1,
            name: 'test event1',
            location: 'Austin, Texas',
            date: '2019-06-23T05:00:00.000Z',
            time: '12:00:00', 
            type:'hiking',
            users_attending: 'user1, user3, user2, user4',
            creator_id: 1,
            details: 'test details 1'
        },
        {
            id: 2,
            name: 'test event2',
            location: 'SanAntonio, Texas',
            date: '2019-06-23T05:00:00.000Z',
            time: '12:00:00', 
            type:'hiking',
            users_attending: 'user1, user3, user2, user4',
            creator_id: 2,
            details: 'test details 2'
        },
        {
            id: 3,
            name: 'test event3',
            location: 'Austin, Texas',
            date: '2019-06-23T05:00:00.000Z',
            time: '12:00:00', 
            type:'hiking',
            users_attending: 'user1, user3, user2, user4',
            creator_id: 3,
            details: 'test details 3'
        },
        {
            id: 4,
            name: 'test event4',
            location: 'SanAntonio, Texas',
            date: '2019-06-23T05:00:00.000Z',
            time: '12:00:00', 
            type:'hiking',
            users_attending: 'user1, user3, user2, user4',
            creator_id: 4,
            details: 'test details 4'
        },
        {
            id: 5,
            name: 'test event5',
            location: 'Austin, Texas',
            date: '2019-06-23T05:00:00.000Z',
            time: '12:00:00', 
            type:'hiking',
            users_attending: 'user1, user3, user2, user4',
            creator_id: 2,
            details: 'test details 5'
        },
    ]
}

function makeFixtures() {
    const testUsers = makeUsersArray()
    const testEvents = makeEventsArray(testUsers)
    return { testUsers, testEvents }
}

function makeAuthHeader(user) {
    const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64')
    return `Basic ${token}`
  }

module.exports = {
    makeAuthHeader,
    makeEventsArray,
    makeUsersArray,
    makeFixtures,
}
  