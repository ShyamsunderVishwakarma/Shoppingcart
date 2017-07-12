module.exports ={

	tokenSecretKey : 'mytokensecretkey',
	saltStringLenth : 16,
	hashAlgorithm : 'sha512',
	mongoconfig : {
			'database': 'mongodb://localhost/shoppingcart'
		},
	tokenconfig :{
		'secret':'mytokensecret'
	},
	sessionSecretKey : 'MySessionSecret'
}