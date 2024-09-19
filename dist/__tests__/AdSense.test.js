"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/__tests__/AdSense.test.tsx
var react_1 = __importDefault(require("react"));
var react_2 = require("@testing-library/react");
var index_1 = require("../index");
describe("AdSense", function () {
    it("renders without crashing", function () {
        (0, react_2.render)(react_1.default.createElement(index_1.AdSenseProvider, { client: "ca-pub-6380030036040607" },
            react_1.default.createElement(index_1.AdSense, { slot: "8412192778" })));
        expect(react_2.screen.getByRole("complementary")).toBeInTheDocument();
    });
    it("applies correct props", function () {
        (0, react_2.render)(react_1.default.createElement(index_1.AdSenseProvider, { client: "ca-pub-6380030036040607" },
            react_1.default.createElement(index_1.AdSense, { slot: "8412192778", format: "fluid", layout: "in-article" })));
        var adElement = react_2.screen.getByRole("complementary");
        expect(adElement).toHaveAttribute("data-ad-slot", "8412192778");
        expect(adElement).toHaveAttribute("data-ad-format", "fluid");
        expect(adElement).toHaveAttribute("data-ad-layout", "in-article");
    });
});
