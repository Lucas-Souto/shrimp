(function(){

const selects = document.getElementsByClassName("dataselect");
const valueset = new CustomEvent("valueset",
{  
	bubbles: true,
	cancelable: true,
	composed: false
});

function _onSelectFocus(e)
{
	e.target.parentElement.dropdown.classList.add("show");
	_updateOptions(e.target.parentElement);
}

function _onOptionClick(e)
{
	const select = e.target.closest(".dataselect");
	select.value = e.target.dataset.value;
	select.input.value = e.target.innerText;

	select.dropdown.classList.remove("show");
	select.dispatchEvent(valueset);
}

function _updateOptions(select)
{
	select._currentIndex = -1;
	select.value = "";
	select.dropdown.innerHTML = "";
	
	if (select.input.value.length === 0) return;

	let options = select.options;
	const split = select.input.value.toLowerCase().split(" ");

	for (let i = 0; i < options.length; i++)
	{
		if (select.dataset.type === "pre")
		{
			let found = false;

			for (let j = 0; j < split.length; j++)
			{
				if (options[i][1].toLowerCase().indexOf(split[j]) !== -1)
				{
					found = true;

					break;
				}
			}

			if (!found) continue;
		}

		select.dropdown.innerHTML += `<div class="dataselect-option" data-value="${options[i][0]}">${options[i][1]}</div>`;

		select.dropdown.lastChild.addEventListener("click", _onOptionClick);
	}
}

function _onSelectKey(e)
{
	if (e.key === "Tab") return;

	const select = e.target.parentElement;

	if (!select.dropdown.classList.contains("show")) return _onSelectFocus(e);

	if (select.interval != -1) clearInterval(select.interval);

	switch (e.key)
	{
		case "ArrowUp": case "ArrowDown":
			const previous = select._currentIndex;

			if (e.key == "ArrowUp")
			{
				if (select._currentIndex >= 0) select._currentIndex--;
			}
			else select._currentIndex = select._currentIndex >= select.dropdown.childElementCount - 1 ? 0 : select._currentIndex + 1;

			if (previous !== -1) select.dropdown.children[previous].classList.remove("selected");

			if (select._currentIndex !== -1) select.dropdown.children[select._currentIndex].classList.add("selected");

			if (select._currentIndex !== -1) e.preventDefault();
			break;
		case "ArrowRight": case "ArrowLeft": break;
		default:
			if (e.key == "Enter")
			{
				if (select._currentIndex >= 0 && select._currentIndex < select.dropdown.childElementCount)
				{
					const selected = select.dropdown.children[select._currentIndex];
					
					_onOptionClick({ target: selected });
				}

				return;
			}

			select.interval = setInterval(() => _updateOptions(select), 500);
			break;
	}
}

for (let i = 0; i < selects.length; i++)
{
	const type = selects[i].dataset.type;
	const search = selects[i].dataset.search;
	selects[i].options = [];
	selects[i].value = "";
	selects[i]._currentIndex = -1;
	selects[i].interval = -1;
	selects[i].input = selects[i].getElementsByClassName("dataselect-input")[0];
	selects[i].dropdown = selects[i].getElementsByClassName("dataselect-options")[0];

	if (type === "pre")
	{
		const options = selects[i].querySelectorAll("option");

		for (let j = 0; j < options.length; j++)
		{
			selects[i].options.push([options[j].value, options[j].text]);
			selects[i].removeChild(options[j]);
		}
	}

	selects[i].input.addEventListener("focus", _onSelectFocus);
	selects[i].input.addEventListener("keydown", _onSelectKey);
	window.addEventListener("click", (e) =>
	{
		if (e.target != selects[i] && !selects[i].contains(e.target)) selects[i].dropdown.classList.remove("show");
	});
}

})();
