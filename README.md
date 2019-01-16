Description
===========

[Node.js](http://nodejs.org/) wrapper for the [Google Contacts API](https://developers.google.com/google-apps/contacts/v3/).

Requirements
============

* [Node.js](http://nodejs.org/) -- v0.10.32 or newer
  
Examples
========

* Set user's credentials. If you provide a refresh_token and expiry_date (milliseconds since the Unix Epoch) and the access_token has expired, the access_token will be automatically refreshed and the request is replayed.

```javascript
var GoogleContacts = require("ideia2001-google-api-contacts");

var googleContacts = new GoogleContacts(CLIENT_ID, CLIENT_SECRET);
var credentials    = {
  access_token : "ya29.GlyZBE5XzlI43OMOWbZueT",
  expiry_date  : 1501494739000,               // Set it true to force a refresh always.
  refresh_token: "1/wmz9DHCBg0CNtmKZVH_Wg",
  token_type   : "Bearer"
};

googleContacts.setUserCredentials(credentials);
```

* Fetch all the contact's info such as 'name', 'email id', 'contact id' and 'contact type'.

```javascript
googleContacts.getContacts(function (error, data) {
    console.log("Error " + error);
    console.log("Data " + JSON.stringify(data));
});
```

* Fetch the contact's info such as 'name', 'email id', 'contact id' and 'contact type' for a given contact id.

```javascript
var options = {
  contact_id: '123er45456',
  headers   :{                          // Optional
        'GData-Version': '3.0',
        'User-Agent'   : 'SomeAgent'
    },
};
googleContacts.getContacts(options, function (error, data) {
    console.log("Error " + error);
    console.log("Data " + JSON.stringify(data));
});
```

* Fetch the contact's info using query parameters.

  For more info about [query_params](https://developers.google.com/google-apps/contacts/v3/reference#contacts-query-parameters-reference)

```javascript
var options = {
  query_params: {    
    q: "ram@gmail.com"
  },
  headers     :{                          // Optional
        'GData-Version': '3.0',
        'User-Agent'   : 'SomeAgent'
    },
};
googleContacts.getContacts(options, function (error, data) {
    console.log("Error " + error);
    console.log("Data " + JSON.stringify(data));
});
```

* Add a new contact into user's google contacts.

```javascript
var options = {
    name        : 'Ram',                    // Default is ''
    is_primary  : true,                     // Default is true
    headers     :{                          // Optional
        'GData-Version': '',
        'User-Agent'   : 'SomeAgent'
    }
};
googleContacts.addContact(options, function (error) {
    console.log("Error " + error);
});
```

* Delete a contact or a list of contacts from user's google contacts list.

```javascript
var options = {
    contact_ids: '1232131bv4324',          // Or a array of contact ids e.g. ['1332rweff4', '21312edsadsa',...]
    headers    :{                          // Optional
        'GData-Version': '3.0',
        'User-Agent'   : 'SomeAgent'
    }
};
googleContacts.deleteContacts(options, function (error) {
    console.log("Error " + error);
});
```

TODO
====

* Updation of a contact.

