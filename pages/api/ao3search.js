var searchInput = document.getElementById("ao3-story-search");
var searchButton = document.getElementById("ao3-search-submit");
var searchResults = document.getElementById("story-search-results");
var pageInput = document.getElementById("ao3-story-search-page");

searchInput.onkeydown = function(event) {
	if (event.key === "Enter") {
		searchStory();
	}
};
searchButton.onclick = searchStory;

let abortController = null;
async function searchStory() {
	searchResults.innerHTML = "Search results are loading...<br>If it takes more than 20 seconds to load, press the search button again.";
	if (abortController) {
        abortController.abort();
        console.log("Previous fetch canceled.");
    }
	try {
		abortController = new AbortController();
    	const { signal } = abortController;
		var pageValue = pageInput.value;
		if (Number.isFinite(pageValue)) {
			pageValue = 0;
		}
		var searchResult = await fetch("https://api.kiwiandoesthings.place/getao3storyid?storyTitle=" + searchInput.value + "&page=" + pageValue, {signal});
		if (!searchResult.ok) {
            searchResults.innerHTML = "Failed to fetch search results with error \"" + searchResult.status + "\". Please retry. If the issue persists, message @KiwianDoesThings on Discord with the error message.";
            return; 
        }
	} catch (error) {
		if (error.name === 'AbortError') {
            return;
        }

		searchResults.innerHTML = "Failed to fetch search results with error \"" + error + "\". Please retry. If the issue persists, message @KiwianDoesThings on Discord with the error message.";
		return;
	}
	var json = await searchResult.json();
	console.log(json);

	if (json.length == 0) {
		searchResults.innerHTML = "No search results found";
		return;
	}
	searchResults.innerHTML = "";
	json.forEach((work) => {
        const div = document.createElement('li');
            
        div.innerHTML = "<a href=\"javascript:void(0)\" onclick=\"viewStory(" + work.id + ", 0)\">" + work.info + "</a>";
        searchResults.appendChild(div);
    });
}

function viewStory(id, page) {
	window.location = "ao3storyviewer.html?storyID=" + id + "&page=" + page;
}