import React, { Component } from "react";
import { IOrganisations } from "../models/organisations";
import { IStats } from "../models/stats";
import { IUserHasAlreadySubmit } from "../models/userHasAlreadySubmit";
import { IUsers } from "../models/users";
import { sendCustomMail, sendMail } from "../services/Mail.service";
import { getOrganisations, updateOrganisation } from "../services/Organisations.service";
import { getStats } from "../services/Stats.service";
import { getUsersHasAlreadySubmit, postUserHasAlreadySubmit } from "../services/UserHasAlreadySubmit.service";
import { getUsers, postUser } from "../services/Users.service";
import { getDomainFromEmailAddress, isValidEmail } from "../utils/mail";
import EmailWhiteBookView from "./EmailWhiteBook.view";

interface IStateEmailWhiteBookContainer {
    userName: string;
    userEmail: string;
    userOrganisation: string;
    userJobTitle: string;
    userList: IUsers[];
    userHasAlreadySubmitList: IUserHasAlreadySubmit[];
    organisationList: IOrganisations[];
    statList: IStats[];
    show: boolean;
    modalBody: string;
    modalTitle: string;
    modalButtonText: string;
}

interface IPropsEmailWhiteBookContainer {}

class EMailWhiteBookContainer extends Component<IPropsEmailWhiteBookContainer, IStateEmailWhiteBookContainer> {
    constructor(props: IPropsEmailWhiteBookContainer) {
        super(props);

        this.state = {
            userName: "",
            userEmail: "",
            userOrganisation: "",
            userJobTitle: "",
            userList: [],
            userHasAlreadySubmitList: [],
            organisationList: [],
            statList: [],
            show: false,
            modalBody: "Un mail vous a été envoyé.",
            modalTitle: "Merci pour intérêt !",
            modalButtonText: "Super !"
        };
    }

    componentDidMount(): void {
        this.fetchData();
    }

    fetchData(): void {
        this.fetchUsers();
        this.fetchUsersHasAlreadySubmit();
        this.fetchOrganisations();
        this.fetchStats();
    }

    handleShow(success: boolean): void {
        if (success) {
            this.setState({
                show: true,
                modalTitle: "Erreur lors de l'envoie.",
                modalBody: "Remplissez correctement le formulaire, tous les champs sont requis.",
                modalButtonText: "J'ai compris"
            })
        } else {
            this.setState({
                show: true
            })
        }
    }

    handleHide(): void {
        this.setState({
            show: false
        })
        setTimeout( () => {
            this.setState({
                modalTitle: "Merci pour intérêt !",
                modalBody: "Un mail vous a été envoyé.",
                modalButtonText: "Super !"
            });
        }, 1000)   
    }

    handleNameChange(event: any): void {
        this.setState({
            userName: event.target.value
        })
    }

    handleOrganisationChange(event: any): void {
        this.setState({
            userOrganisation: event.target.value
        })
    }

    handleJobTitleChange(event: any): void {
        this.setState({
            userJobTitle: event.target.value
        })
    }

    handleEmailChange(event: any): void {
        this.setState({
            userEmail: event.target.value
        })
    }

    async fetchUsers() {
        const response: any = await getUsers();
        if (response) {
            const userList: IUsers[] = JSON.parse(response).data
            this.setState({
                userList: userList
            })
        }
    }

    async fetchUsersHasAlreadySubmit(): Promise<void> {
        const response: any = await getUsersHasAlreadySubmit();
        if (response) {
            const userList: IUserHasAlreadySubmit[] = JSON.parse(response).data
            this.setState({
                userHasAlreadySubmitList: userList
            })
        }
    }

    async fetchOrganisations(): Promise<void> {
        const response: any = await getOrganisations();
        if (response) {
            const organisationList: IOrganisations[] = JSON.parse(response).data
            this.setState({
                organisationList: organisationList
            })
        }
    }

    async fetchStats(): Promise<void> {
        const response: any = await getStats();
        if (response) {
            const statList: IStats[] = JSON.parse(response).data
            this.setState({
                statList: statList
            })
        }
    }

    getInteractionsFromUserId(userId: number): string {
        let result = "";
        let stats = this.state.statList;
        let userStats = stats.filter(e => e.user_id === userId);
        if (userStats.length > 0) {
            result = ` Number of Created Events=${userStats[0].nb_created_events}` +
            ` Number of Created Questions=${userStats[0].nb_created_questions}` +
            ` Number of Collected Answers=${userStats[0].nb_collected_answers}`;
        }
        return result;
    }

