const formatReleaseDate = (date) => {
	const options = { year: "numeric", month: "long", day: "numeric" };
	return new Date(date).toLocaleDateString(undefined, options);
}

export { formatReleaseDate };