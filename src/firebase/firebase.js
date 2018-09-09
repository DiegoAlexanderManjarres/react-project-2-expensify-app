import * as firebase from 'firebase'

const config = {
   apiKey: process.env.FIREBASE_API_KEY,
   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
   databaseURL: process.env.FIREBASE_DATABASE_URL,
   projectId: process.env.FIREBASE_PROJECT_ID,
   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

const database = firebase.database()

export { firebase, database as default }

// database.ref('isSingle').remove()
//    .then(() => console.log('remove succeeded'))
//    .catch(error => console.log('Removed failes', error))

// database.ref().set({
//    name: 'Mike',
//    age: 37,
//    stressLevel: 6,
//    job: {
//       title: 'Software developer',
//       company: 'Facebook'
//    },
//    location: {
//       city: 'Orlando',
//       country: 'United States'
//    }
// })

// database.ref().update({
//    stressLevel: 9,
//    'job/company': 'Amazon',
//    'location/city': 'Seattle'
// })

// database.ref('location/city').once('value')
//    .then(snapshot => { 
//       const val = snapshot.val()
//       console.log(val)
//    })
//    .catch(error => console.log(error))

// const onValueChange = database.ref()
//    .on('value', snapshot => console.log(snapshot.val()), error => (
//       console.log('Error with data fetching', error)
//    ))

// setTimeout(() => {
//    database.ref('age').set(30)
// }, 3500)

// setTimeout(() => {
//    database.ref().off()
// }, 6500)

// setTimeout(() => {
//    database.ref('age').set(36)
// }, 9500)

// const onValueChange = database.ref()
//    .on('value', snapshot => {
//       const { name, job } = snapshot.val()
//       console.log(`${name} is a ${job.title} at ${job.company}`)
//    }, error => console.log('Error on request', error))



// setTimeout(() => {
//    database.ref().update({
//       name: 'Diego',
//       'job/title': 'Frontend developer',
//       'job/company': 'Jpay'
//    })
// }, 3500)



// 3 Setup expenses with three items (description, note, amount, createdAt)

// database.ref('expenses')
//    .once('value')
//    .then(snapshot => {
//       const expenses = []
//       snapshot.forEach(childSnapshot => {
//          expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//          })
//       })
//       console.log(expenses)
//    })

//    const monitorValues = database.ref().on('value', snapshot => {
//       console.log('latest',snapshot.val())
//    }, error => console.log('failed request', error))

//    database.ref('expenses/-LLkHmY6vkxx3WPjuhLJ').update({
//       amount: 50,
//       createdAt: '9/30/2018'
//    })

// child_removed 

// database.ref('expenses').on('child_removed', (snapshot) => {
//    console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').push({
//    description: 'phone',
//    amount: 80,
//    createdAt: '9/15/2018'
// })

// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').on('child_added', (snapshot) => {
//    console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').push({
//    description: 'Electricity',
//    amount: 120,
//    createdAt: '9/25/2018'
// })

/* database.ref('expenses').once('value').then(snapshot => {
  const value = snapshot.val() 
  const ids =  Object.keys(value)
  return ids.map(id => ({id, ...value[id]}))
})
 */

// database.ref('expenses/-LLw7IVfwyCu4SehMrfD').set(null)