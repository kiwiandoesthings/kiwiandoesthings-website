var storyView = document.getElementById("ao3-story-view");
var storyTitle = document.getElementById("ao3-story-title");
var storyAdvance = document.getElementById("ao3-story-advance");
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var storyId = urlParams.get('storyID');
var pageNum = urlParams.get('page');

async function loadStory() {
	try {
		var storyResult = await fetch("https://api.kiwiandoesthings.place/getao3text?storyID=" + storyId + "&page=" + pageNum);
		if (!storyResult.ok) {
			storyView.innerHTML = "Failed to fetch story text with error \"" + storyResult.status + "\". Please reload the page. If the issue persists, message @KiwianDoesThings on Discord with the error message.";
			return;
		}
	} catch (error) {
		storyView.innerHTML = "Failed to fetch story text with error \"" + error + "\". Please reload the page. If the issue persists, message @KiwianDoesThings on Discord with the error message.";
		return;
	}
	var json = await storyResult.json();
	storyTitle.innerHTML = json.title + ", Chapter " + json.chapter;
	storyView.innerHTML = json.content;
}

loadStory();

storyAdvance.onclick = () => {
	window.location = "ao3storyviewer.html?storyID=" + storyId + "&page=" + (parseInt(pageNum) + 1);
};