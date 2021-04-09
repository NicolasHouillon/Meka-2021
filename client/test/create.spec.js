import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import New from "../src/components/Quizz/New";

describe("TodoList", () => {
    it("renders", () => {
        mount(<New />);
    });

    it("initially displays 1 form with 3 input", () => {
        const wrapper = mount(<New />);
        expect(wrapper.find("form")).to.have.lengthOf(1);
        expect(wrapper.find("input")).to.have.lengthOf(3);
        expect(
            wrapper.find("input[type='text']").map(el => el.getDOMNode().value)
        ).to.eql(["", ""]);
    });

    it("click on the last button", () => {
        const wrapper = mount(<New />);
        wrapper.find("input[type='text']").getDOMNode().value = "New item";
        wrapper
            .find("button")
            .last()
            .simulate("click");
        expect(wrapper.url).to.equal('http://localhost:3000/quizz');
    });

    it("add an item", () => {
        const wrapper = mount(<TodoList />);
        wrapper
            .find("button")
            .first()
            .simulate("click");
        expect(wrapper.url).to.equal('http://localhost:3000/quizz');
    });
});

