import React from "react";
import "./app.less";

const App = () => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.APP_ENV);

    return <h1>webpack5 react18</h1>;
};

export default App;
