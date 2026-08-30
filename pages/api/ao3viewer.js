var storyView = document.getElementById("ao3-story-view");
var storyTitle = document.getElementById("ao3-story-title");
var storyAdvance = document.getElementById("ao3-story-advance");
var storyDevance = document.getElementById("ao3-story-devance");
var pageInput = document.getElementById("ao3-story-goto-page");
var pageSubmit = document.getElementById("ao3-story-goto-page-submit");
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var storyId = urlParams.get('storyID');
var pageNum = urlParams.get('page');

async function loadStory() {
	var slowLoadTimer = setTimeout(() => {
        storyView.innerHTML = "Hold on... it's taking a bit to load this one.";
    }, 10000);

	try {
		var storyResult = await fetch("https://api.kiwiandoesthings.place/getao3text?storyID=" + storyId + "&page=" + pageNum);

		clearTimeout(slowLoadTimer);
		if (!storyResult.ok) {
			if (storyResult.status === 404 || storyResult.status === 502) {
				searchResults.innerHTML = "My computer is off!!! Sorry!!! If it's outside of school hours, feel free to message me to tell me to turn it back on, thanks.";
			} else {
				storyView.innerHTML = "Failed to fetch story text with error \"" + storyResult.status + "\". Please reload the page. If the issue persists, message @KiwianDoesThings on Discord with the error message.";
			}
			return;
		}
	} catch (error) {
		clearTimeout(slowLoadTimer);
		if (error instanceof TypeError) {
			searchResults.innerHTML = "My computer is off!!! Sorry!!! If it's outside of school hours, feel free to message me to tell me to turn it back on, thanks.";
		} else {
			storyView.innerHTML = "Failed to fetch story text with error \"" + error + "\". Please reload the page. If the issue persists, message @KiwianDoesThings on Discord with the error message.";
		}
		return;
	}
	var json = await storyResult.json();
	if (json.error != undefined) {
		storyTitle.innerHTML = "Error Encountered";
		if (json.error === "list index out of range") {
			storyView.innerHTML = "This story does not have the chapter you navigated to.";
			return;
		} else {
			storyView.innerHTML = "Encountered an unknown error. Please send this to me to get the issue fixed: \"" + json.error + "\"";
		}

		return;
	}

	storyTitle.innerHTML = json.title + ", Chapter " + json.chapter;
	storyView.innerHTML = json.content;
	if (json.chapterCount == json.chapter) {
		storyAdvance.classList.add("link-disabled");
	} else {
		storyAdvance.classList.remove("link-disabled");
	}

	if (json.chapter == 1) {
		storyDevance.classList.add("link-disabled");
	} else {
		storyDevance.classList.remove("link-disabled");
	}
}

loadStory();

storyAdvance.onclick = () => {
	window.location = "ao3storyviewer.html?storyID=" + storyId + "&page=" + (parseInt(pageNum) + 1);
};

storyDevance.onclick = () => {
	if (parseInt(pageNum) == 0) {
		return;
	}
	window.location = "ao3storyviewer.html?storyID=" + storyId + "&page=" + (parseInt(pageNum) - 1);
};

pageSubmit.onclick = () => {
	window.location = "ao3storyviewer.html?storyID=" + storyId + "&page=" + (parseInt(pageInput.value) - 1);
}