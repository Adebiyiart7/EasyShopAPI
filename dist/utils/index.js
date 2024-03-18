"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
const apiResponse = (code, message, body) => {
    return {
        code: code,
        message: message || '',
        body: body,
    };
};
exports.apiResponse = apiResponse;
