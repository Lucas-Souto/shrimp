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

function _onSelectClick(e)
{
	e.target.parentElement.dropdown.classList.toggle("show");
}

function _setValue(select, value, text)
{
	select.value = value;
	select.input.value = text;

	if (select.dataset.search === "false") select.input.innerText = text;
}

function _onOptionClick(e)
{
	const select = e.target.closest(".dataselect");

	_setValue(select, e.target.dataset.value, e.target.innerText);
	select.dropdown.classList.remove("show");
	select.dispatchEvent(valueset);
}

function _updateOptions(select)
{
	select._currentIndex = -1;
	select.dropdown.innerHTML = "";
	
	let options = select.options;
	const split = select.input.value.toLowerCase().split(" ");

	for (let i = 0; i < options.length; i++)
	{
		if (select.dataset.search === "true")
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

		const option = document.createElement("div");
		option.dataset.value = options[i][0];
		option.innerText = options[i][1];

		option.classList.add("dataselect-option");
		option.addEventListener("click", _onOptionClick);
		select.dropdown.appendChild(option);
	}
}

function _onSelectKey(e)
{
	if (e.key === "Tab") return;

	const select = e.target.parentElement;

	if (!select.dropdown.classList.contains("show")) return _onSelectFocus(e);

	if (select._interval != -1)
	{
		clearInterval(select._interval);

		select._interval = -1;
	}

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

			select._interval = setInterval(() => _updateOptions(select), 500);
			break;
	}
}

for (let i = 0; i < selects.length; i++)
{
	selects[i].options = [];
	selects[i].value = "";
	selects[i].select = (index) => _setValue(selects[i], selects[i].options[index][0], selects[i].options[index][1]);
	selects[i].draw = () => _updateOptions(selects[i]);
	selects[i]._currentIndex = -1;
	selects[i]._interval = -1;
	selects[i].input = selects[i].getElementsByClassName("dataselect-input")[0];
	selects[i].dropdown = selects[i].getElementsByClassName("dataselect-options")[0];

	const options = selects[i].querySelectorAll("option");

	for (let j = 0; j < options.length; j++)
	{
		selects[i].options.push([options[j].value, options[j].text]);
		selects[i].removeChild(options[j]);
	}

	if (selects[i].dataset.search === "true")
	{
		selects[i].input.value = "";

		selects[i].input.addEventListener("keydown", _onSelectKey);
		selects[i].input.addEventListener("focus", _onSelectFocus);
	}
	else
	{
		selects[i].removeChild(selects[i].input);

		selects[i].input = document.createElement("div");
		selects[i].input.value = "";

		selects[i].appendChild(selects[i].input);
		selects[i].input.classList.add("dataselect-input");
		selects[i].input.addEventListener("click", _onSelectClick);

		_updateOptions(selects[i]);
		selects[i].select(0);
	}

	window.addEventListener("click", (e) =>
	{
		if (e.target != selects[i] && !selects[i].contains(e.target)) selects[i].dropdown.classList.remove("show");
	});
}

})();
