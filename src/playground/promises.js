const promise = new Promise((resolve, reject) => { 
   setTimeout(() => {
      resolve({
         pet: 'cat',
         color: 'blue'
      }) 
      reject('Somthing went wrong')
   }, 1000)   
})

console.log('before')

promise.then((data) => {
   console.log('a', data)
   return new Promise((resolve, reject) => { 
      setTimeout(() => {
         resolve('This is another promise') 
         reject('Somthing went wrong')
      }, 3000)   
   })
})
.then((val) => console.log('does this run', val))
.catch(error => console.log(error))



console.log('after')