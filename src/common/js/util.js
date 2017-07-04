export function urlParse(){
	//把url后的值解析，key=id value:1234,解析Url参数
	//example:?id=12345&a=b,return object{id:12345,a:b}
	let url=window.location.search;
	let obj={};
	let reg=/[?&][^?&]+=[^?&]+/g;//第一个：？或者&，第二个非？/&,第三个：=，第四个非？/&一个或多个
	let arr=url.match(reg);//['?id=12345','&a=b']
	if(arr){
		arr.forEach((item)=>{
			let tempArr=item.substring(1).split('=');
			let key=decodeURLComponent(tempArr[0]);
			let val=decodeURLComponent(tempArr[1]);
			obj[key]=val;     

		});
	}
	return obj;
}