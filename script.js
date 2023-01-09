//const url = 'https://api.github.com/users';
const urlFollowers = 'https://api.github.com/users/giovannamoeller/followers';

const followers = document.querySelector('.followers');

async function getData() {
    const response = await fetch(urlFollowers).then(response => response.json());    
    console.log(response);
    
    return response;
}

function renderUsers(user) {
    const follower = document.createElement('div');
    follower.setAttribute('class', 'follower');

    const avatar = document.createElement('img');
    avatar.src = user.avatar_url;

    const loginUser = document.createElement('p');
    loginUser.setAttribute('class', 'follower-name');
    loginUser.textContent = user.login;

    follower.appendChild(avatar);
    follower.appendChild(loginUser);
    
    followers.appendChild(follower);
}

window.onload = async function() {
    const data = await getData();
    const urlfollowers = data.followers_url;
    console.log(urlfollowers)

    data.forEach(user => {
        renderUsers(user)
    });
}