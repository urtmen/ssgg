/*
 * Copyright (c) 2020. shtrih
 */
const descElem = document.getElementById('description')
const descSets = {
  'Плюс игра' : {
    debuffs:     ' ',
    perm:        ' ',
    strength:   0, //Если не используется - указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Стример должен зароллить +1 игру на текущем ценовом отрезке.'
    //newprop: 'тест нового свойства' // вот так добавляем новое свойство в объект
  },
  'Минус игра' : {
    debuffs:     ' ',
    perm:        ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Стример уменьшает необходимое для прохождение количество игр текущего отрезка на 1. Если на текущем отрезке осталась одна игра, минусует игру на следующем ценовом отрезке. Сгорает, если на текущем отрезке больше нет игр, а на следующем только одна.'
  },
  'Орел или Решка' : {
    debuffs:     ' ',
    perm:        ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Стример бросает монетку, заранее определив стороны. Если выиграл - стример может (по желанию) произвести реролл текущей игры. Если проиграл - стримеру добавляется еще одна игра на текущем отрезке.'
  },
  'Оптовая закупка' : {
    debuffs:     ' ',
    perm:        ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Добавляется еще одна игра к каждому ценовому отрезку, кроме тех, которые уже были пройдены в текущем цикле. Действует только на текущий цикл.'
  },
  'Интрига' : {
    debuffs:     ' ',
    perm:        ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Рулетка событий крутится еще раз.'
  },
  'Спонсорское задание' : {
    debuffs:     ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Следующую игру выбирает последний донатер, который активировал рулетку. Игра должна быть из текущего ценового отрезка, в котором находится стример, и должна соблюдать все правила проходимости, описанных в правилах ивента. Если последнего донатера отследить невозможно, то стример сам выбирает того, кто назначит ему игру из задонативших на колесо. Не может выпасть еще, пока дебафф активен. Дебафф исчезает тогда, когда стример прошел заказанную игру.'
  },
  'Во власти чисел' : {
    debuffs:     ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Если количество оставшихся игр на всех отрезках, необходимых к прохождению чётное, стример получает +игру на текущий отрезок. Нечетное - не получает.'
  },
  'Бумер ролл' : {
    debuffs:     ' ',
    specroll:    ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Следующий ролл игры производится с фильтром временного отрезка от 1 января 2000 до 31 декабря 2007. Стоимость игры соответствует отрезку, на котором производится ролл. Точную дату игры смотрим в Steam.'
  },
  'Зумер ролл' : {
    debuffs:     ' ',
    specroll:    ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Следующий ролл игры производится с фильтром временного отрезка от 1 января 2015 до сегодняшнего дня. Стоимость игры соответствует отрезку, на котором производится ролл. Точную дату игры смотрим в Steam.'
  },
  'Чат закон' : {
    debuffs:     ' ',
    specroll:    ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'При следующем ролле игры в колесе крутится 5 игр, вместо стандартных 11. Зрители выбирают одну из них для прохождения с помощью голосования. Если две или более игр не подходят по правилам реролла, в голосование добавляется пункт "реролл". Проводится только один тур голосования. Если в голосовании трижды победил "реролл", на четвертый раз этот пункт удаляется (при наличии двух или более игр в голосовании).'
  },
  'Стример закон' : {
    buffs:       ' ',
    specroll:    ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'При следующем ролле игры в колесе крутится 5 игр, вместо стандартных 11. Стример выбирает одну из выпавших игр по своему усмотрению.'
  },
  'Акция 1=2' : {
    debuffs:     ' ',
    specroll:    ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Производится еще один ролл рулетки событий. Из выпавших вариантов выполняются два соседних от выпавшего пункта. Приоритет: сначала влево, потом вправо. (событие "Интрига" игнорируется).'
  },
  'Динамит' : {
    debuffs:     ' ',
    perm:        ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'После прохождения каждой игры стример бросает монетку, где одна сторона - взрыв, вторая - ничего. При взрыве событие пропадает, а стример получает +игру на текущем отрезке, на котором сработало событие. Если взрыва нет, то динамит остается до тех пор, пока не взорвется или не будет сброшен.'
  },
  'Стонкс' : {
    buffs:       ' ',
    perm:        ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Повышает стоимость рулетки событий на 100р до завершения прохождения текущей игры, на котором выпало событие. Событие считается завершенным при начале следующего цикла, что возвращает рулетке стандартную стоимость.'
  },
  'НЕСтонкс' : {
    debuffs:       ' ',
    perm:        ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Снижает стоимость рулетки событий на 100р до завершения прохождения текущей игры, на котором выпало событие.. При этом рулетка не может стоить дешевле 300 рублей (если цена рулетки уже 300р - делается реролл). Событие считается завершенным при начале следующего цикла, что возвращает рулетке стандартную стоимость.'
  },
  'Азбука' : {
    buffs:     ' ',
    lore:      'По-ра на-у-у.. на-у-чии.. научиться чи-таа-ть!',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Азбука позволяет стримеру (по желанию) пройти одну визуальную новеллу. При этом запрещено пользоваться автоскипом диалогов. Находится в слоте до момента, пока не выпадет ВН. Если до окончания цикла стримеру не выпала ВН, то бафф не переносится на следующий цикл.'
  },
  'Русская рулетка' : {
    debuffs:     ' ',
    perm:        ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Cтример крутит колесо, где пять ячеек пустые, а одна - +игра. Если выпала +игра, стример добавляет ее себе к текущему ценовому отрезку. Если стример избегает +игры, то при следующем выпадении этого события, одна из пустых ячеек дополнительно заменяется +игрой. И так до тех пор, пока либо не останется одна пустая ячейка, либо пока стример не получит + игру с этого события, после одного из двух исходов событие считается законченным. Это событие можно проигнорировать, если в инвентаре уже есть Реплика щита Кэпа. Событие нельзя отменить предметом Швейцарский нож. Не может выпасть больше одного раза одновременно.'
  },
  'Капкан' : {
    debuffs:     ' ',
    lore:    'Жаль этого добряка, который наступил ногой в капкан.',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'При выпадении этого события, после прохождения текущей игры стример остается на текущем отрезке и роллит еще одну игру. Не может выпасть больше одного раза одновременно.'
  },
  'Талон с ошибкой' : {
    debuffs:     ' ',
    lore:    'В талоне оказалась ошибка, из-за чего он теперь не действителен...',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'При получении Талона стримеру придется вернуться на один отрезок назад. Если на момент получения стример уже проходит игру, то шаг назад он должен сделать после прохождения или дропа игры. Не может выпасть больше одного за раз.'
  },
  'Бронежилет Отмены' : {
    debuffs:     ' ',
    perm:        ' ',
    debuses:    3, //Если не используется - указать 0
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    lore:    'Пошлый красный цвет, логотип какого-то неизвестного, возможно даже стримера, но мы такого не знаем.',
    desc:     'При получении Талона стримеру придется вернуться на один отрезок назад. Если на момент получения стример уже проходит игру, то шаг назад он должен сделать после прохождения или дропа игры. Не может выпасть больше одного за раз.'
  },
  'Шпаргалка' : {
    buffs:       ' ',
    perm:    ' ',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Шпаргалка позволяет стримеру использовать видео и текстовые гайды для прохождения игры. Бафф применяется перманентно на текущую игру. Если на игру уже применена шпаргалка, вторую применить не получится - реролл рулетки. Если стример не воспользовался возможностью посмотреть гайды, после прохождения игры бафф сгорает.'
  },
  'Проездной ТАТ' : {
    buffs:       ' ',
    lore:    'Новенький проездной ТАТ на одну поездку, давно забытый на дальней полке.',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'При выпадении этого события стример должен крутить колесо игр по правилам следующего отрезка, при этом сам остается на текущем отрезке. Одновременно у стримера может быть до трех проездных, отчего количество шагов по отрезкам суммируется, а по выполнению условий баффа все проездные сгорают. Если у стримера 3 проездных, а он уже на предпоследнем отрезке, то он крутит игру с последнего отрезка, а все 3 проездных сгорают.'
  },
  'Стопка пираток' : {
    debuffs:       ' ',
    lore:    'Продавец на рынке пообещал, что это официальные диски с ААААА-новинками.',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Следующая игра крутится с фильтром колеса игр 0-33 GGP. Стоимость игры соответствует отрезку, на котором крутится игра.'
  },
  'Синяя таблетка' : {
    buffs:       ' ',
    lore:    'Странный мужчина предложил две таблетки. Не долго думая ты выбрал синюю.',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Все последующие игры можно проходить на самой легкой сложности. Можно применить и на текущую игру, но в таком случае игру придется начать с самого начала. Бафф пропадает после завершения цикла, если в цикле пройдены все отрезки. Также бафф пропадает, если стример произвел дроп игры. Если выпал дебафф Красная таблетка - оба события пропадают. Не может выпасть второй раз, пока событие активно.'
  },
  'Красная таблетка' : {
    debuffs:       ' ',
    lore:    'Странный мужчина предложил две таблетки. Не долго думая ты выбрал красную.',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Следующие три игры проходятся на самом высоком уровне сложности, если есть возможность выбора сложности. Если стример дропнул одну из трех игр, правило сложности переходит на следующую. Дебафф не сбрасывается завершением цикла - для выполнения события в любом случае должны быть пройдены три игры. Если выпал бафф Синяя таблетка - оба события пропадают. Не может выпасть второй раз, пока событие активно.'
  },
  'Маска везунчика' : {
    buffs:       ' ',
    lore:    'Как сказал великий: Повезло - повезло! И тут даже не поспоришь.',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Для следующей игры стример сам выбирает ценовой отрезок, с которого будет крутить игру, при этом стример получит награду с того отрезка, на который переходит. (Пример: Стример перешел на отрезок 1500+р, а крутит игру с отрезка 0-200. Награду стример получится за отрезок 1500+р) Не может выпасть больше одного раза одновременно.'
  },
  'Ненастоящий жетон' : {
    debuffs:     ' ',
    perm:        ' ',
    debuses:    3, //Если не используется - указать 0
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    lore:    'Подделка очень плохого качества. Нужно быть слепым, чтобы не заметить это...',
    desc:     'Стример бросает монетку, заранее определив стороны. Если проиграл - крутится рулетка дебаффов. Если выиграл - рулетка не крутится. Монетку нужно подбросить три раза. Не может выпасть больше одного раза за ценовой отрезок.'
  },
  'Швейный набор' : {
    buffs:       ' ',
    perm:        ' ',
    lore:    'Тебе повезло найти походный швейный набор. Материалов в нем не много, но пришить карман - хватит.',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Добавляет стримеру один слот инвентаря. Если у стримера максимальное количество ячеек инвентаря - производится реролл рулетки.'
  },
  'Записка Окрашено' : {
    debuffs:       ' ',
    lore:    'Сел на окрашенную скамейку. И это не первая неудача за день...',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'После прохождения текущей игры стример получает на 30% меньше Жетонов от итоговой награды за игру. После прохождения следующей игры - на 40% меньше, а после прохождения третьей - на 50% меньше. Не может выпасть второй раз, пока событие активно.'
  },
  'Шар Цыганки' : {
    debuffs:       ' ',
    perm:        ' ',
    lore:    'Да я никогда не попадусь на эти разводы! - именно так он и сказал, а потом его развели...',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Сбрось все вещи из инвентаря. Если на момент выпадения этого дебаффа инвентарь уже пуст - сделай реролл рулетки.'
  },
  'Лезвие воришки' : {
    debuffs:       ' ',
    perm:        ' ',
    lore:    'Воришка подрезал тебе карман, прихватив и вещь из него.',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Удали одну ячейку инвентаря (начинать с последней). Если в этой ячейке был предмет, он пропадает. Если у стримера минимальное количество ячеек (3 ячейки), то стример теряет последний полученный предмет. Если при этом инвентарь пуст - рерол рулетки.'
  },
  'Шо опять' : {
    debuffs:       ' ',
    perm:        ' ',
    lore:    'Шо, опять?',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Повтори предыдущий дебафф. Если этот дебафф нельзя применить на текущую игру, он переносится на следующую. Не может выпасть дважды за одну игру.'
  },
  'Дыра в мешке' : {
    debuffs:       ' ',
    lore:    'Из-за неосторожности ты зацепился за что-то и порвал свой мешок.',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'После прохождения игры стример получает на 10% меньше к итоговому количеству Жетонов за игру. Не может выпасть дважды за игру.'
  },
  'Красная карточка' : {
    debuffs:       ' ',
    lore:    'Спорить с судьей не получится, держи красную карточку!',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'При следующем дропе игры стример получает штраф в -100% от игры, а не -50%, как обычно. Не может выпасть второй раз, пока активно.'
  },
  'Золотой билет' : {
    debuffs:       ' ',
    lore:    'Тебе невероятно повезло найти этот билет в почтовом ящике.',
    strength:   0, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Следующая игра роллится без учета ценового отрезка. Награда за прохождение игры при этом начисляется исходя из фактического отрезка, на котором выпала игра.'
  },
  'Швейцарский нож' : {
    item:       ' ',
    lore:    'Действительно универсальный инструмент!',
    strength:   0, //Если не используется -указать 0
    uses:    1, //Если не используется - указать 0
    desc:     'Швейцарский нож позволяет отменить один дебафф из тех, что уже наложены на стримера. Не может быть больше одного такого предмета в инвентаре. Кол-во зарядов может быть увеличено Мультитулом, но не более 3 единиц.'
  },
  'Дымовая граната' : {
    item:       ' ',
    lore:    'Достаточно бросить под ноги и исчезнуть, как ниндзя! Главное самому не задохнуться.',
    strength:   0, //Если не используется -указать 0
    uses:    1, //Если не используется - указать 0
    desc:     'Дымовая граната позволяет сделать дроп игры без штрафов. Не может быть больше одного такого предмета в инвентаре. Кол-во зарядов может быть увеличено Мультитулом, но не более 3 единиц.'
  },
  'Мультитул Аликс Вэнс' : {
    item:       ' ',
    lore:    'Откуда это в нашем мире? Видимо G-Man что-то серьезно накрутил с мультиверсом...',
    strength:   0, //Если не используется -указать 0
    uses:    1, //Если не используется - указать 0
    desc:     'Мультитул Аликс позволяет модифицировать предметы, добавляя им 1 единицу заряда или 1 единицу прочности. Не может быть больше одного такого предмета в инвентаре.'
  },
  'Реплика щита Кэпа' : {
    item:       ' ',
    lore:    'Этот щит не такой крутой, как оригинал, да и вибраниума на нашей планете не существует, на на что-то он сгодится.',
    strength:   1, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Щит позволяет проигнорировать один дебафф, который выпал после получения щита в инвентарь. Не может быть больше одного такого предмета в инвентаре.'
  },
  'Золотой жетон PSE' : {
    item:       ' ',
    lore:    'Жетоны, отчеканенные специально для ивента. Не факт, что действительно из золота.',
    strength:   0, //Если не используется -указать 0
    uses:    3, //Если не используется - указать 0
    desc:     'Жетон используется до того, как крутится колесо игры. Стример сам решает, использовать жетон или нет. Использованный жетон поднимать оценку игры GG до 60 (60-100). Жетон нельзя улучшить с помощью Мультитула Аликс Вэнс. Если жетоны выпадают, когда в инвентаре они уже есть - производится реролл рулетки.'
  },
  'Инструкция для чайников' : {
    item:       ' ',
    lore:    'Та самая универсальная инструкция для всех и обо всем!',
    strength:   0, //Если не используется -указать 0
    uses:    1, //Если не используется - указать 0
    desc:     'Этот предмет позволяет стримеру использовать видео и текстовые гайды для прохождения игры. Предмет применяется на все прохождение текущей игры.'
  },
  'Бронежилет из дропсов' : {
    item:       ' ',
    lore:    'Плитник в фиолетовом цвете и с патчем "Twitch". Скорее всего его выдавали за дропсы к какой-то игре и он явно не настоящий.',
    strength:   2, //Если не используется -указать 0
    uses:    0, //Если не используется - указать 0
    desc:     'Бронежилет блокирует любой дебафф, который выпал в момент прохождения игры. При этом стример не может выбрать, какой именно дебафф заблокировать. Бронежилет блокирует дебаффы по мере их выпадения из рулетки. Если выпавший дебафф действует только со следующей игры, бронежилет его не блокирует (Пример Красная таблетка)'
  },
  'Альпинистский карабин' : {
    item:       ' ',
    lore:    'Эта маленькая штучка способна удержать на себе вес человека!',
    strength:   0, //Если не используется -указать 0
    uses:    1, //Если не используется - указать 0
    desc:     'Если выпадают события, требующие сдвинуться на 1 этап назад по ценовой шкале игр, карабин позволяет удержаться на текущей клетке. Если события требуют сдвинуться на 2 отрезка или более (но не дальше отрезка 0-100), то карабин уменьшает количество шагов на 1 единицу. (Пример: Дебафф сдвигает стримера на 2 позиции, но у стримера есть карабин. Он двигается только на 1 позицию назад. Если на 3 - то двигается на 2 и так далее)'
  },
  'Контейнер Kappa' : {
    item:       ' ',
    lore:    'Контейнер из прочных материалов неизвестного производства. На крышке контейнера наклейка, в честь которой ему дали название "Kappa".',
    strength:   0, //Если не используется -указать 0
    uses:    1, //Если не используется - указать 0
    desc:     'Стример может поместить в контейнер один предмет из инвентаря. Предмет, помещенный в контейнер, нельзя использовать, пока он не будет перемещен обратно в свободный слот. При завершении цикла предмет в кейсе не исчезает и переходит на новый цикл. Сам кейс исчезает. Не может быть больше одного контейнера в инвентаре. Если кейс с предметом внутри попадает под действие Лезвие воришки, стример теряет слот, кейс и предмет внутри кейса.'
  },
  'Ордер с красной печатью' : {
    item:       ' ',
    lore:    'Ордер, подписанный в министерстве "Не твоих собачьих дел".',
    strength:   0, //Если не используется -указать 0
    uses:    1, //Если не используется - указать 0
    desc:     'Многие недооценивают силу этого документа. Предмет позволяет сделать реролл игры на этапе ролла колеса игр без последствий. Предмет нельзя улучшить Мультитулом Аликс Вэнс. Не может быть больше одного в инвентаре.'
  },
}

