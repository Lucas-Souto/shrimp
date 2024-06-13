local M = {}
local utils = require("utils")
local current_dir = debug.getinfo(1).short_src

M.define_element = function(define)
	local scripts = utils.define_routes(define.scripts, "text/javascript", "js")
	local styles = utils.define_routes(define.styles, "text/css", "css")

	if define.dependencies ~= nil then
		utils.table_concat(styles, define.dependencies.styles)
		utils.table_concat(scripts, define.dependencies.scripts)
	end

	element(define.tag, define.path, styles, scripts)
end

M.define_element
{
	tag = "card",
	path = "card/index.html",
	styles = nil,
	scripts = { "test/js/a.js" },
	dependencies =
	{
		scripts = { "/smp/js/main.js" },
		styles = nil
	}
}

return M
