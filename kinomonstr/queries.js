var mysql = require('mysql'); 

var connection = require('./db_handler'); 
var pass_handler = require('./password_handler'); 
const cache = require('memory-cache');


module.exports = {
	curr_user: '', 
	get_users: function(req, res){
		connection.query("SELECT * FROM users1", (err, result, field) => {
			result => result.text().then(result => {
			//console.log(err);
			console.log(result);
			//response.send(result);
			let users = JSON.parse(result);
			for (let i = 0; i < users.length; i++) {
				return '<h3> ' + users[i]['username'] + ' </h3>'
			}
			res.send(users.join('')); 
	   		})
		});
		
	}, 
	check_user: function(req, res, next) { 
		var self = this;
		console.log(req.body);
		var inserts = {
			username: req.body.username
		}; 
		connection.query("SELECT * FROM users1 WHERE username LIKE '" + inserts.username + "'", (err, result, field) => {
			const users = JSON.parse(JSON.stringify(result.map(row => ({ id: row.id, username: row.username, password: row.password }))));
			console.log("SELECT * FROM users1 WHERE username LIKE '" + inserts.username + "'")
			console.log(users);
			if (users.length > 0) {
				self.curr_user = users[0]['username'];  				
				// Перейти до перевірки пароля
				next()
			} 
			else {
				res.status(409).send('user not found!'); 
			} 
			console.log("check_user 52");
		});		
	}, 

    check_pass: function (req, res) { 

		var self = this; 
		var inserts = {
			password_hash: pass_handler.encrypt_pass(req.body.password) 
		}	

		connection.query("SELECT * FROM users1 WHERE username LIKE '" + self.curr_user  + "' and password LIKE '" + inserts.password_hash + "'", (err, result, field) => {
			const users = JSON.parse(JSON.stringify(result.map(row => ({ id: row.id, user_id: row.user_id, username: row.username, password: row.password }))));
			console.log(users);
			// имя пользователя найдено 
			if (users.length > 0) {
				console.log(users[0]['username']);
				//localStorage.setItem("current_user", users[0]['username']);
				cache.put("username", users[0]['username']);
				cache.put("id_username", users[0]['user_id']);
				//req.session.username = users[0]['username'];
				//console.log("username", users[0]['username']);
				//#console.log("id_username", users[0]);
				res.status(200).send('user ' + users[0]['username'] + ' logged in!'); 
			}
			// пароль невірний
			else {
				res.status(404).send('wrong password!'); 
			}
	   	})	
	},

	singOut : function (req, res){
		cache.put("username", '');
		cache.put("id_username", '');
		res.status(200).send('You have successfully logged out!');
	}
}