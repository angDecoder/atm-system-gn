'use strict';

exports.modules = {
    USER: "user",
    ATM : "atm"
}

exports.responseMessages = {
    SUCCESS                     : "Success",
    FAILURE                     : "Failure",
    USER_ALREADY_REGISTERED     : "User already registered with us. Try signing in",
    REGISTER_SUCCESS            : "User registered successfully",
    INVALID_CREDENTIALS         : "Invalid Credentials!",
    INVALID_AUTH_KEY            : "Invalid Token!",
    USER_NOT_FOUND              : "User not registered with us",
    USER_INACTIVE               : "This User is not active or blocked by admin. Please contact admin.",
    ALREADY_EXISTS              : "User already exists.",
    MISSING_PARAMETER           : "Insufficient information was supplied. Please check and try again!"
}

exports.responseStatus = {
    SUCCESS                     : 200,
    BAD_REQUEST                 : 400,
    FAILURE                     : 401,
    CONFLICT                    : 409,
    SESSION_EXPIRED             : 440,
};