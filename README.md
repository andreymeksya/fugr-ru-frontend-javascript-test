# Разработка React-приложения

## Задание:
Разработка React-приложения для отображения таблицы с данными. Данные загружаются с сервера.

Финальный код приложения может быть запускащен из __Docker контейнера__

__Функционал__
- Верстка самая простая, с использованием [Bootstrap]. 
- Во время загрузки данных показывается индикатор.
- Сортировка по столбцам: при нажатии на название столбца строки таблицы сортируются по возрастанию, при повторном клике &mdash; по убыванию. Текстовым сообщением указывается направление сортировки.
- Клиентская пагинация: данные отображаютя постранично, максимум 50 элементов на страницу. Выполнена пользовательская навигация для перехода по страницам.
- Фильтрация: компонент предоставляет текстовое поле, в которое пользователь может ввести текст и строки таблицы, данные которых не содержат подстроку, введённую пользователем, скрываются. Перефильтрация осуществляется по нажатию на кнопку "Найти".
- По клике на строку таблицы значения полей выводятся в дополнительном блоке под таблицей.
- Данные в таблицу загружаются с сервера. Способ загрузки с сервера ...
- Над таблицей присутсвует кнопка __добавить__, по нажатии на которую выпадает форма добавления ряда
	+------+------------+-----------------+-----------------+---------------+
	| id   | firstName  | lastName        | email           | phone         |
	+------+------------+-----------------+-----------------+---------------+
	|input | input      | input           | input           | input         |
	+------+------------+-----------------+-----------------+---------------+
- После заполнения всех инпутов активируется кнопка __Добавить в таблицу__ которая вставляет заполненный ряд в начало таблицы.
  

Для демонстрации работы сделана простая HTML страница.
Пользователю предлагается выбрать набор данных: маленький или большой.
При выборе набора данных он загружается с сервера и по данным строится таблица.

__Формат данных от сервера__

Сервер возвращает JSON-массив данных.
Пример данных: 
```js
[
	{
		id: 101,
		firstName: 'Sue',
		lastName: 'Corson',
		email: 'DWhalley@in.gov',
		phone: '(612)211-6296',
		address: {
			streetAddress: '9792 Mattis Ct',
			city: 'Waukesha',
			state: 'WI',
			zip: '22178'
		},
		description: 'et lacus magna dolor...',
	}
}
```

Маленький объем (32) данных берется по ссылке
http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}

Большой объем (1000) данных берется по ссылке
http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}


__Схема визуального представления данных__

```
+------+------------+-----------------+-----------------+---------------+
| id ▲ | firstName ▼| lastName      ▼ | email          ▼| phone        ▼|
+------+------------+-----------------+-----------------+---------------+
| 101  | Sue        | Corson          | DWhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
| 102  | Lor        | Ipsumd          | dwhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
| 103  | Ips        | Umdolo          | dwhalley@in.gov | (612)211-6296 |
+------+------------+-----------------+-----------------+---------------+
```

Если выделен пользователем с `id = 101`, то под таблицей выводим следующую информацию:

	Выбран пользователь <b>Sue Corson</b>
	Описание:
	<textarea>
	et lacus magna dolor...
	</textarea>
	Адрес проживания: <b>9792 Mattis Ct</b>
	Город: <b>Waukesha</b>
	Провинция/штат: <b>WI</b>
	Индекс: <b>22178</b>
---