    getUserJobFromEmail(email: string): string {
        let result = "";
        let interestedUsers = this.state.userHasAlreadySubmitList;
        let userHasJob = interestedUsers.filter(e => e.email_address === email);
        if (userHasJob.length > 0) {
            result = ` Job=${userHasJob[0].job_title}`;
        }
        return result;
    }

    setupMailContent(organisation: string, concernedUsers: IUsers[], lastUser: any): void {
        let content = "";
        let firstContent = `- Name: ${lastUser.name} Email Address=${lastUser.email_address}, Job=${lastUser.job_title}`;
        concernedUsers.forEach(e => {
            content = content +
            `- Name: ${e.name} Email Adress=${e.email_address}` +
            ` Job=${this.getUserJobFromEmail(e.email_address)}` +
            `${this.getInteractionsFromUserId(e.id)} <br>`;
        });
        let finalContent = content + firstContent;
        sendCustomMail(organisation, finalContent);
    }

    async checkOrganisations(name: string, email: string, job: string): Promise<void> {
        var userDomain = getDomainFromEmailAddress(email);
        let userDomainInOrganisations = this.state.organisationList.filter(e => e.email_domain === userDomain);
        if (userDomainInOrganisations.length > 0) {
            const organisationDomain = userDomainInOrganisations[0].email_domain;
            let favoriteDomainCounter = this.state.userList.filter(e => getDomainFromEmailAddress(e.email_address) === organisationDomain);
            if (favoriteDomainCounter.length >= 9 && userDomainInOrganisations[0].is_client !== 1) {
                await updateOrganisation(
                    userDomainInOrganisations[0].id,
                    userDomainInOrganisations[0].name,
                    userDomainInOrganisations[0].email_domain,
                    1
                );
                this.fetchOrganisations();
                const lastUser = {
                    name: name,
                    email_address: email,
                    job_title: job
                }
                this.setupMailContent(
                    userDomainInOrganisations[0].name,
                    favoriteDomainCounter,
                    lastUser
                );
            }
        }
    }

    checkInputs(name: string, email: string, orga: string, job: string): boolean {
        if (name !== "" && isValidEmail(email) && orga !== "" && job !== "")
            return true
        return false
    }

    async onSubmit(): Promise<void> {
        const data = {
            userName: this.state.userName,
            userEmail: this.state.userEmail,
            userOrganisation: this.state.userOrganisation,
            userJobTitle: this.state.userJobTitle 
        };
        this.fetchData();
        if (!this.checkInputs(data.userName, data.userEmail, data.userOrganisation, data.userJobTitle) !== true) {
            this.handleShow(false);
            return;
        }
        let emailExist = this.state.userList.filter(e => e.email_address === data.userEmail);
        let alreadySubmit = this.state.userHasAlreadySubmitList.filter(e => e.email_address === data.userEmail)
        if (emailExist.length > 0 && alreadySubmit.length > 0) {
            sendMail(data.userName, data.userEmail);
        } else if (emailExist.length > 0 && alreadySubmit.length < 1) {
            await postUserHasAlreadySubmit(data.userName, data.userJobTitle, data.userOrganisation, data.userEmail);
            sendMail(data.userName, data.userEmail);
        } else {
            await this.checkOrganisations(data.userName, data.userEmail, data.userJobTitle);
            await postUser(data.userName, data.userEmail);
            await postUserHasAlreadySubmit(data.userName, data.userJobTitle, data.userOrganisation, data.userEmail);
            sendMail(data.userName, data.userEmail);
        }
        this.handleShow(true);
        this.fetchData();
    }

    render(): JSX.Element {
        return (
            <div>
                <EmailWhiteBookView
                    userName={this.state.userName}
                    userOrganisation={this.state.userOrganisation}
                    userJobTitle={this.state.userJobTitle}
                    userEmail={this.state.userEmail}
                    show={this.state.show}
                    modalBody={this.state.modalBody}
                    modalTitle={this.state.modalTitle}
                    modalButtonText={this.state.modalButtonText}
                    handleNameChange={this.handleNameChange.bind(this)}
                    handleOrganisationChange={this.handleOrganisationChange.bind(this)}
                    handleJobTitleChange={this.handleJobTitleChange.bind(this)}
                    handleEmailChange={this.handleEmailChange.bind(this)}
                    onSubmit={this.onSubmit.bind(this)}
                    handleHide={this.handleHide.bind(this)}
                />
            </div>
        );
    }
}

export default EMailWhiteBookContainer;