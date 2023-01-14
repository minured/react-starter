import React from "react";
import "./app.less";
import ClassCom from "./demo/DecoratorCom";
import amber from "../public/images/amber.png";
import officialSite from "../public/images/official-site.png";

const App = () => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.APP_ENV);

    return (
        <>
            <h1>webpack5 react18</h1>
            <ClassCom />
            <hr />
            <img src={amber} alt="amber" width={500} />
            <p>小于10kb的图片转换成base64</p>
            <img src={officialSite} alt="" />
        </>
    );
};

export default App;
