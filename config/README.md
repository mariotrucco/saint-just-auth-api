Place configuration files in this directory.

The *config.js* file is git ignored since it contains passwords.
It should export an object like this: 

```javascript

module.exports = {
    'secretKey': A_SECRET_KEY_OF_YOUR_CHOICE_FOR_PASSPORT,
    'mongoUrl' : YOUR_MONGO_URL
}

```
