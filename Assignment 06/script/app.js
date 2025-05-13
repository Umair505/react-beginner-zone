const loadLesson = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevel(data.data))
        .catch(error => console.error("Error fetching lessons:", error)); 
};

const showLoading = () =>{
    document.getElementById("loading").classList.remove("hidden")
    document.getElementById("card-container").classList.add("hidden")
}
const hideLoading = () =>{
    document.getElementById("loading").classList.add("hidden")
    document.getElementById("card-container").classList.remove("hidden")
}

const removeActiveClass = () =>{
    const activeClass = document.getElementsByClassName("active");
    for(let btn of activeClass)
    {
        btn.classList.remove('active');
    }
}

function loadLessonsByLevel(id){
    showLoading();
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const clickedBtn = document.getElementById(`${id}`)
        removeActiveClass();
        clickedBtn.classList.add('active');
        displayAllLessons(data.data)
    });
}

function displayLevel(lessons) {
    const lessonContainer = document.getElementById("lesson-container");
    if (!lessonContainer) {
        console.error("Lesson container not found!");
        return;
    }

    lessons.forEach(lesson => {
        const lessonDiv = document.createElement("div");
        lessonDiv.innerHTML = `
            <button class="button1" id="${lesson.level_no}" onclick="loadLessonsByLevel(${lesson.level_no})">
                <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
            </button>
        `;
        lessonContainer.appendChild(lessonDiv);
    });
}
const ShowDetailsWord = (word) =>{
    document.getElementById("details-word").showModal()
    const modal = document.getElementById("modal-box");
    modal.innerHTML =`
    <h1 class="py-4 text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone" onclick="pronounceWord('${word.word}')"></i>:${word.pronunciation})</h1>
                <h2 class="text-lg font-bold">Meaning</h2>
                <p class="pb-2 text-lg bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>
                <h2 class="text-lg font-semibold">Example</h2>
                <h3 class="text-lg ">${word.sentence}</h3>
                <p class="pt-4 pb-2">সমার্থক শব্দ গুলো</p>
                <div id="synonyms-container" class="flex gap-2 flex-wrap"></div>
    `;
    const synonymsContainer = document.getElementById("synonyms-container");
    if (word.synonyms && word.synonyms.length > 0) {
        word.synonyms.forEach((syn) => {
            const button = document.createElement("button");
            button.className = "btn bg-white border border-gray-300 px-2 py-1 rounded";
            button.innerText = syn;
            synonymsContainer.appendChild(button);
        });
    } else {
        synonymsContainer.innerHTML = "";
    }
    modal.appendChild(div);
}

const loadDetailWords = (id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => ShowDetailsWord(data.data));
}

const displayAllLessons = (lessons) =>{
    hideLoading();
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    document.getElementById("next_lesson").classList.add("hidden");
    document.getElementById("select-lesson").classList.add("hidden");

    if (lessons.length == 0) {
        document.getElementById("next_lesson").classList.remove("hidden");
    }

    lessons.forEach(lesson => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="card bg-white py-10 m-5 w-4/5 rounded-lg">
                <div class="text-center">
                    <h1 class="text-xl font-bold">${lesson.word}</h1>
                    <p class="py-4">${lesson.pronunciation}</p>
                    <h1 class="bangla text-xl font-bold">"${lesson.meaning ? lesson.meaning : "অর্থ পাওয়া যাইনি"}"</h1>
                </div>
                <div class="flex justify-around">
                    <div class=" p-2 rounded-lg ">
                        <button class="btn bg-[rgba(26,145,255,0.1)] tooltip" data-tip="Details" onclick="loadDetailWords(${lesson.id})"><i class="fa-solid fa-circle-info"></i></button>
                    </div>
                    <div  class="">
                        <button class="btn bg-[rgba(26,145,255,0.1)] tooltip" data-tip="Pronunciation" onclick="pronounceWord('${lesson.word}')"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
            </div>
        `
        cardContainer.appendChild(card);
    })

}
// const loadLessonItems = (id) =>{
//     showLoading();
//     const url = `https://openapi.programming-hero.com/api/level/3`
//     fetch(url)
//     .then(res => res.json())
//     .then(data => {
//         const clickedBtn = document.getElementById(id);
//         // console.log(data.data[0]);
//     })
// }
// loadLessonItems();
loadLesson();