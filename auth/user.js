import { getUser, signOutUser, getProfile } from '../fetch-utils.js';

const signOutLink = document.getElementById('sign-out-link');

// make sure we have a user!
const user = getUser();
if (!user) {
    const base =
        location.pathname === '/' ||
        location.pathname === '/solutions-web/user-auth/'
            ? './'
            : '../';
    location.replace(
        `${base}auth/?redirectUrl=${encodeURIComponent(location)}`
    );
}

let error = null;
let profile = [];

signOutLink.addEventListener('click', signOutUser);

window.addEventListener('load', async () => {
    const response = await getProfile(user.id);
    error = response.error;
    profile = response.data;

    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return;
    }
    if (profile) {
        displayProfile();
    }
});

async function displayProfile() {}
