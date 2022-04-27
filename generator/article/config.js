const { createInfo } = require( "./createInfo" );
const BASE_MD_PATH = "./markdown";
const BASE_HTML_PATH = "./template/article";
const BASE_BUILD_PATH = "./article";

const createJavascriptInfo = _ => {

    const name = "javascript";
    const alias = "JavaScript";
    const md_path = BASE_MD_PATH + "/" + name;
    const html_path = BASE_HTML_PATH + "/" + name;
    const build_path = BASE_BUILD_PATH;
    const children = [
        { name: "code-structure", alias: "代码结构" },
        { name: "operators", alias: "运算符" },
        { name: "strict-mode", alias: "严格模式" },
    ];
    const options = {
        name,
        alias,
        children,
        mdPath: md_path,
        htmlPath: html_path,
        buildPath: build_path,
    };

    return createInfo( options );

}

const createBabelInfo = _ => {

    const name = "babel";
    const alias = "Babel";
    const md_path = BASE_MD_PATH + "/" + name;
    const html_path = BASE_HTML_PATH + "/" + name;
    const build_path = BASE_BUILD_PATH;
    const children = [
        { name: "babel", alias: "Babel7" },
    ];
    const options = {
        name,
        alias,
        children,
        mdPath: md_path,
        htmlPath: html_path,
        buildPath: build_path,
    };

    return createInfo( options );

};

const createWebpackInfo = _ => {

    const name = "webpack";
    const alias = "Webpack";
    const md_path = BASE_MD_PATH + "/" + name;
    const html_path = BASE_HTML_PATH + "/" + name;
    const build_path = BASE_BUILD_PATH;
    const children = [
        { name: "webpack", alias: "Webpack5" },
    ];
    const options = {
        name,
        alias,
        children,
        mdPath: md_path,
        htmlPath: html_path,
        buildPath: build_path,
    };

    return createInfo( options );

};

const createNpmInfo = _ => {

    const name = "npm";
    const alias = "NPM";
    const md_path = BASE_MD_PATH + "/" + name;
    const html_path = BASE_HTML_PATH + "/" + name;
    const build_path = BASE_BUILD_PATH;
    const children = [
        { name: "npm-base", alias: "npm 基础" },
        { name: "npm-command", alias: "npm 命令" },
    ];
    const options = {
        name,
        alias,
        children,
        mdPath: md_path,
        htmlPath: html_path,
        buildPath: build_path,
    };

    return createInfo( options );

};

const createOtherInfo = _ => {

    const name = "other";
    const alias = "Others";
    const md_path = BASE_MD_PATH + "/" + name;
    const html_path = BASE_HTML_PATH + "/" + name;
    const build_path = BASE_BUILD_PATH;
    const children = [
        { name: "semantic-versioning", alias: "语义化版本控制" },
    ];
    const options = {
        name,
        alias,
        children,
        mdPath: md_path,
        htmlPath: html_path,
        buildPath: build_path,
    };

    return createInfo( options );

};

const createAllInfo = _ => {

    return ( [
        createJavascriptInfo(),
        createNpmInfo(),
        createBabelInfo(),
        createWebpackInfo(),
        createOtherInfo(),
    ] );

};

module.exports = createAllInfo();
