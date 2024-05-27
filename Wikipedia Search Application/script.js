let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function CreateAndUpdateSearchresult(result) {
    //1.Div Containner----create Result Element 
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);
    //2. Anchor Tatile --Creating a Tatile
    let {
        title,
        link,
        description
    } = result;
    let resultTatileEl = document.createElement("a");
    resultTatileEl.classList.add("result-title");
    resultTatileEl.href = link;
    resultTatileEl.textContent = title;
    resultTatileEl.target = "_blank";
    resultItemEl.appendChild(resultTatileEl);
    //3.Tatile break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);
    //4.Anchor URL--- result url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    urlEl.target = "_blank";
    urlEl.href = link;
    resultItemEl.appendChild(urlEl);
    //5.line break
    let linebreakEl = document.createElement("br");
    resultItemEl.appendChild(linebreakEl);
    //6.Paragraph DEscription
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add(link - description);
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
}

function displayResult(search_results) {
    spinnerEl.classList.toggle("d-none");
    for (let result of search_results) {
        CreateAndUpdateSearchresult(result);
    }
}

function Searchwikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInputValue = searchInputEl.value;
        let URL = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        let options = {
            method: "Get",
        };
        fetch(URL, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonDate) {
                let {
                    search_results
                } = jsonDate;
                displayResult(search_results);
            });
    }
}
addEventListener("keydown", Searchwikipedia);