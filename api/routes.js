
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const db = require("./../db/db.js")
const { body, validationResult } = require('express-validator');

let app = express();

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.json());
dotenv.config();

///////////////////////////
////Authentiction//Routes//

router.post("/login", 
   body('email').isEmail().normalizeEmail().custom(value => {
      return db('users').where({
         email: value,
      }).select('id')
      .then(emailExists => {
         if (!emailExists[0]) 
            return Promise.reject('Incorrect login details');
         
      });
   }),
   body('password').isLength({ min: 5 }).trim().escape(),
      
   async (req, res) => {

      // vaalidatte login errorss
      const errors = validationResult(req);
      if (!errors.isEmpty()) 
        return res.status(400).json(formatResponse(false,'Validation erros',errors))
      

      //get user fromo database
      db('users').select('id','email','password')
      .where('email','=',req.body.email)
      .then(user => {

         user = user[0]         
         let validatePassword = bcrypt.compareSync(req.body.password,user.password);
   
         if (validatePassword) {
            
            // Create token
            const token = jwt.sign(
               { user: user.email },
               process.env.TOKEN_KEY,
               {
               expiresIn: "2h",
               }
            );

            // save user token
            user.token = token;

            return res.status(200).json(formatResponse(true,'Logged In',user))
            
         }else{ 
            return res.status(400).json(formatResponse(false,'Validation erros',formatError('Incorrect login credentials')))
         }
      })
      .catch((error) => {
         res.json(formatResponse(false,'caught login error',error))
      });

   }
)


router.post("/signup",   

   body('email').isEmail().normalizeEmail().custom(value => {
      return db('users').where({
         email: value,
      }).select('id')
      .then(emailExists => {
         if (emailExists[0]) 
            return Promise.reject('E-mail already in use');
         
      });
   }),
   body('password').isLength({ min: 5 }).trim().escape(),
   body('first_name').isLength({ min: 5 }).trim().escape(),
   body('last_name').isLength({ min: 5 }).trim().escape(),

   (req, res) => {
      // res.header("Access-Control-Allow-Origin", "*");

      const errors = validationResult(req);
      if (!errors.isEmpty()) 
        return res.status(400).json(formatResponse(false,'Validation erros',errors))
      

      bcrypt.hash(req.body.password, 10)
      .then(hashedPassword => {

         db('users')
         .insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword
         })
         .then(user => {

            db('wallets').insert({
               user: user[0],
               balance: 0
            })
            .then(userWallet => {
               res.status(201).json(formatResponse(true,'Signup successfull',userWallet))
            }).catch((error) => {
               res.json(formatResponse(false,'UserWallet',error))
            })

            // db('users').where({
            //    id: user[0],
            // }).select('id','email')
            // .then(getuser => {
            //    res.json(formatResponse(true,'Signup successfull',getuser))
            // })
            
         })
         .catch((error) => {
            res.json(formatResponse(false,'Signup',error))
         });

      }).catch((error) => {
         res.json(formatResponse(false,'Password encryption',error))
      });
})

router.get('/auth', function(req, res){

   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1]
   
   if (token == null) return res.status(401).json(formatResponse(false,'Validation erros',formatError('User not authenticated')))
   jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
   
      if (err) return res.status(401).json(formatResponse(false,'Validation erros',err))

      return res.status(200).json(formatResponse(true,'User authenticated',user))
   })
   
});



///////////////////////
////PROTECTED ROUTES///

router.get('/user/:email', (req, res) => {
   // const posts = await db('posts')
   // .join('users', 'users.id', 'posts.user_id')
   // .select('posts.id', 'users.username', 'posts.contents')
   // .where({user_id: id})
 
   db('users').select('users.email','users.first_name','users.last_name','wallets.balance','wallets.id')
   .where('email','=',req.params.email)
   .join('wallets', 'wallets.user', 'users.id')
   .then(user  => {
      user = user[0]
      if(user){
         db('transactions').select('transactions.amount', 'transactions.is_debit', 'transactions.is_credit', 'transactions.is_transfer')
         .where('wallet','=', user.id)
         .join('wallets', 'wallets.id', 'transactions.wallet')
         .then(transactions  => {
            user.transactions = transactions
            return res.status(200).json(formatResponse(true,'User details',user))
         }).catch((error) => {
            return res.status(404).json(formatResponse(false,'User Wallet',formatError('User, wallet not found')))
         });  
         
      } else
         return res.status(404).json(formatResponse(false,'Not found',formatError('User not found')))
   }).catch((error) => {
      return res.status(404).json(formatResponse(false,'Authentication erros',formatError('User not found')))
   });  
})

            // db('users').where({
            //    id: user[0],
            // }).select('id','email')
            // .then(getuser => {
            //    res.json(formatResponse(true,'Signup successfull',getuser))
            // })

///////////////////////
////HELPER FUNCTIONS///



function formatResponse(status=true,message="",data=[]){
      return {
       status: status,
       message : message,
       data : data
    }
}

function formatError(message="An error occured"){

   let error = [
      {
        "msg": message
      },
   ];
   
   return {
      errors: error
   };
}

module.exports = router;