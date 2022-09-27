import { getUser, signOutUser, getProfiles } from '../fetch-utils.js';
import { renderProfile } from '../render-utils.js';

const signOutLink = document.getElementById('sign-out-link');
const profileList = document.getElementById('profile-list');

let error = null;
let profiles = [];

window.addEventListener('load', async () => {
    const response = await getProfiles();
    error = response.error;
    profiles = response.data;

    if (error) {
        console.log(error);
    }
    if (profiles) {
        displayProfiles();
    }
});

async function displayProfiles() {
    const user = getUser();
    for (const profile of profiles) {
        const profileEl = renderProfile(profile, user.id);
        profileList.append(profileEl);
    }
}

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

signOutLink.addEventListener('click', signOutUser);
