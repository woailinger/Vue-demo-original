//文件全部放入 static中
fis.match('**.{js,css}', {
	release: 'static/$0',
 	useHash: true
})
// 解析less
fis.match('**.less', {
	parser: 'less',
	rExt: '.css',
	packTo: 'pack/app.css',
	optimizer: 'clean-css'
})
// //压缩css
fis.match('**.css', {
	packTo: 'pack/app.css',
	optimizer: 'clean-css'
})
//压缩png图片
// 压缩js
fis.match('js/**.js', {
	optimizer: 'uglify-js',
	packTo: 'pack/app.js'
})
fis.match('lib/**.js', {
	optimizer: 'uglify-js',
	packTo: 'pack/lib.js'
})
//打包
fis.match('::package', {
	postpackager: 'loader'
})