function wheelSketch(_p5) {
    const radius = 160,
        diameter = radius * 2,
        itemsPerScreen = 7,
        height_str = diameter / itemsPerScreen,
        counterInitial = 0,
        centerX = 60
    ;
    let data = [],
        videosList = [
            'videos/14278244937910.webm',
            'videos/14686000376951.webm',
        ],
        counter,
        counterDelta = 0,
        counterMax,
        circleTop,
        circleCenterY,
        animationsMap = new Map(),
        selectedKey,
        isCounterAnimation = false,
        counterPrevTickValue = 0,
        video,
        scaleFactor,
        fontRegular,
        mouseDragEnable = true,
        touchYPrev = 0
    ;

    _p5.setData = function (_data) {
        data = [..._data];

        counterMax = data.length * height_str;
        counter = counterInitial;
        _p5.triggerSelectItem();
    };

    _p5.setVideos = function (videosList) {
        video = new Video(videosList);
    };

    _p5.onAfterSetup = function() {};

    _p5.onSelectItem = function (items, selectedKey) {};
    _p5.triggerSelectItem = function () {
        _p5.onSelectItem(data, selectedKey);
    };

    _p5.preload = () => {
        fontRegular = _p5.loadFont('./Oswald-Regular.ttf');
    };

    _p5.setup = () => {
        counterMax = data.length * height_str;

        const canvas = _p5.createCanvas(750, 400);
        canvas.parent('canvas');

        _p5.textSize(23);
        // textFont('Calibri');
        _p5.textFont(fontRegular);
        _p5.textLeading(24);
        _p5.fill(200);

        circleTop = (_p5.height - diameter) / 2 + _p5.textAscent() / 3;
        circleCenterY = circleTop + radius;
        // counter = height_str * 3 + radius - circleTop + radius;
        counter = counterInitial;
        // counter = height_str/2;

        video = new Video(videosList);

        document.addEventListener("visibilitychange", function() {
            if (document.visibilityState === 'visible') {
                video.setVolume(video.volume);
            } else {
                video.setVolume(0);
            }
        });

        // frameRate(30);


        // alignToRow();

        const background = document.querySelector('.image-grid');

        button = _p5.createButton('Roll');
        button.parent(document.querySelector('.content'));
        // button.position(width / 2, height);
        button.mousePressed(function () {
            if (!isCounterAnimation) {
                const duration = 22000,
                    correction = data_key(data.length, 2 - selectedKey),
                    randomKey = Math.floor(_p5.random(data.length)),
                    totalRows = (data.length * circlesCountForDataLength() + randomKey - correction)
                ;
                video.play().catch(console.error);
                decreaseVolume(duration);

                array_shuffle(data);
                _p5.triggerSelectItem();

                const $dataKey = data_key(data.length, 2 - randomKey);
                // button.elt.textContent = `Result ${randomKey} → ${$dataKey}. ${data[$dataKey]}`;
                // _p5.print(`Result ${randomKey} → ${$dataKey}. ${data[$dataKey]}`);

                // _p5.print(circlesCountForDataLength());
                // _p5.print(totalRows);
                animate(
                    tickCounter,
                    counter,
                    counter + height_str * totalRows,
                    duration,
                    () => {
                        animCounterStop();
                        video.pause();
                        alignToRow();
                        // background.style.display = null;
                        background.classList = 'image-grid';
                    },
                    easeInOutSine
                );
            }

            // background.style.display = 'none';
            background.classList = 'image-grid animation-paused';

            return false;
        });

        _p5.onAfterSetup();
    };

    function decreaseVolume(videoDurationMs) {
        const decreasingDuration = 3000;
        setTimeout(function () {
            animate(function (v) {
                video.setVolume(v);
            }, video.volume, 0, decreasingDuration, null, easeLinear);
        }, videoDurationMs - decreasingDuration);
    }

    function circlesCountForDataLength() {
        const needHeight = height_str * itemsPerScreen * 7;
        return Math.ceil(needHeight / (height_str * data.length));
    }

    /*
    _p5.mouseReleased = () => {
        if (_p5.mouseX > _p5.width || _p5.mouseY > _p5.height) {
            return;
        }
        if (isCounterAnimation) {
            return;
        }

        // setTimeout(alignToRow, 1000);
    };
    */

    _p5.mouseDragEnable = (state = true) => {
        mouseDragEnable = state;
    };

    _p5.mouseDragged = (event) => {
        if (_p5.mouseX > _p5.width || _p5.mouseY > _p5.height) {
            return;
        }
        if (isCounterAnimation) {
            return;
        }

        if (!mouseDragEnable) {
            return;
        }

        let delta = _p5.movedY * 4;
        // Для тач-девайсов эта переменная undefined, поэтому вручную считаем направление сдвига
        if (_p5.movedY === undefined) {
            let diff = _p5.touches[0].y - touchYPrev;
            delta = (diff < 0 ? -1 : (diff === 0 ? 0 : 1)) * 12;
            touchYPrev = _p5.touches[0].y;
        }

        incrementCounter(delta);

        return false;
    };

    _p5.draw = () => {
        _p5.clear();
        // background(220);
        /*

            //<editor-fold desc="Bezier">
            push();
            stroke(255, 102, 0);
            noFill();

            let x1 = centerX,
                y1 = circleCenterY - radius,
                x2 = centerX + 0.552284749831 * radius,
                y2 = circleCenterY - radius,
                x3 = centerX + radius,
                y3 = circleCenterY - radius * 0.552284749831,
                x4 = centerX + radius,
                y4 = circleCenterY
            ;
            bezier(
                x1, y1,
                x2, y2,

                x3, y3,
                x4, y4
            );
            line(
                x1, y1,
                x2, y2,
            );
            line(
                x3, y3,
                x4, y4
            );

            let steps = 10;
            /!* for (let i = 0; i <= steps; i++) {
              let t = i / steps;
              let x = bezierPoint(x1, x2, x3, x4, t);
              let y = bezierPoint(y1, y2, y3, y4, t);
              ellipse(x, y, 5, 5);
            } *!/

            let c = floor(map(counter, counterInitial, counterMax, 0, radius, true)) / radius;
            let x = bezierPoint(x1, x2, x3, x4, c);
            let y = bezierPoint(y1, y2, y3, y4, c);

            stroke(255, 112, 255);
            ellipse(x, y, 5, 5);
            ellipse(diameter * 1.1665 - y, x + radius, 5, 5);

            x1 = centerX + radius;
            y1 = circleCenterY;
            x2 = centerX + radius;
            y2 = circleCenterY + 0.552284749831 * radius;
            x3 = 0.552284749831 * radius + centerX;
            y3 = circleCenterY + radius;
            x4 = centerX;
            y4 = circleCenterY + radius;

            bezier(
                x1, y1,
                x2, y2,

                x3, y3,
                x4, y4
            );
            line(
                x1, y1,
                x2, y2,
            );
            line(
                x3, y3,
                x4, y4
            );

            for (let i = 0; i <= steps; i++) {
                let t = i / steps + c;
                let x = bezierPoint(x1, x2, x3, x4, t);
                let y = bezierPoint(y1, y2, y3, y4, t);
                ellipse(x, y, 5, 5);
            }

            pop();
            //</editor-fold>
        */

        // vect(counter, counterInitial, counterMax);

        // _p5.line(centerX + 60, 0, centerX + 60, _p5.height);
        // _p5.line(0, _p5.height / 2, _p5.width, _p5.height / 2);

        animationsMap.forEach(function (startAnimation) {
            startAnimation();
        });

        if (counterDelta > 0) {
            if (counter < counterMax) {
                if (!isCounterAnimation) {
                    incrementCounter(3);
                }
            }
            else {
                counter = counterInitial;
            }
        }
        else {
            if (counter < counterInitial) {
                counter = counterMax;
            }
            // else {
            //   incrementCounter(-1);
            // }
        }
        // text(`${Math.floor(frameRate())} ${counter.toFixed(2)}, ${counterDelta.toFixed(2)}`, 20, 20);

        for (let i = -data.length - 2; i < itemsPerScreen + 1; i++) {
            // let x = crcl(counter + height_str * i, radius, circleTop, centerX);
            let {x, y} = vect(counter + height_str * i + radius, circleTop, circleTop + diameter, false);
            // x += centerX;
            if (x < centerX - 45) {
                continue;
            }

            _p5.push();
            _p5.translate(centerX, circleCenterY);

            // textSize(map(x, centerX, centerX + radius, 18, 24, true));

            scaleFactor = _p5.map(x, centerX, centerX + radius, 1, 1.5, false);
            x = x * (2 - scaleFactor);
            y = y * (2 - scaleFactor);
            _p5.scale(scaleFactor);

            _p5.fill(255, Math.round(_p5.map(x + 50, centerX, centerX + radius, 0, 255, true)));

            let key = data_key(data.length, i);
            // stroke(255, 102, 110);
            // line(0, -textAscent()/2, width, -textAscent()/2);
            if (y < _p5.textAscent() / 2
                && y > -_p5.textAscent()
            ) {
                _p5.fill(255, 102, 0);
                _p5.noStroke();

                // stroke(255, 102, 110);
                // line(0, y, width, y);

                // textSize(25);
                // textStyle(BOLD);
                if (key !== selectedKey) {
                    selectedKey = key;

                    _p5.onSelectItem(data, selectedKey);
// Если понадобится добавить новое совойство, то копируем строку ниже и вставляем её перед строчкой ${descSets[data[key]]?.desc  ''}` или в нужном месте
// ${descSets[data[key]]?.newprop ? <p><span>Тип:</span> ${descSets[data[key]]?.newprop}</p> : ''}
// newprop - это название нового свойства. В объект descSets необходимо добавить такое же свойство
// Текст внутри "span" также заменяем на свой
descElem.innerHTML = `
    ${descSets[data[key]]?.type ? `<p><span class="type">Тип:</span> ${descSets[data[key]]?.type}</p>` : ''}
    ${descSets[data[key]]?.item ? `<p><span class="item">Предмет</span> ${descSets[data[key]]?.item}</p>` : ''}
    ${descSets[data[key]]?.buffs ? `<p><span class="buffs">Бафф</span> ${descSets[data[key]]?.buffs}</p>` : ''}
    ${descSets[data[key]]?.debuffs ? `<p><span class="debuffs">Дебафф</span> ${descSets[data[key]]?.debuffs}</p>` : ''}
    ${descSets[data[key]]?.specroll ? `<p><span class="specroll">Особый ролл</span> ${descSets[data[key]]?.specroll}</p>` : ''}
    ${descSets[data[key]]?.perm ? `<p><span class="perm">Перманентное событие</span> ${descSets[data[key]]?.perm}</p>` : ''}
    ${descSets[data[key]]?.strength ? `<p><span class="strength">Прочность:</span> ${descSets[data[key]]?.strength}</p>` : ''}
    ${descSets[data[key]]?.uses ? `<p><span class="uses">Кол-во использований:</span> ${descSets[data[key]]?.uses}</p>` : ''}
    ${descSets[data[key]]?.debuses ? `<p><span class="debuses">Кол-во действий:</span> ${descSets[data[key]]?.debuses}</p>` : ''}
    ${descSets[data[key]]?.lore ? `<p><span class="lore">Лор:</span> ${descSets[data[key]]?.lore}</p>` : ''}
    ${descSets[data[key]]?.desc || ''}`
                }
            }
            // line(0, textAscent(), width, textAscent());

            _p5.text(data[key], x, y, 400);
            _p5.pop()
        }

        // text(`Выпало: ${data[selectedKey]}`, 0, height);
    };

    function vect(current, from, to, overflow = true) {
        const offset = 7, // выравниваем центральный элемент списка вертикально по центру
            overallDegrees = _p5.map(current + offset, from + offset, to, -85, 85, !overflow),
            v = p5.Vector.fromAngle(_p5.radians(overallDegrees), radius)
        ;

        // _p5.push();
        // _p5.translate(centerX, _p5.height / 2);
        // _p5.noFill();
        // _p5.stroke(255);
        // _p5.line(0, 0, radius, 0);
        // _p5.stroke(250);
        // _p5.line(0, 0, v.x, v.y);
        // _p5.pop();

        return v;
    }

    function incrementCounter(delta = 1) {
        delta = (_p5.deltaTime / 100 * delta);
        counterDelta = delta;
        counter += delta;
    }

    function data_key(data_len, key) {
        if (!data_len) {
            return key;
        }

        if (key >= 0 && key < data_len) {
            return key;
        }

        if (key > 0) {
            return data_key(data_len, Math.abs(data_len - key));
        }

        return data_key(data_len, data_len + key);
    }

    function alignToRow(endCallback) {
        const half = height_str / 2;
        const rest = counter % height_str;
        let newValue = counter - rest;
        if (rest > half) {
            newValue = counter + height_str - rest;
        }
        animate(
            tickCounter,
            counter,
            newValue,
            1000,
            function () {
                animCounterStop();
                if (endCallback) {
                    endCallback();
                }
            },
            easeOutBack
        );
    }

    function tickCounter(v) {
        isCounterAnimation = true;

        if (!counterPrevTickValue) {
            counterPrevTickValue = counter;
        }
        counterDelta = v - counterPrevTickValue;
        counter += counterDelta;
        // print(counter.toFixed(2));
        // incrementCounter(v - counterPrevTickValue);
        counterPrevTickValue = v;
    }

    function animCounterStop() {
        isCounterAnimation = false;
        counterDelta = 0;
        counterPrevTickValue = 0;

        // setTimeout(idle, 1000);
    }

    function animate(tickHook, startNum, endNum, duration, callback, easingEq) {
        easingEq = easingEq || easeOutExpo;
        var changeInNum = endNum - startNum,
            startTime = Date.now(), //millis(),
            engine = function () {
                var now = Date.now(), //millis(),
                    timeSpent = now - startTime,
                    timeNorm = timeSpent / duration,
                    completionNorm = easingEq(timeNorm),
                    newNum = startNum + completionNorm * changeInNum;

                // text(`${startNum}:${endNum}=${newNum}`, 0, height - 30);

                if (timeSpent > duration) {
                    animationsMap.delete(`${startNum},${endNum},${duration}`);
                    if (callback) {
                        callback();
                    }
                }
                else {
                    tickHook(newNum);
                }
            }
        ;

        animationsMap.set(`${startNum},${endNum},${duration}`, engine);
    }

    /**
     * @see https://easings.net/#easeOutElastic
     * @param x
     * @return {number}
     */
    function easeOutElastic(x) {
        const c4 = (2 * Math.PI) / 3;

        return x === 0 ?
               0 :
               x === 1 ?
               1 :
               Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }

    function easeLinear(x) {
        return x;
    }

    /**
     * @see https://easings.net/#easeInOutCubic
     * @param x
     * @return {number}
     */
    function easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    /**
     * @see https://easings.net/#easeOutBack
     * @param x
     * @return {number}
     */
    function easeOutBack(x) {
        const c1 = 1.70158;
        const c3 = c1 + 1;

        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    /**
     * @see https://easings.net/#easeOutExpo
     * @param x
     * @return {number}
     */
    function easeOutExpo(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    /**
     * @see https://easings.net/#easeInOutExpo
     * @param x
     * @return {number}
     */
    function easeInOutExpo(x) {
        return x === 0
               ? 0
               : x === 1
                 ? 1
                 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                           : (2 - Math.pow(2, -20 * x + 10)) / 2;
    }

    /**
     * @see https://easings.net/#easeInOutSine
     * @param x
     * @return {number}
     */
    function easeInOutSine(x) {
        return -(Math.cos(Math.PI * x) - 1) / 2;
    }

    function array_shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
