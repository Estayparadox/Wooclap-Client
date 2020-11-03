import React, { Component } from "react";
import ArticleView from "./Article.view";


class ArticleContainer extends Component {

    render(): JSX.Element {
        return (
            <div>
                <ArticleView/>
            </div>
        );
    }
}

export default ArticleContainer;