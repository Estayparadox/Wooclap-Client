export async function getOrganisations(): Promise<String | void> {
    var requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(`${process.env.REACT_APP_API_URL}organisations`, requestOptions)
    .then(response => response.text())
    .then((responseData) => {
        return responseData;
    })
    .catch(error => console.log('error', error));
}

export async function updateOrganisation(id: number, name: string, email: string, isClient: number): Promise<String | void> {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("is_client", isClient.toString());
    urlencoded.append("name", name);
    urlencoded.append("email_domain", email);
    
    var requestOptions: RequestInit = {
            method: 'PATCH',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
    };
    
    return fetch(`${process.env.REACT_APP_API_URL}organisation/${id}`, requestOptions)
    .then(response => response.text())
    .then((responseData) => {
        return responseData;
    })
    .catch(error => console.log('error', error));
}

