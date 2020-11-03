import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import "../scss/components/EmailWhiteBook.view.scss";
import "../scss/components/Modal.view.scss";

interface IPropsEmailWhiteBookView {
    handleNameChange: (event: any) => void;
    handleOrganisationChange: (event: any) => void;
    handleJobTitleChange: (event: any) => void;
    handleEmailChange: (event: any) => void;
    onSubmit: () => void;
    handleHide: () => void;
    userName: string;
    userOrganisation: string;
    userJobTitle: string;
    userEmail: string;
    show: boolean;
    modalBody: string;
    modalTitle: string;
    modalButtonText: string;
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
                            <p className={"form-description"}>Vous voulez tester Wooclap <strong>gratuitement</strong> ? C’est par <a href={"https://app.wooclap.com/auth/register?lang=fr"}>ici</a> !</p>
                        </div>
                        <button 
                            className="btn btn-custom" 
                            onClick={this.props.onSubmit}>
                            Télécharger
                        </button>
                        <Modal
                            show={this.props.show}
                            onHide={this.props.handleHide}
                            backdrop="static"
                            keyboard={false}>
                            <Modal.Header closeButton>
                            <Modal.Title>{this.props.modalTitle}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.props.modalBody}
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={this.props.handleHide}>
                                {this.props.modalButtonText}
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmailWhiteBookView;
