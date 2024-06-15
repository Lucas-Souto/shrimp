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
local defined = false

M.appendElement = function (tag, body)
	script = script .. "elements['" .. tag .. "'] = `" .. body .. "`;"

	if not defined then
		defined = true

		route("/smp/index.js", function (request)
			return { status = 200, content_type = "text/javascript", body = script }
		end)
	end
end

return M
