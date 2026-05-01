var searchInput = document.getElementById("ao3-story-search");
var searchButton = document.getElementById("ao3-search-submit");
var searchResults = document.getElementById("story-search-results");

searchInput.onsubmit = searchStory
searchButton.onclick = searchStory;

async function searchStory() {
	var searchResult = await fetch("https://api.kiwiandoesthings.place/getao3storyid?storyTitle=" + searchInput.value);
	var json = await searchResult.json();
	console.log(json);

	Object.entries(json).forEach(([id, info]) => {
        const div = document.createElement('li');
            
        div.innerHTML = "<a href=\"javascript:void(0)\" onclick=\"viewStory(" + id + ", 0)\">" + info + "</a>";
        searchResults.appendChild(div);
    });
}

function viewStory(id, page) {
	window.location = "ao3storyviewer.html?storyID=" + id + "&page=" + page;
}