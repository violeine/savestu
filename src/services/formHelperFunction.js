
const strRegex = (type) => {
	let result;
	switch (type) {
		case "name":
			result = /[\^\\.!\[\]@><;:'"~-]/;
			break;

		case "money":
			result = /\D/;
			break;
		case "cash":
			result= /\D/;
			break
		case "goal":
			result = /\D/;
			break;
			case 'note': 
			setCardError({...cardError, "note": "✓ Check"})
		default: 
			result = "";
			break

	}
	return result;
}

function hideOnUpdate(type) {
  if (type == 'update')
    return { display: 'none' }
}

function hideOnCreate(type) {
  if (type == 'create')
    return { display: 'none' }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isCheckChangeColor(err) {
  if (err == '✓ Check') return { width: 300, color: '#2cc197'};
  else return { width: 300, color: 'red'};
}

function isCheck(err, type, obj) {
	if (obj == 'card') {
		for (let attr in err) {
			if (err[attr] !== "✓ Check" && err[attr] !== "") return false;
		}
	}
	else if (obj == 'transaction') {
		for (let attr in err) {
			if (err[attr] !== "✓ Check") return false
		}
	}
	else if (obj == 'category') {
		for (let attr in err) {
			if (err[attr] !== "✓ Check") return false
		}
	}

	return true;

}

function objectForUpdate(input, data) {
	let result = {
		id : data.id
	}

	for (let attr in input) {

		if (data[attr] == input[attr]) continue;
		else result[attr] = input[attr]

	}
	return Object.keys(result).length === 1 ? "No thing to update" : result;
}

export {
	strRegex,
	hideOnCreate,
	hideOnUpdate,
	capitalizeFirstLetter,
	isCheckChangeColor,
	isCheck,
	objectForUpdate
}