import React, { PureComponent } from "react";

function addAge(Target: Function) {
    Target.prototype.age = 111;
}

@addAge
class ClassCom extends PureComponent {
    age?: number;
    render() {
        return <div>class component, age from decorator: {this.age}</div>;
    }
}

export default ClassCom;
