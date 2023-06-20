const db = firebase.firestore();

const college = document.querySelector('#college');
const title = document.querySelector('#title');
const description = document.querySelector('#description');

const sentiment = new Promise((res) => {
    const senti = ml5.sentiment('movieReviews', () => res(senti));
});

db.collection('colleges').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        const collegeOption = document.createElement('option');
        collegeOption.setAttribute('value', doc.id);
        collegeOption.textContent = doc.data().name;

        college.appendChild(collegeOption);
    })
});

document.getElementById("addForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const {score} = (await sentiment).predict(description.value);

    await db.collection('colleges').doc(college.value).collection('reviews').add({
        title: title.value,
        description: description.value,
        score
    });

    title.value = '';
    description.value = '';

    alert('Review added successfully!');
});
