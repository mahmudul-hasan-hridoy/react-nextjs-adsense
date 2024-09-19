"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/__tests__/useAdSense.test.tsx
var react_1 = __importDefault(require("react"));
var react_2 = require("@testing-library/react");
var index_1 = require("../index");
var TestComponent = function () {
    var _a = (0, index_1.useAdSense)(), isEnabled = _a.isEnabled, isLoaded = _a.isLoaded, error = _a.error;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            "Enabled: ",
            isEnabled.toString()),
        react_1.default.createElement("div", null,
            "Loaded: ",
            isLoaded.toString()),
        react_1.default.createElement("div", null,
            "Error: ",
            error || "None")));
};
describe("useAdSense", function () {
    it("provides correct context values", function () {
        (0, react_2.render)(react_1.default.createElement(index_1.AdSenseProvider, { client: "ca-pub-6380030036040607" },
            react_1.default.createElement(TestComponent, null)));
        expect(react_2.screen.getByText("Enabled: true")).toBeInTheDocument();
        expect(react_2.screen.getByText("Loaded: false")).toBeInTheDocument();
        expect(react_2.screen.getByText("Error: None")).toBeInTheDocument();
    });
});
