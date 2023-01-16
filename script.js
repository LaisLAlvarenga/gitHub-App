const inputname = document.querySelector('#inputSearch');
const buttonInputName = document.querySelector('#searchButton');
const buttonCleanUser = document.querySelector('#cleanButton');

const users = document.querySelector('.users');
const followers = document.querySelector('.followers');

const buttonSearch = document.querySelector('#button-addon2'); /* fILTER */

async function getData() {
    const inputName = inputname.value;
    const response = await fetch(`https://api.github.com/users/${inputName}/followers`).then(response => response.json());    
    
    return response;
}

async function getUserMain() {
    const inputName = inputname.value;
    await fetch(`https://api.github.com/users/${inputName}`).then(response => response.json()).then(data => {
        const divUser = document.createElement('div');
        divUser.setAttribute('class', 'user');

        const avatarMain = document.createElement('img');
        avatarMain.setAttribute('class', 'avatarImg');
        avatarMain.src = data.avatar_url;

        const nameMain = document.createElement('p');
        nameMain.setAttribute('class', 'name');
        nameMain.textContent = data.name;
        
        const loginMain = document.createElement('p');
        loginMain.setAttribute('class', 'login');
        loginMain.textContent = data.login;

        const bioMain = document.createElement('p');
        bioMain.setAttribute('class', 'bio');
        bioMain.textContent = data.bio;

        divUser.appendChild(avatarMain)
        divUser.appendChild(nameMain)
        divUser.appendChild(loginMain)
        divUser.appendChild(bioMain)

        users.appendChild(divUser);
    });

    const data = await getData();
    data.forEach( user => renderUsers(user) );
}

function renderUsers(user) {
    const follower = document.createElement('div');
    follower.setAttribute('class', 'follower');

    const avatar = document.createElement('img');
    avatar.setAttribute('class', 'avatarImgUser');
    avatar.src = user.avatar_url;

    const loginUser = document.createElement('p');
    loginUser.setAttribute('class', 'follower-name');
    loginUser.textContent = user.login;

    follower.appendChild(avatar);
    follower.appendChild(loginUser);
    
    followers.appendChild(follower);
}

async function filter() {
    const inputSearch = document.querySelector('#inputFilter').value;

    const users = await getData();
    const resultFilter = users.filter(word => word.login == inputSearch);

    if(resultFilter.length != 0) {
        resultFilter.forEach(test => {
            followers.innerHTML = '';
            renderUsers(test)
        });
    }
    else {
        followers.innerHTML = '<p>Nenhum resultado encontrado.</p>'
    }    
}

buttonInputName.addEventListener('click', getUserMain);

buttonSearch.addEventListener('click', filter);

buttonCleanUser.addEventListener('click', function(){
    location.reload();
})