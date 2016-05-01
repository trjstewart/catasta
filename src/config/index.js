var config  = {
	database: {
		mongo: {
			uri: 'mongodb://catasta:catastarocks@ds011732.mlab.com:11732/catasta'
		}
	},
	express: {
		session: {
			secret: 'this_is_a_secret'
		}
	}
};

module.exports = config;