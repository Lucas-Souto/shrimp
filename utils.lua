local M = {}

M.split = function(input, separator)
	local result = {}

	for str in string.gmatch(input, "([^" .. separator .. "]+)") do
		table.insert(result, str)
	end

	return result;
end

M.table_concat = function(a, b)
	if (b == nil) then
		return a
	end

	for i = 1, #b do
		a[#a + 1] = b[i]
	end

	return a;
end

return M;
