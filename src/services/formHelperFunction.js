
import { ToastAndroid } from 'react-native'

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
			result = /\D/;
			break
		case "goal":
			result = /\D/; ///^(|-?\d+)$/
			break;
		case 'note':
			setCardError({ ...cardError, "note": "✓ Check" })
		default:
			result = "";
			break

	}
	return result;
}


function hideOnUsing(type) {
	return type == 'using' ? {display : 'none'} : null
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function isCheckChangeColor(err) {
  if (err == '✓ Check') return { width: 300, color: '#2cc197'};
  else return { width: 300, color: '#fb858e'};
}

function isCheck(err, obj) {
	if (obj == 'card') {
		for (let attr in err) {
			if (err[attr] !== "✓ Check" && err[attr] !== "") return false;
		}
	}
	else {
		for (let attr in err) {
			if (err[attr] !== "✓ Check") return false
		}
	}

	return true;

}

function objectForUpdate(input, data) {
	let result = {
		id: data.id
	}

	for (let attr in input) {

		if (data[attr] == input[attr]) continue;
		else result[attr] = input[attr]

	}
	return Object.keys(result).length === 1 ? "No thing to update" : result;
}

function getEmoji(strName) {
	const emojiObj = {
		"Food": "🍴",
		"Eating": "🍴",
		"Drinks": "☕",
		"Parking": "🅿️",
		"Transportation": "🚌",
		"Shopping": "🛍️",
		"House": "🏠",
		"Phone": "📱",
		"Groceries": "🛒",
		"Movie": "🎞️",
		"using": "💳",
		"saving": "💰"
	}
	return emojiObj[strName]
}

// input: Create, Update, card, transaction

function showToastError() {
	ToastAndroid.show("You can't update transfer", ToastAndroid.SHORT);
}

export {
	strRegex,
	capitalizeFirstLetter,
	isCheckChangeColor,
	isCheck,
	objectForUpdate,
	getEmoji,
	showToastError,
	hideOnUsing
}