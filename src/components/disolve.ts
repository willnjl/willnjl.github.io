type DissolveEventName =
	| "dissolve:enter-bottom"
	| "dissolve:leave-top"
	| "dissolve:enter-top"
	| "dissolve:leave-bottom";

type ObservedState = {
	wasIntersecting: boolean;
	lastTop: number;
};

const observedStates = new WeakMap<Element, ObservedState>();

const dispatchDissolveEvent = (
	target: Element,
	name: DissolveEventName,
	entry: IntersectionObserverEntry,
) => {
	target.dispatchEvent(
		new CustomEvent(name, {
			detail: {
				entry,
			},
		}),
	);
};

const io = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			const target = entry.target;
			const currentTop = entry.boundingClientRect.top;
			const previousState = observedStates.get(target) ?? {
				wasIntersecting: false,
				lastTop: currentTop,
			};

			const scrollingDown = currentTop < previousState.lastTop;
			const justEntered =
				entry.isIntersecting && !previousState.wasIntersecting;
			const justLeft = !entry.isIntersecting && previousState.wasIntersecting;

			if (justEntered && scrollingDown) {
				dispatchDissolveEvent(target, "dissolve:enter-bottom", entry);
			}

			if (justEntered && !scrollingDown) {
				dispatchDissolveEvent(target, "dissolve:enter-top", entry);
			}

			if (justLeft && scrollingDown) {
				dispatchDissolveEvent(target, "dissolve:leave-top", entry);
			}

			if (justLeft && !scrollingDown) {
				dispatchDissolveEvent(target, "dissolve:leave-bottom", entry);
			}

			observedStates.set(target, {
				wasIntersecting: entry.isIntersecting,
				lastTop: currentTop,
			});
		});
	},
	{
		rootMargin: "-8% 0px -8% 0px",
		threshold: 0.5,
	},
);

Array.from(document.querySelectorAll<HTMLElement>(".dissolve")).forEach(
	(item) => {
		item.addEventListener("dissolve:enter-bottom", () => {
			item.classList.add("dissolve-active");
		});

		item.addEventListener("dissolve:enter-top", () => {
			item.classList.add("dissolve-active");
		});

		item.addEventListener("dissolve:leave-top", () => {
			item.classList.remove("dissolve-active");
		});

		item.addEventListener("dissolve:leave-bottom", () => {
			item.classList.remove("dissolve-active");
		});

		io.observe(item);
	},
);
