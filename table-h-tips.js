/* Table H-Tips - выводит для ячеек таблицы всплывающие подсказки с информацией из соотв. ячейки шапки и ячейки первого столбца таблицы.
v 0.3
Данный скрипт разработан inFlowia Lab. Ссылки на оригинальный код и текст соглашения ищите на inflowia.ru.

ИСПОЛЬЗОВАНИЕ:
	добавить таблице класс h_tips

ТРЕБУЕТ:
	jQuery (тестировалось на 3.3.1)
	модули от inFlowia Lab.:
		table-h-tips-shared.js v 0.3
		table-h-tips-shared.css v 0.3
	функции от inFlowia Lab.:
		get_this_dir_url()
		include_script()
		include_style()
	+ см. требования в table-h-tips-shared.js

Не будет работать в xinha как и любой js

ТЕРМИНЫ:
	- Подсказки - всплывающие подсказки с содержимым из заголовка таблицы, для вывода которых и существует этот плагин.
	- Обычная версия - Этот плагин. Такое уточнение требуется, так как существует "Xinha-версия" этого плагина, которая применяется не для таблиц на обычных страницах, а таблиц в WYSIWYG-Редакторе Xinha.
	- Xinha-версия - Плагин, выполняющий те-же функции что и этот, но предназначенный для таблиц в WYSIWYG-Редакторе Xinha.

ИЗМЕНЕНИЯ:
	v 0.3
		Общее для Xinha и обычной версии:
			- переименован CSS-класс, при помощи которого происходит подкллючение hTips -> h_tips
			- подсказки теперь появляются не по наведению а по клику (теперь их можно вызвать и на моб. устр.
			- Всплывающие подсказки теперь прилипают к краям текущей ячейки, не закрывая её контент.
			- добавлено скрытие подсказок по таймауту (таймаут задаётся в shared JS в конст. _DELAY)
			- Добавлена тень, для визуального отделения от таблицы
			- все переменные и классы переименована в более_удобочитаемый_формат
			- Для удобства доработки, часть кода и стилей вынесены в отдельные файлы:
					table-h-tips-shared.js
					table-h-tips.css
				Это разделяемые с обычной версией файлы. Если вы используете и обычную версию и Xinha-версию, то можете оставить эти файлы в единственном экземпляре, но если они будут лежать не в каталоге этого плагина, то потребуется указать для них путь в свойствах:
					SHARED_JS_PATH
					SHARED_CSS_PATH

			Специфичное для обычной версии:
				- по клику на подсказку она закрывается (для возможности закрытия на мобильных)
				- сменена позиция с Fixed на absolute - по крайней мере при прокрутке по вертикали более удобно пользоваться с моб. устр. (подсказку теперь можно прокрутить по вертикали если она не поместилась на экран)
				- модуль теперь состоит из каталога а не из единственного файла

НЕДОРАБОТКИ:
	- при горизонтальной прокрутке ведут себя как fixed.
*/

{
	const this_dir = get_this_dir_url(document.currentScript);
	include_script(this_dir + 'table-h-tips-shared.js');
	include_style	(this_dir + 'table-h-tips-shared.css');
}

$(document).ready(function(){
 $('table.h_tips td').on('click', function(e){
	let cur_cell = $(this);
	let table_h_tips_shared = new Table_h_tips_shared(cur_cell, $('body'), cur_cell); // shared.  Арг.: parent_el_for_tips, parent_el_for_table, cur_cell
	table_h_tips_shared.prepare(); // shared

	if(table_h_tips_shared.is_displayed()) // если подсказки уже выведены
		return;

	cur_cell.append(table_h_tips_shared.top_tip);
	cur_cell.append(table_h_tips_shared.left_tip);

	table_h_tips_shared.top_tip.offset({
		top:	cur_cell.offset().top	- table_h_tips_shared.top_tip.outerHeight(), // без outer не учтётся граница и будет наползание вниз
		left:	cur_cell.offset().left
	});
	table_h_tips_shared.left_tip.offset({
		top:	cur_cell.offset().top,
		left:	cur_cell.offset().left - table_h_tips_shared.left_tip.outerWidth() // без outer не учтётся padding и граница и будет наползание влево
	});

	table_h_tips_shared.finish_setting(); // shared

	}); // 'table.h_tips td').on('click'
});
