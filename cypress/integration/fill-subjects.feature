# language: ru
Функционал: Заполнение предметов в расписании
    Сценарий: Добавление предмета
        Пусть пользователь открыл пустое расписание
        Если он добавит предмет c названием "Математика"
        Тогда "Математика" должна быть в списке предметов

    Сценарий: Удаление предмета
        Пусть пользователь открыл пустое расписание
        И добавил предмет c названием "Математика"
        Если он удалит предмет c названием "Математика"
        Тогда "Математика" должна отсутствовать в списке предметов

    Сценарий: Сохранение предметов
        Пусть пользователь открыл пустое расписание
        И добавил предмет c названием "Математика"
        И добавил предмет c названием "Физика"
        Если он сохранит и переоткроет текущее расписание
        Тогда "Математика" должна быть в списке предметов
        И "Физика" должна быть в списке предметов
    
