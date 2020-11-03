import React, { Component } from "react";
import "../scss/components/Article.view.scss";
import header from "../assets/header.png";
import infographic from "../assets/infographic.png";
import headway from "../assets/headway.png"

class ArticleView extends Component {

    handleScrollToList() {
        window.scrollTo({
            top: 0
        })
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                <div className={"first-article"}>
                    <img className={"img-header"} src={header} alt="header"/>
                    <div className={"left-part"}>
                        <h3 className={"blue-title"}>Livre blanc en libre accès</h3>
                        <h1 className={"black-title"}>Construire des campus apprenants</h1>
                        <p className={"article-text"}>A quoi ressembleront les campus de demain ? Retour sur les révolutions numériques et pédagogiques qui bousculent aujourd’hui les établissements de l’enseignement supérieur.</p>
                        <button 
                            className="btn btn-custom" 
                            onClick={this.handleScrollToList}>
                            Télécharger gratuitement
                        </button>
                    </div>
                </div>
                <div className={"second-article"}>
                    <img className={"img-infographic"} src={infographic} alt="infographic"/>
                    <div className={"right-part"}>
                        <h2 className={"black-title"}>Ce que vous allez y apprendre</h2>
                        <div className={"fake-list"}>
                            <div className={"container-fa"}>
                                <i className={"fa fa-check check-icon"}/>
                            </div>
                            <p className={"article-text"}>Tout sur les révolutions numériques et pédagogiques</p>
                        </div>
                        <div className={"fake-list"}>
                            <div className={"container-fa"}>
                                <i className={"fa fa-check check-icon"}/>
                            </div>
                            <p className={"article-text"}>Les différentes mutations des espaces pédagogiques</p>
                        </div>
                        <div className={"fake-list"}>
                            <div className={"container-fa"}>
                                <i className={"fa fa-check check-icon"}/>
                            </div>
                            <p className={"article-text"}>A quoi ressembleront les campus de demain</p>
                        </div>
                        <div className={"fake-list"}>
                            <div className={"container-fa"}>
                                <i className={"fa fa-check check-icon"}/>
                            </div>
                            <p className={"article-text"}>Quels sont les freins et leviers de la transformation numérique dans la pédagogie</p>
                        </div>
                    </div>
                </div>
                <div className={"third-article"}>
                    <img className={"img-headway"} src={headway} alt="headway"/>
                    <div className={"left-part"}>
                        <h2 className={"black-title"}>En partenariat avec HEADway</h2>
                        <p className={"article-text"}>Fondé en 2011, <a href={process.env.REACT_APP_APP_URL}>HEADway Advisory</a> est le leader français du conseil en stratégie exclusivement dédié aux acteurs de l’enseignement supérieur, de la recherche et de la formation. Leur expertise leur permet d’avoir une vision globale des défis que leurs clients doivent relever, tout en apportant des solutions sur mesure adaptées aux enjeux particuliers de chaque institution.</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ArticleView;