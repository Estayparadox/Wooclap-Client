export async function sendMail(name: string, email_address: string): Promise<String | void> {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email_address", email_address);
    urlencoded.append("name", name);

    var requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    return fetch(`${process.env.REACT_APP_API_URL}send-mail`, requestOptions)
    .then(response => response.text())
    .then((responseData) => {
        return responseData;
    })
    .catch(error => console.log('error', error));
}

export async function sendCustomMail(organisation: string, concernedUsers: string): Promise<String | void> {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("organisation", organisation);
    urlencoded.append("concernedUsers", concernedUsers);

    var requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    return fetch(`${process.env.REACT_APP_API_URL}send-custom-mail`, requestOptions)
    .then(response => response.text())
    .then((responseData) => {
        return responseData;
    })
    .catch(error => console.log('error', error));
}




