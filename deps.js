/* Функции, необходимые для работы.
Не несут особой "художественной ценности", опубликованы только для обеспечения работы основного модуля
*/


/*
ИСПОЛЬЗОВАНИЕ:
{
	const this_dir = get_this_dir_url(document.currentScript);
	...
	function function_where_this_need(){
	... this_dir + 'file_name.js'...}
}
можно так же использовать и прямо "на месте":
get_this_dir_url(document.currentScript) + 'script-name.js'
но ОСТОРОЖНО! Если получить путь так внутри функции, которая вызывается в других файлах то путь будет не к каталогу где задана функция а к каталогу, гже она вывзвана!
get_this_dir_url(document.currentScript) + 'script-name.js'

НАЗНАЧЕНИЕ: помогает формировать относительные ссылки в файлах, которые могут быть подключены в директориях, отличных от директории, в которой он находится
ВОЗВРАЩАЕТ URL каталога скрипта вызвавшегой функцию в виде http://site.ru/cat/
Обращаю внимание что последний / выводится. Почему так - см. в аналогичной моей ф-ции для PHP.

ВНИМАНИЕ: в качестве аргумента всегда должно передаваться свойство Document.currentScript, так как оно содержит путь к директории того файла в котором было получено.

СОВМЕСТИМОСТЬ: Не работает на IE так как он не поддерживает Document.currentScript и в старых версиях остальных браузеров.

МОЖНО УЛУЧШИТЬ:
В случае отстутствия Document.currentScript либо оповещать пользователя (но один раз! контроль при помощи статического флага) либо делать это тихо в консоль, либо на ненавязчивую информационную панель в виде: "Ваш браузер не поддерживается".

Впринципе можно ещё отрезать проткол и домен, но пока не наткнулся на места где это потребуется. Лишняя нагрузка на браузер не нужна. Если потребуется можно на базе этой функции без труда сделать обрезающую и назвать её get_this_dir.

функция не названа "from_this_dir" как мой аналог на PHP, так как она в отличие от аналога в основном используется для инициализации константы а не прямо при указании пути. Со совим текущим названием она вглядит логичнее для таких целей.
*/
function get_this_dir_url(doc_cur_script){
	if(doc_cur_script.src){ // браузер может не поддерживать document.currentScript
		let url = doc_cur_script.src
		return url.substring(0, url.lastIndexOf("/") + 1); // взять только начало строки без того что за последним /
	}
}


/* подключает скрипт с заданным в аргументе путём и именем в виде /someCat/someScrpt.js из каталога скрипта
АРГУМЕНТЫ:
	path - путь к скрипту в виде /someCat/someScrpt.js
	is_async - не обязательный
	to_head - добавлять ли скрипт в head (true - в head, false - в body) не обязательный
НЕ ЗАБЫВАЙ! Подключение произойдёт после (document).ready!
Если подкл. модуль используется в JS в основном документе то лучше не рисковать и использование выполнять с зажержкой после document ready:
$(document).ready(function(){setTimeout(showRndCh1, 4000);});
function showRndCh1(){
  то что надо делать
};
*/
function include_script(path, is_async = true, to_head = true){
    let script = document.createElement('script');
    script.src  = path;
		if(to_head)
    	document.head.appendChild(script);
		else
			document.body.appendChild(script);
}


/* подключает стиль
АРГУМЕНТЫ:
	href - URL или путь в виде /someCat/some.css
*/
function include_style(href){
    let style = document.createElement('link');
    style.rel  = 'stylesheet';
		style.href = href;
    document.head.appendChild(style);
}


/*получить числовое значение css-параметра
Обрабатывает только значения вида '123px' и '123' (возвращяет число). В остальных случаях возвращает 0;
*/
function get_css_numeric_val(css_val){
	if(css_val === '')
		return 0; // сомнительное решение.
	if(!isNaN) // если 123 или '123'
		return css_val;
	else
		if(css_val.substr(css_val.length - 2, 2) === 'px') // если это величина в px
			return css_val.replace('px', '');
		else
			return 0;
}
