local M = {}
local script = [[const elements = {};
function renderElement(tag, data)
{
	let element = elements[tag];

	for (let key in data) element = element.replaceAll(`$${key}$`, data[key]);

	const temp = document.createElement('div');
	temp.innerHTML = element;

	return temp.firstChild;
}]];

M.getbody = function()
	return script;
end

M.appendElement = function(tag, body)
	script = script .. "elements['" .. tag .. "'] = `" .. body .. "`;"
end

return M
