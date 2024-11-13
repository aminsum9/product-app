
import dcodeIO from 'bcryptjs';

class AuthServices {

    generateRandomCode = (length = 20) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
    }

    checkPassword = async (inputPassword, hashedPassword) => {
        const isMatch = await dcodeIO.compare(inputPassword, hashedPassword);
        return isMatch;
    }
      
    hashPassword = async (password) => {
        const saltRounds = 10;
        const hashedPassword = await dcodeIO.hash(password, saltRounds);

        return hashedPassword;
    }

    login = async (body) => {
        var result = {
            success: true,
            message: ''
        };

        if(!body.email || !body.password)
        {
            return {
                success: false,
                message: 'Please fill all required data!'
            }
        }

        var users = localStorage.getItem('users');

        if(users)
        {
            // check email
            var dataUsers = JSON.parse(users);

            for (let i = 0; i < dataUsers.length; i++) {
                var e = dataUsers[i];

                if(e.email == body.email)
                {
                    var checkPass = await this.checkPassword(body.password, e.password)

                    if(checkPass)
                    {
                        var randomCode = this.generateRandomCode();

                        localStorage.setItem('token', randomCode);

                        // update user
                        var newUser = {
                            name: e.name,
                            email: e.email,
                            address: e.address,
                            password: e.password,
                            token: randomCode
                        }

                        var usersWithNoCurrentUser = await dataUsers.filter(item => {
                            return item.email != e.email;
                        })

                        var newUsers = [...usersWithNoCurrentUser, newUser];
        
                        localStorage.setItem('users',JSON.stringify(newUsers));
                        localStorage.setItem('auth', JSON.stringify(newUser));

                        result = {
                            success: true,
                            message: 'Login successful!'
                        };
                    } else {
                        result = {
                            success: false,
                            message: 'Wrong password!'
                        };
                    }
                } else {
                    result = {
                        success: false,
                        message: 'User not found!'
                    }
                }
                
            }
        } else {
            result = {
                success: false,
                message: 'User not found!'
            };
        }

        return result;
    }

    register = async (body) => {

        var result = {
            success: true,
            message: 'Registration successful!'
        };

        if(!body.name || !body.email || !body.address || !body.password || !body.password_conf)
        {
            return {
                success: false,
                message: 'Please fill all required data!'
            }
        }

        if(body.password != body.password_conf)
        {
            return {
                success: false,
                message: "Password and Confirmation Password don't match!"
            }
        }

        var users = localStorage.getItem('users');

        if(users)
        {
            // check email
            var dataUsers = JSON.parse(users);

            for (let i = 0; i < dataUsers.length; i++) {
                const e = dataUsers[i];

                if(e.email == body.email)
                {
                    result = {
                        success: false,
                        message: 'Email already used!'
                    };
                }
                
            }

            var randomCode = this.generateRandomCode();

            var decryptedPass = await this.hashPassword(body.password);

            if(result.success)
            {
                var newUser = {
                    name: body.name,
                    email: body.email,
                    address: body.address,
                    password: decryptedPass,
                    token: randomCode
                }

                dataUsers = dataUsers.push(newUser);

                localStorage.setItem('token', randomCode);
                localStorage.setItem('auth', JSON.stringify(newUser));

                localStorage.setItem('users', JSON.stringify(dataUsers));
            }
        } else {

            var randomCode = this.generateRandomCode();

            var decryptedPass = await this.hashPassword(body.password);

            var newUser = {
                name: body.name,
                email: body.email,
                address: body.address,
                password: decryptedPass,
                token: randomCode
            }

            localStorage.setItem('token', randomCode);
            localStorage.setItem('auth', JSON.stringify(newUser));

            localStorage.setItem('users', JSON.stringify([newUser]));

        }

        return result;

    }

    logout = async (body) => {
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
        window.location.href = '/';
    }

}

export default AuthServices;