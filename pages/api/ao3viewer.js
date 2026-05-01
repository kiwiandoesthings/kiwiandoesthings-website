var storyView = document.getElementById("ao3-story-view");
var storyTitle = document.getElementById("ao3-story-title");
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var storyId = urlParams.get('storyID');
var pageNum = urlParams.get('page');

async function loadStory() {
	var storyResult = await fetch("https://api.kiwiandoesthings.place/getao3text?storyID=" + storyId + "&page=" + pageNum);
	var json = await storyResult.json();
	storyTitle.innerHTML = json.title + ", Chapter " + json.chapter;
	storyView.innerHTML = json.content;
}

loadStory();