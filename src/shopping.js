require('dotenv').config()

const knex = require('knex')
const Shopping_list_Service = require('./shopping-list-service')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

// Shopping_list_Service.updateShoppingItem(knexInstance,28,{
//   name:'askjdhakjsdhkahkdasd',
//   price:10000
// })


  Shopping_list_Service.getAllItems(knexInstance)
  .then(items => console.log(items))
  .then(() =>
    Shopping_list_Service.insertItem(knexInstance, {
      name: 'tamales',
      price: 15,
      category: 'Lunch',
      checked: true,

    })
  )
  .then(newItem => {
    console.log(newItem)
    return Shopping_list_Service.updateItem(
      knexInstance,
      newItem.id,
      { name: 'Updated title' ,
      price: 123342341
      }
    ).then(() => Shopping_list_Service.getById(knexInstance, newItem.id))
    .then(item => {
    console.log(item)
    })

  })

  // Shopping_list_Service.getShoppingItemById(knexInstance,31)
  // .then(item => console.log(item))
  // Shopping_list_Service.deleteShoppingItem(knexInstance,32)
  // .then(item => console.log(item))
