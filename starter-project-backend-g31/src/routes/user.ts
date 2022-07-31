import {
    getUsers,
    getUserById,
    filterUsers,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/user-controller';
import * as express from 'express';
const router = express.Router();

/*
 * @typedef User
 * @property {string} name.required - User name
 * @property {string} email.required - User email address
 * @property {string} password.required - User password with a minimum length requirement of 6
 */

/*
 * Returns ALL Users 
 * @route GET /users
 * @returns {object} 200 - Array of users 
 * @returns {Error}  default - Unexpected error 
 */ 
router.get('/', getUsers); 

/*
 * Get a user by id
 * @route GET /users/{id}
 * @param {string} id.path.required - user id
 * @returns {object} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
router.get('/:id', getUserById); 


/*
 * Returns filetered User by name
 * @route GET /users/filter/:name 
 * @param {string} name.query - filter query of name
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error 
 */ 
router.get('/filter/:name', filterUsers); 


/*
 * Returns filetered User by email
 * @route GET /users/filter/:email
 * @param {string} email.query - filter query of email
 * @returns {object} 200 - User object
 * @returns {Error}  default - Unexpected error 
 */ 
router.get('/filter/:email', filterUsers); 


/*
 * Create a new user
 * @route Post /users
 * @param {USER.model} user.body - the new user object 
 * @returns {object} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
router.post('/', createUser); 


/*
 * Update an existing user by id 
 * @route Put /users/update/:id
 * @param {string} id.path.required - user id 
 * @param {USER.model} user.body - the updated user object 
 * @returns {object} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
router.put('/update/:id', updateUser); 


/*
 * Remove a user  with id 
 * @route DELETE /users/delete/:id
 * @param {string} id.path.required - user id 
 * @returns {object} 200 - User object 
 * @returns {Error}  default - Unexpected error 
 */ 
router.delete('/delete/:id', deleteUser); 


module.exports = router; 
