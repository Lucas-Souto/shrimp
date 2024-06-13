local app = require("index")

app.define_element
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
