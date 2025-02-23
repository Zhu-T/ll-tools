"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var navbar_1 = require("@/components/navbar");
require("@/styles/globals.css");
var v15_appRouter_1 = require("@mui/material-nextjs/v15-appRouter");
function App(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    return (React.createElement("div", { className: "app-container" },
        React.createElement("main", { className: "main-content" },
            React.createElement(v15_appRouter_1.AppRouterCacheProvider, null,
                React.createElement(navbar_1["default"], null),
                React.createElement(Component, __assign({}, pageProps))))));
}
exports["default"] = App;
