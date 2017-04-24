Place configuration files in this directory.

The *config.js* file is git ignored since it contains passwords.
It should export an object like this: 

```javascript

module.exports = {
    'secretKey'             : A_SECRET_KEY_OF_YOUR_CHOICE_FOR_PASSPORT,
    'mongoUrl'              : YOUR_MONGO_URL,
    'elasticemailAPIKey'    : YOUR_ELASTICEMAIL_API_KEY,
    'elasticemailConfirm'   : ELASTICEMAIL_CONFIRMATION_TEMPLATE,
    'baseUrl'               : API_BASE_URL,
    'facebook'  : { 
        'clientID'      : YOUR_FACEBOOK_APP_CLIENT_ID,
        'clientSecret'  : YOUR_FACEBOOK_APP_CLIENT_ID
    }
}

```
Where:

+ __secretKey__ will be used by [passport](http://passportjs.org) for Json Web Token. You can generate a random key as you wish
+ __mongoUrl__ is the url of your mongo, which needs to be up and running. We use MongoDB to store users and all persistent data. If you use docker, the [official mongo image](https://hub.docker.com/r/_/mongo) is great. Please do [secure your db with a password](https://docs.mongodb.com/manual/core/authentication)!
+ __elasticemailAPIKey__ is your [Elastic Email](https://elasticemail.com) API key. If you want to use the email API (to send confirmation links to users), you need an Elastic Email account. The service features a pay as you go [pricing](https://elasticemail.com/pricing), starting for free with 150,000 emails per month. The API key shall then be found in your account [API settings](https://elasticemail.com/account/#/settings/apiconfiguration).
+ __elasticemailConfirm__ refers to an [Elastic Email template](https://elasticemail.com/support/user-interface/templates) for the confirmation email that will be sent to users via email API. This string will be concatenated to the user's locale to build the template name. For example, you want to call your template for British users `test_confirmemail_en-GB`: in this case the value for this property needs to be `test_confirmemail`. Use two parameters in the template: `{username}` (like to say *Hello, {username}!*) and `{url}`. This important template parameter is going to contain the link for the user to click in order to confirm their email address    
+ __baseUrl__ is the base url of your Saint-Just Auth API
+ __facebook.clientID__  is the client id of your [Facebook APP](https://developers.facebook.com/apps/) (if you enable Facebook Login)
+ __facebook.clientSecret__ is the client secret of your [Facebook APP](https://developers.facebook.com/apps/) (if you enable Facebook Login)