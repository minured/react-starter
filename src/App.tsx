import React, { useState, lazy, Suspense } from "react";
import "@/app.less";
import ClassCom from "@/demo/DecoratorCom";
import amber from "@/assets/images/amber.png";
import officialSite from "@/assets/images/official-site.png";

// 会被单独打包
const LazyComponent = lazy(() => import("@/demo/LazyCom"));

const App = () => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.APP_ENV);

    const [visible, setVisible] = useState(false);

    return (
        <>
            <h1>webpack5 react18</h1>
            <ClassCom />
            <hr />
            <img src={amber} alt="amber" width={500} />
            <p>小于10kb的图片转换成base64</p>
            <img src={officialSite} alt="" />
            <button
                onClick={() => {
                    // 单独打包的css
                    import("./demo/lazy.less");
                    setVisible(!visible);
                }}
            >
                load component
            </button>
            {visible && (
                <Suspense>
                    <LazyComponent />
                </Suspense>
            )}
        </>
    );
};

export default App;
