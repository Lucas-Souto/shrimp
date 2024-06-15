local M = {}
local current_dir = string.gsub(debug.getinfo(1).source, "^@(.+/)[^/]+$", "%1")
local main = require("main")
local js = require("js")
local defined = false

M.define = function()
	if defined then
		return
	end

	defined = true

	route("/smp/index.js", function (request)
		return { status = 200, content_type = "text/javascript", body = js.getbody() }
	end)

	main.define_element
	{
		tag = "selearch",
		path = current_dir .. "selearch/index.html",
		scripts = { current_dir .. "selearch/index.js" },
		styles = { current_dir .. "selearch/index.css" },
		variables = { "id", "content" }
	}
end

return M
