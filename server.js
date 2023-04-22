let express = require('express');
let axios = require('axios');
let bodyparser = require('body-parser');
// let statments for variables with needed parts
const app = express();

app.use(bodyparser.urlencoded());

app.set('view engine', 'ejs');

const Outputted_list = []; //created outputted list for when outputting users

//api get function for retrieving information from typicode 
app.get('/', function (req, res) {
    let url = 'https://dummyjson.com/carts';
    const each_person = []; //
   //create reference to randomized users
    axios.get(url).then(response => {
        let data = response.data.carts;
  for (let i = 0; i < data.length; i++) { 
    const cart = data[i];

    let totalProducts = cart.totalProducts;
    let cartTotal = cart.total;

    // Multiply quantity by totalProducts
    for (let j = 0; j < cart.products.length; j++) {
      const product = cart.products[j];
      product.total *= product.quantity * totalProducts;
    }

    const avg = cartTotal / totalProducts;

    each_person.push({
      id: cart.id,
      total: cartTotal,
      totalProducts: totalProducts,
      avgTotal: avg.toFixed(2),
    });
}  
      console.log(each_person);
    }).catch(error => {
      console.log(error);
    });
  
      console.log(each_person); // used for seeing the output in terminal as well
      res.render('pages/index', {
        each_person,
      });
    });

// api post function for re-organizing users into another order
app.post('/', function (req, res) {
    for (let i = 0; i < 3; i++) {
      let randomized_index = Math.floor(Math.random() * 10);
      let added_string = user_info[randomized_index];
      Outputted_list.push(added_string);
    }
  
    res.render('pages/index.ejs', {body: Outputted_list});
  });
  


// uses port 8080
app.listen(8080);
console.log('Application is connected to port 8080'); // basic outline parts from class
console.log('http://localhost:8080/');
