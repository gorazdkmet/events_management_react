
//  formating

export const formatDate = (s) => {

	const eventDate = new Date(s);
	const today = new Date();
	const day = eventDate.getDate();
	const month = eventDate.getMonth() + 1;
	const year = eventDate.getFullYear();

	if (
		today.getMonth() + 1 === month &&
		today.getFullYear() === year
	) {
		if ( today.getDate() === day ) { return 'Dnes' }
		if ( today.getDate() - day === 1  ) { return 'Včera' }
		if ( today.getDate() - day === -1 ) { return 'Zajtra' }
	};

	return `${day}. ${month}. ${year}`;
}

//  sorting events

export const sortEvents = (events, date, abc) => {

	if ( date === null && abc === null ) { return events }

	if ( date === null ) {
		return abc ?
		events.sort((a,b) => compare(getTitle(a), getTitle(b))) :
		events.sort((a,b) => compare(getTitle(b), getTitle(a)));
	}

	if ( abc === null ) {
		return date ?
		events.sort((a,b) => compare(newDate(a), newDate(b))) :
		events.sort((a,b) => compare(newDate(b), newDate(a)));
	}
}

const newDate = (d) => new Date(d.date);
const getTitle = (t) => t.title.toLowerCase();

const compare = (a, b) => {
  if (a < b) { return -1 }
  if (a > b) { return 1 }
  return 0;
}

//  filtering events

export const countEvents = (type, events) => {
	return events.filter( (e) => {
		const today = new Date(), thatDay = new Date(e.date);
		return type === 'past' ? thatDay < today : today > thatDay;
	}).length;
}


// clicks

export const isClickedInOrNotEnter = (e, ref) => {

	const inputText = ref.current;
	const inputDate = inputText.previousSibling;

	if (e.type === 'click')
	{
		if (e.target.contains(inputText)) { return true }
		if (e.target.contains(inputDate)) { return true }
	}

	if (e.type === 'keyup')
	{
		if (e.keyCode !== 13) { return true }
	}

	return false
}
