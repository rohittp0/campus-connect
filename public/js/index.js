const db = firebase.firestore();

const collegesDiv = document.getElementById('colleges');

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
    const colleges = snapshot.docs.map(doc => {
        const {name, url} = doc.data();
        return renderCollege(name, url, doc.id);
    });

    collegesDiv.innerHTML = colleges.join('');
});
