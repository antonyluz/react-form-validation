export async function signIn({ username, password }) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(username === "user" && password === "pass123") {
                resolve();
            } else {
                reject();
            }
        }, 1000);
    });
}