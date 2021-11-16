const express = require('express')
const router = express.Router()
const {User} = require('../models');

//fungsi emty objek
function isEmpty(obj) { return Object.keys(obj).length == 0;}

//untuk error hendling
const errorResponse = (res, error) => {
    console.log(error); 
    return res.status(500).send({
        status: "Server error..."
    })
}

// Show
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                role: 'admin',
            }
        });
        res.send({
            status: 'success',
            users,
        })
    } catch (error) {
       errorResponse(res,error);
    }
    
})
// Get data user by id
router.get('/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const user = await User.findOne({
                where: {
                    id,
                }
            });
            res.send({
                status: user ? 'success' : 'user not found',
                user,
            })
        } catch (error) {
              errorResponse(res,error);
        }
})

// Insert
router.post('/', async (req, res) => {
    try {
        const { fullName, email, password, role }  = req.body;

        if(!fullName || !email || !password || !role){
            return res.send({
                status: "Validation error",
            });
        }

        const user = await User.create({
            fullName, email, password, role,
       })

        res.send({
            status: "User successfully created",
            user,
        })
    } catch (error) {
        errorResponse(res,error);
    }
})

// Edit or update
router.patch('/:id', async (req, res) => {
  try {
      const {id} = req.params
      const body = req.body

      if(isEmpty(body)){
           return res.send({
               status: "Validation error",
           });
       }

      //if id exist
      const findUserById = await User.findOne({
          where: {id}
      })


      // if user not exist
      if(!findUserById){
          return res.send ({
              status: "User not found",
          })
      }

      //proses update
      const updatedUser = await User.update(body, {
          where: {id}
      })

       //proses update
      const dataUpdate = await User.findOne({
          where: {id}
      })


      res.send({
          status: "User succesfully update...",
          user: dataUpdate,
      })
    //   console.log(updatedUser);

  } catch (error) {
    errorResponse(res,error);
  }
})

// Delete
router.delete('/:id', async (req, res) => {
  try {
      const {id} = req.params;
      
         //if id exist
      const findUserById = await User.findOne({
          where: {id}
      })


      // if user not exist
      if(!findUserById){
          return res.send ({
              status: "User not found",
          })
      }

      await User.destroy({
        where: {id,},
      });

      res.send({
          status: "User succesfully delete..."
      })
  } catch (error) {
       errorResponse(res,error);
  }
})




module.exports = router