export const randomArrFakeEntry = (arr) =>{
	const rand = Math.floor(Math.random() * arr.body.data.length)
	return arr.body.data[rand]
}