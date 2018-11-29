
export class CSLink {

    constructor(url) {
        this.url = url;
    }

    get_code(address) {

        const details = {
            address: address
        };

        let formBody = [];
        for (const property in details) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(this.url + '/link_code', {
            method: 'POST',
            body: formBody,
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });
    }

}
