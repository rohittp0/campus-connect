const db = firebase.firestore();

const collegesDiv = document.getElementById('colleges');
const searchInput = document.getElementById('search');

let colleges = [];

function renderCollege(name, url, id) {
    return `<div class="card" style="width: 18rem;">
            <img src="${url}" class="card-img-top" >
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <a href="/read?college=${id}" class="btn btn-primary">Read More</a>
            </div>
        </div>`;
}

db.collection('colleges').get().then((snapshot) => {
    colleges = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    collegesDiv.innerHTML = colleges
        .map(({name, url, id}) => renderCollege(name, url, id))
        .join('');
});


searchInput.addEventListener('keyup', (e) => {
    const v = e.target.value;
    console.log(v)
    collegesDiv.innerHTML = colleges.filter(({name}) => !v || name.toLowerCase().includes(v))
        .map(({name, url, id}) => renderCollege(name, url, id))
        .join('');
});
