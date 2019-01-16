/**
 * MIT licensed.
 */

'use strict';

var xmlbuilder = require("xmlbuilder");

var CONSTANTS = require('./constants');

var CreateContact = function (contactInfo) {
    this._name = contactInfo.name || '';
    this._email = contactInfo.email || '';
    this._phone = contactInfo.phoneNumber || '888'
    this._displayName = contactInfo.display_name || this._name;
    this._isPrimary = contactInfo.is_primary !== false;
    this._contactType = contactInfo.contact_type || CONSTANTS.CONTACT_TYPE.OTHER;

    this._extendedProperties = contactInfo.extended_property || [];
};

CreateContact.prototype.addExtendedProperty = function (name, value) {
    this._extendedProperties.push({
        name: name,
        value: value
    });
};

CreateContact.prototype.getXml = function () {
    var self = this;
    var obj = {
        'entry': {
            '@xmlns:atom': 'http://www.w3.org/2005/Atom',
            '@xmlns:gd': 'http://schemas.google.com/g/2005',
            'gd:name': {
                'gd:fullName': self._name
            },
            'gd:phoneNumber': [{
                '@rel': 'http://schemas.google.com/g/2005',
                '@primary': self._isPrimary,
                "#text": self._phone
            }]
        }
    };

    var extendedPropertiesLen = self._extendedProperties.length;
    if (extendedPropertiesLen !== 0) {
        for (var idx = 0; idx < extendedPropertiesLen; idx++) {
            obj['atom:entry']['gd:extendedProperty'] = {
                '@name': self._extendedProperties[idx].name,
                '@value': self._extendedProperties[idx].value
            };
        }
    }

    return xmlbuilder.create(obj).toString();
};

module.exports = CreateContact;
