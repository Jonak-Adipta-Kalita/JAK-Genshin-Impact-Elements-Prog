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
			<li class="card">
				<img class="card-image" src="${elemente.image}"/>
				<h2 class="card-title">${elemente.id}. ${elemente.name}</h2>
			</li>
		`)).join('');
    dex.innerHTML = elementsHTMLString;
};

const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};

fetchElements();
