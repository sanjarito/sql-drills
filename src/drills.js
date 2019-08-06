require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

//GET ITEMS BY PRODUCTNAME SUPPLIED
function getProductsWithName(productname) {
  knexInstance
    .select('id', 'name', 'price', 'category', 'date_added','checked')
    .from('shopping_list')
    .where('name','ILIKE',`%${productname}%`)
    .then(result => {
      console.log(result)
    })
}

getProductsWithName('fish')

// GET ITEMS WITH PAGINATION
function paginateProducts(page) {
  const productsPerPage = 6
  const offset = productsPerPage * (page - 1)
  knexInstance
    .select('id', 'name', 'price', 'category', 'date_added','checked')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
}
paginateProducts(2)

//GET ITEMS AFTER ADDED date
function getProductsAfterDate(daysAgo) {
  knexInstance
    .select('id', 'name', 'price', 'category', 'date_added','checked')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => {
      console.log(result)
    })
}

getProductsAfterDate(1)

//GET TOTAL COST FOR EACH category
function costPerCategory() {
  knexInstance
    .select('category')
    .sum('price')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log('COST PER CATEGORY')
      console.log(result)
    })
}
costPerCategory()
