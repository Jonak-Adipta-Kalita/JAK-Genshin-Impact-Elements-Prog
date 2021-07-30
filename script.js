const dex = document.getElementById('dex');
const fetchElements = async () => {
    const url = "/elements.json";
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	const elements = data.element.map((result, index) => ({
		...result,
		id: index + 1,
		image: `./images/${result.image}`
	}));
	displayElements(elements);
};

const displayElements = (element) => {
    const elementsHTMLString = element
        .map((elemente) => (`
			<li class="card" onclick="selectElement(${elemente.id})">
				<img class="card-image" src="${elemente.image}"/>
				<h2 class="card-title">${elemente.id}. ${elemente.name}</h2>
			</li>
		`)).join('');
    dex.innerHTML = elementsHTMLString;
};

const selectElement = async (id) => {
	const url = `\elements.json`;
	const res = await fetch(url);
	const elemente = await res.json();
	displayPopup(elemente, id);
};

const displayPopup = (elemente, id) => {
	const image = `./images/${elemente.element[id - 1].image}`;
	let status_appliesHTMLString;

	if (elemente.element[id - 1].status_applies === null) {
		status_appliesHTMLString = "";
	} else {
		status_appliesHTMLString = `<small>Status Applies: </small>${elemente.element[id - 1].status_applies}`;
	}

	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${image}" />
				<h2 class="card-title">
					${elemente.element[id - 1].id + 1}. ${elemente.element[id - 1].name}
				</h2>
				<p><small>Archon: </small>${elemente.element[id - 1].archon}</p>
				<p>${status_appliesHTMLString}</p>
			</div>
		</div>
	`;
	dex.innerHTML = htmlString + dex.innerHTML;
};

const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};

fetchElements();
