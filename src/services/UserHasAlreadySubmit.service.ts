export async function getUsersHasAlreadySubmit(): Promise<String | void> {
    var requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(`${process.env.REACT_APP_API_URL}user-has-already-submit`, requestOptions)
    .then(response => response.text())
    .then((responseData) => {
        return responseData;
    })
    .catch(error => console.log('error', error));
}

export async function postUserHasAlreadySubmit(
    name: string,
    jobTitle: string,
    organisation: string,
    email: string
    ): Promise<String | void> {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", name);
    urlencoded.append("job_title", jobTitle);
    urlencoded.append("organisation", organisation);
    urlencoded.append("email_address", email);

    var requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    return fetch(`${process.env.REACT_APP_API_URL}submit-form`, requestOptions)
    .then(response => response.text())
    .then((responseData) => {
        return responseData;
    })
    .catch(error => console.log('error', error));
}