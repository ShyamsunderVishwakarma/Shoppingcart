var crypto = require('crypto');

//included configuration file
var config = require('../configurations/config');

//generate random string for salt
var genRandomString = function(length)
{
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};


//hash password with salt
var sha512 = function(password, salt)
{
    var hash = crypto.createHmac(config.hashAlgorithm, salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

//return salt and hashpassword
exports.getSaltHashPassword = function(userpassword) 
{
    var salt = genRandomString(config.saltStringLenth); 
    var passwordData = sha512(userpassword, salt);
    return passwordData; 
}

//validate password
exports.validatePassword = function(password,salt,hashpassword){

	var passwordData = sha512(password,salt);
    
	if(passwordData.passwordHash == hashpassword)
	{
		return true;
	}
	else
	{
		return false;
	}

}