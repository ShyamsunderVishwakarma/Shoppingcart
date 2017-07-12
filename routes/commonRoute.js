//include express library
var express = require('express');
var router = express.Router();

//include controllers files
var accountController = require('../controllers/accountController');
var adminController = require('../controllers/adminController');
var supplierController = require('../controllers/supplierController');
var customerController = require('../controllers/customerController');
var helpdeskController = require('../controllers/helpdeskController');

//include middleware files
var isAuthenticate = require('../middlewares/authenticationMiddleware');

//route definition

/* account route*/
router.post('/registration',accountController.registration);
router.post('/login',accountController.login);

/* admin route */
router.get('/admin',isAuthenticate,adminController.getUserList);
router.put('/admin/:userid',isAuthenticate,adminController.updateUser);
router.delete('/admin/:userid',isAuthenticate,adminController.removeUser);

/* supplier route */
router.post('/supplier',isAuthenticate,supplierController.addProduct);
router.delete('/supplier/:productid',isAuthenticate,supplierController.removeProduct);
router.put('/supplier/:productid',isAuthenticate,supplierController.updateProduct);
router.get('/supplier',isAuthenticate,supplierController.getAllProducts);

/* customer route */
router.post('/customer',isAuthenticate,customerController.addItem);
router.post('/helpdesk',isAuthenticate,customerController.raiseTicket);

/* helpdesk route */
router.get('/helpdesk',isAuthenticate,helpdeskController.getAllTickets);
router.put('/helpdesk/:ticketid',isAuthenticate,helpdeskController.updateTicket);

module.exports = router;