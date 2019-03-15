module.exports = {
    USER_SELF: "houmanproject",
    ENVIRONMENT: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || "3003",
    HOST: process.env.HOST || "localhost",
    CSRFTOKEN : "",
    SESSIONID : "",
    LOGINMODE: "NONE" // This can be either CLI, API or NONE
};
