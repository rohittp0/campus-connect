const db = firebase.firestore();

const reviewsDiv = document.getElementById('reviews');

function renderReviews(title, content, score) {
    return `<div class="card" style="width: 100%">
        <div class="card-header">
            ${title}
        </div>
        <div class="card-body">
            <p class="card-text">
               ${content}
            </p>
            <h6>Positive Score
                <span class="badge text-bg-secondary">${score}</span>
            </h6>
        </div>
    </div>`;
}

const collegeId = new URLSearchParams(window.location.search).get('college');

db.collection(`colleges/${collegeId}/reviews`).get().then((snapshot) => {
    const reviews = snapshot.docs.map(doc => {
        let {title, description, score} = doc.data();
        if(!score)
            score = Math.floor(Math.random() * 100);
        return renderReviews(title, description, score);
    });

    reviewsDiv.innerHTML = reviews.join('');
});
