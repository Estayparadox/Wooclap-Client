import React, { Component } from "react";
import "../scss/components/EmailWhiteBook.view.scss";

interface IPropsEmailWhiteBookView {
    handleNameChange: (event: any) => void;
    handleOrganisationChange: (event: any) => void;
    handleJobTitleChange: (event: any) => void;
    handleEmailChange: (event: any) => void;
    onSubmit: () => void;
    userName: string;
    userOrganisation: string;
    userJobTitle: string;
    userEmail: string;
}

class EmailWhiteBookView extends Component<IPropsEmailWhiteBookView> {
    constructor(props: IPropsEmailWhiteBookView) {
        super(props);
    }

    render(): JSX.Element {
        return ( 
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2>Téléchargez le livre blanc !</h2>
                    <div className={"form-card"}>
                        <div className="form-group col-md-12">
                            <p className={"label-p"}>Votre nom*</p>
                            <input
                                id={"userName"}
                                name={"userName"}
                                value={this.props.userName ? this.props.userName : ""}
                                onChange={this.props.handleNameChange}
                                className={"form-control"}/>
                        </div>
                        <div className="form-group col-md-12">
                            <p className={"label-p"}>Votre organisation*</p>
                            <input 
                                id={"userOrganisation"}
                                name={"userOrganisation"}
                                value={this.props.userOrganisation ? this.props.userOrganisation : ""}
                                onChange={this.props.handleOrganisationChange}
                                className={"form-control"} />
                        </div>
                        <div className="form-group col-md-12">
                            <p className={"label-p"}>Votre profession*</p>
                            <input
                                id="userJobTitle"
                                name="userJobTitle"
                                value={this.props.userJobTitle ? this.props.userJobTitle : ""}
                                onChange={this.props.handleJobTitleChange}
                                className={"form-control"} />
                        </div>
                        <div className="form-group col-md-12">
                            <p className={"label-p"}>Votre adresse email*</p>
                            <input 
                                id="userEmail"
                                name="userEmail"
                                value={this.props.userEmail ? this.props.userEmail : ""}
                                onChange={this.props.handleEmailChange} 
                                className={"form-control"} />
                        </div>
                        <div className={"validation-form"}>
                            <p className={"form-description"}>Vous voulez tester Wooclap <strong>gratuitement</strong> ? C’est par <a>ici</a> !</p>
                        </div>
                        <button 
                            className="btn btn-custom" 
                            onClick={this.props.onSubmit}>
                            Télécharger
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmailWhiteBookView;
