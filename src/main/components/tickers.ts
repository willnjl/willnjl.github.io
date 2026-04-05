const skills = [
	"css3",
	"graphql",
	"html5",
	"javascript",
	"markdown",
	"php",
	"rust",
	"typescript",
	"gsap",
	"laravel",
	"next",
	"mui",
	"react",
	"redux",
	"scss",
	"tailwind",
	"threejs",
	"wordpress",
	"adobe creative cloud",
	"figma",
	"gulp",
	"vite",
	"webpack",
	"cypress",
	"pupeteer",
	"digitalocean",
	"docker",
	"git",
	"github",
	"github actions",
	"github pages",
	"kubernetes",
	"vagrant",
	"ubuntu",
];

const TICKER_ROWS = 5;
const WORDS_PER_ROW = 10;

const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

const buildTickerWords = () => {
	const words = shuffle(skills).slice(0, WORDS_PER_ROW);
	return words.join(" ").split(/\s+/);
};

const fillTickerText = (textElement: HTMLElement) => {
	const words = buildTickerWords();
	textElement.replaceChildren();

	words.forEach((word, index) => {
		const wordSpan = document.createElement("span");
		wordSpan.className = "ticker-marquee__word";
		wordSpan.textContent = word;
		textElement.appendChild(wordSpan);

		if (index < words.length - 1) {
			textElement.appendChild(document.createTextNode(" "));
		}
	});
};

const setMarqueeContents = () => {
	document
		.querySelectorAll<HTMLElement>(".ticker-marquee")
		.forEach((marquee) => {
			const text = marquee.querySelector<HTMLElement>(".ticker-marquee__text");
			const copies = marquee.querySelector<HTMLElement>(
				".ticker-marquee__copies",
			);

			if (!text || !copies) {
				return;
			}

			const textWidth = text.getBoundingClientRect().width;
			if (!textWidth) {
				return;
			}

			const numberOfCopies = Math.ceil(window.innerWidth / textWidth) + 1;
			marquee.style.setProperty("--textWidth", `${textWidth}px`);
			copies.innerHTML = "";

			for (let i = 0; i < numberOfCopies; i++) {
				const clone = text.cloneNode(true) as HTMLElement;
				clone.classList.add("ticker-marquee__copy");
				copies.appendChild(clone);
			}
		});
};

document.querySelectorAll<HTMLUListElement>("#ticker").forEach((tickerList) => {
	for (let i = 0; i < TICKER_ROWS; i++) {
		const row = document.createElement("li");
		row.className = "ticker-row";

		const marquee = document.createElement("div");
		marquee.className = "ticker-marquee";
		marquee.style.setProperty(
			"--ticker-direction",
			i % 2 === 0 ? "normal" : "reverse",
		);

		const content = document.createElement("div");
		content.className = "ticker-marquee__content";

		const text = document.createElement("span");
		text.className = "ticker-marquee__text";
		fillTickerText(text);

		const copies = document.createElement("div");
		copies.className = "ticker-marquee__copies";

		content.append(text, copies);
		marquee.appendChild(content);
		row.appendChild(marquee);
		tickerList.appendChild(row);
	}
});

setMarqueeContents();
window.addEventListener("resize", setMarqueeContents);
