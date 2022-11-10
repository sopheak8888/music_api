"use strict";
exports.__esModule = true;
exports.GetUser = void 0;
var common_1 = require("@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)(function (data, ctx) {
    var req = ctx.switchToHttp().getRequest();
    delete req.user.password;
    delete req.user.salt;
    return req.user;
});
