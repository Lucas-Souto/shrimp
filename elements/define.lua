local M = {}
local current_dir = string.gsub(debug.getinfo(1).source, "^@(.+/)[^/]+$", "%1")
local main = require("main")

M.define = function()
	main.define_element
	{
		tag = "dataselect",
		path = current_dir .. "dataselect/index.html",
		scripts = { current_dir .. "dataselect/index.js" },
		styles = { current_dir .. "dataselect/index.css" },
		variables = { "search", "content", "id", "class" }
	}
end

return M
