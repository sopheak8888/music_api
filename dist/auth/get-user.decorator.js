"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    try {
        const req = ctx.switchToHttp().getRequest();
        delete req.user.password;
        delete req.user.salt;
        return req.user;
    }
    catch (error) {
        return null;
    }
});
//# sourceMappingURL=get-user.decorator.js.map