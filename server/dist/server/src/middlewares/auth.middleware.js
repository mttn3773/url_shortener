"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    try {
        console.log(req.session);
        const user = req.session.user;
        if (!user)
            return res
                .status(401)
                .send({
                error: {
                    msg: "Not authenticated",
                    param: "authentication",
                },
            })
                .end();
        return next();
    }
    catch (e) {
        return res
            .status(500)
            .send({ error: { msg: e.message, param: "authentication" } })
            .end();
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map