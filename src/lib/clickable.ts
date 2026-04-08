[].forEach.call(
	document.querySelectorAll("nav li a"),
	(item: HTMLAnchorElement) => {
		item.addEventListener("click", (e) => {
			e.preventDefault();
			const target = document.getElementById(item.href.split("#")[1]);
			target?.scrollIntoView({
				behavior: "smooth",
			});
		});
	},
);
