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
var ChevronLeft_1 = require("@mui/icons-material/ChevronLeft");
var ChevronRight_1 = require("@mui/icons-material/ChevronRight");
var Menu_1 = require("@mui/icons-material/Menu");
var AppBar_1 = require("@mui/material/AppBar");
var Box_1 = require("@mui/material/Box");
var CssBaseline_1 = require("@mui/material/CssBaseline");
var Divider_1 = require("@mui/material/Divider");
var Drawer_1 = require("@mui/material/Drawer");
var IconButton_1 = require("@mui/material/IconButton");
var List_1 = require("@mui/material/List");
var ListItem_1 = require("@mui/material/ListItem");
var ListItemButton_1 = require("@mui/material/ListItemButton");
var ListItemText_1 = require("@mui/material/ListItemText");
var styles_1 = require("@mui/material/styles");
var Toolbar_1 = require("@mui/material/Toolbar");
var router_1 = require("next/router");
var React = require("react");
var pages = {
    'Lease': '/ll-tools-formats/lease',
    'Test': '/ll-tools-formats/lease'
};
var drawerWidth = 200;
var AppBar = styles_1.styled(AppBar_1["default"], {
    shouldForwardProp: function (prop) { return prop !== 'open'; }
})(function (_a) {
    var theme = _a.theme;
    return ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        variants: [
            {
                props: function (_a) {
                    var open = _a.open;
                    return open;
                },
                style: {
                    width: "calc(100% - " + drawerWidth + "px)",
                    marginLeft: drawerWidth + "px",
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen
                    })
                }
            },
        ]
    });
});
var DrawerHeader = styles_1.styled('div')(function (_a) {
    var theme = _a.theme;
    return (__assign(__assign({ display: 'flex', alignItems: 'center', padding: theme.spacing(0, 1) }, theme.mixins.toolbar), { justifyContent: 'flex-end' }));
});
function PersistentDrawerLeft() {
    var router = router_1.useRouter();
    var theme = styles_1.useTheme();
    var _a = React.useState(false), open = _a[0], setOpen = _a[1];
    var handleDrawerOpen = function () {
        setOpen(true);
    };
    var handleDrawerClose = function () {
        setOpen(false);
    };
    var navigate = function (key) {
        if (key)
            router.push(pages[key]);
    };
    return (React.createElement(Box_1["default"], { sx: { display: 'flex' } },
        React.createElement(CssBaseline_1["default"], null),
        React.createElement(AppBar, { position: "sticky", open: open },
            React.createElement(Toolbar_1["default"], null,
                React.createElement(IconButton_1["default"], { color: "inherit", "aria-label": "open drawer", onClick: handleDrawerOpen, edge: "start", sx: [
                        {
                            mr: 2
                        },
                        open && { display: 'none' },
                    ] },
                    React.createElement(Menu_1["default"], null)))),
        React.createElement(Drawer_1["default"], { sx: {
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box'
                }
            }, variant: "persistent", anchor: "left", open: open },
            React.createElement(DrawerHeader, null,
                React.createElement(IconButton_1["default"], { onClick: handleDrawerClose }, theme.direction === 'ltr' ? React.createElement(ChevronLeft_1["default"], null) : React.createElement(ChevronRight_1["default"], null))),
            React.createElement(Divider_1["default"], null),
            React.createElement(List_1["default"], null, (Object.keys(pages)).map(function (page) { return (React.createElement(ListItem_1["default"], { disablePadding: true },
                React.createElement(ListItemButton_1["default"], { key: page, onClick: function () { return navigate(page); } },
                    React.createElement(ListItemText_1["default"], { primary: page })))); })))));
}
exports["default"] = PersistentDrawerLeft;
