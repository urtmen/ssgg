'use strict';

let cells = [],
    cellsMargin
;
const EFFECT_TYPES = {
    NONE: 'NONE',
    BUFF: 'BUFF',
    DEBUFF: 'DEBUFF',
    TARGET_TRAP: 'TARGET_TRAP',
    NONTARGET_TRAP: 'NONTARGET_TRAP',
    SPECIFIC_WHEEL_ROLL: 'SPECIFIC_WHEEL_ROLL',
    FOOD: 'FOOD'
};
const items = [
    {
        img: 'images/000.png',
        title: 'Пустая ячейка',
        type: EFFECT_TYPES.NONE,
    },    
    {
        img: 'images/001.png',
        title: 'Плюс игра',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/002.png',
        title: 'Минус игра',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/003.png',
        title: 'Оптовая закупка',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/004.png',
        title: 'Орел или Решка',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/005.png',
        title: 'Интрига',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/006.png',
        title: 'Спонсорское задание',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/007.png',
        title: 'Во власти чисел',
        type: EFFECT_TYPES.DEBUFF,       
    },
    {
        img: 'images/008.png',
        title: 'Бумер ролл',
        type: EFFECT_TYPES.SPECIFIC_WHEEL_ROLL,
    },
    {
        img: 'images/009.png',
        title: 'Зумер ролл',
        type: EFFECT_TYPES.SPECIFIC_WHEEL_ROLL,
    },
    {
        img: 'images/010.png',
        title: 'Чат закон',
        type: EFFECT_TYPES.SPECIFIC_WHEEL_ROLL,
    },
    {
        img: 'images/011.png',
        title: 'Стример закон',
        type: EFFECT_TYPES.SPECIFIC_WHEEL_ROLL,
    }, 
    {
        img: 'images/012.png',
        title: 'Акция 1=2',
        type: EFFECT_TYPES.SPECIFIC_WHEEL_ROLL,
    },
    {
        img: 'images/013.png',
        title: 'Динамит',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/014.png',
        title: 'Стонкс',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/015.png',
        title: 'НЕСтонкс',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/016.png',
        title: 'Азбука',
        type: EFFECT_TYPES.BUFF,
    },
     {
        img: 'images/017.png',
        title: 'Русская рулетка',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/018.png',
        title: 'Капкан',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/019.png',
        title: 'Талон с ошибкой',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/020.png',
        title: 'Бронежилет Отмены',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/021.png',
        title: 'Шпаргалка',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/022.png',
        title: 'Проездной ТАТ',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/023.png',
        title: 'Стопка пираток',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/024.png',
        title: 'Синяя таблетка',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/025.png',
        title: 'Красная таблетка',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/026.png',
        title: 'Маска везунчика',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/027.png',
        title: 'Ненастоящий жетон',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/028.png',
        title: 'Швейный набор',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/029.png',
        title: 'Записка Окрашено',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/030.png',
        title: 'Шар Цыганки',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/031.png',
        title: 'Лезвие воришки',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/032.png',
        title: 'Шо опять',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/033.png',
        title: 'Дыра в мешке',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/034.png',
        title: 'Красная карточка',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/035.png',
        title: 'Золотой билет',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/036.png',
        title: 'Золотое колесо событий',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/037.png',
        title: 'Измазанное колесо событий',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/038.png',
        title: 'Разбитые часы',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/039.png',
        title: 'Желтый пропуск',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/040.png',
        title: 'Красный пропуск',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/041.png',
        title: 'Колесо с наклейкой SALE',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/042.png',
        title: 'Энергетик All Stop',
        type: EFFECT_TYPES.FOOD,
    },
    {
        img: 'images/043.png',
        title: 'Активированный уголь',
        type: EFFECT_TYPES.FOOD,
    },
    {
        img: 'images/044.png',
        title: 'Газировка с особой крышкой',
        type: EFFECT_TYPES.FOOD,
    },
    {
        img: 'images/045.png',
        title: 'Кротовуха',
        type: EFFECT_TYPES.FOOD,
    },
    {
        img: 'images/046.png',
        title: 'Сомнительная шаурма',
        type: EFFECT_TYPES.FOOD,
    },
];
let selectedCellKey = false;

const inventory = $('.inventory'),
    cellTemplate = $('<div><div class="cell"><img/></div></div>'),
    controlDelete = $('<a/>', {
        text: '×',
        title: 'Удалить ячейку',
        class: 'remove',
        href: '#',
        click: function () {
            const $cell = $(this).closest('.cell').parent(),
                idx = $cell.index();

            delete cells[idx];
            cells.splice(idx, 1);

            $cell.find(cellControlsTemplate).detach();
            $cell.remove();
            saveState();

            return false;
        }
    }),
    cellControlsTemplate = $('<div class="controls"></div>')
        .append(controlDelete)
    ,
    addCell = function (triggerClick=false) {
        const newCell = cellTemplate.clone();
        inventory.append(newCell);

        newCell.on('click', cellOnClick);
        newCell.on('mouseenter', cellOnHover);
        newCell.on('mouseleave', function () {
            $(this).find(cellControlsTemplate).detach()
        });

        if (triggerClick) {
            newCell.trigger('click');
        }
    },
    cellUpdateDOM = function (key) {
        if (!cells[key] || !cells[key].item) {
            return
        }

        const $cell = inventory.find('.cell').eq(key);

        $('img', $cell).attr({
            src: cells[key].item.img,
            title: cells[key].item.title
        });

        const cellType = cells[key].item.type ? cells[key].item.type : EFFECT_TYPES.NONE;
        $cell.parent().attr("class", cellType);
    },
    selectCell = function (key) {
        selectedCellKey = key;

        const cells = $('.cell', inventory)
            .removeClass('active');

        if (typeof(key) === "number") {
            cells.eq(key).addClass('active');
        }
    },
    cellOnClick = function () {
        const $cell = $(this),
            currIndex = $cell.index()
        ;
        if (selector.is(':visible')) {
            if (selectedCellKey === currIndex) {
                selector.hide();
                selectCell(false);
            }
            else {
                selectCell(currIndex);
            }
        }
        else {
            selector.show();
            selectCell(currIndex);
        }
    },
    addCellOnClick = function () {
        cells.push({});
        addCell(true);
        saveState();
    },
    cellOnHover = function () {
        $('.cell', this).append(cellControlsTemplate);
    },
    setCellMargin = function (number) {
        cellsMargin = number;
        document.documentElement.style.setProperty('--cell-margin-left', number + 'px');
    },
    createCells = function (cellsArray) {
        for (let i in cellsArray) {
            addCell();
            cellUpdateDOM(i);
        }
    },
    getStorageKeySuffix = function () {
        return location.search.substring(1, 20);
    },
    saveState = function () {
        const data = {
            cells,
            cellsMargin
        };

        localStorage.setItem('effects-' + getStorageKeySuffix(), JSON.stringify(data));
    },
    loadState = function () {
        let data;

        try {
            data = JSON.parse(localStorage.getItem('effects-' + getStorageKeySuffix()));
        } catch (e) {
            console.error('Loading state', e);
        }

        if (!data || !data.cells) {
            data = {
                cellsMargin: -14,
                cells: [
                    {},
                ]
            };
        }

        ({cells, cellsMargin} = data);
    },
    selector = $('.selector'),
    selectorOnClick = function () {
        const $itemKey = $(this).data('key');

        cells[selectedCellKey] = {
            item: items[$itemKey],
        };
        cellUpdateDOM(selectedCellKey);

        saveState();
        selectCell(false);
        selector.hide();
    },
    createSelector = function(items) {
        const list = $('ul', selector);
        for(let i in items) {
            list.append(
                $('<li/>', {
                    'data-key': i,
                    html: $('<img/>', {
                        src: items[i].img,
                        title: items[i].title
                    }),
                    click: selectorOnClick
                })
            )
        }
    },
    loadMarginState = function () {
        if (/^[-\d]+$/.test(cellsMargin)) {
            setCellMargin(cellsMargin);
            $('#cell-left-margin').val(cellsMargin);
        }
    }
;

$('.add-cell').on('click', addCellOnClick);

$('#cell-left-margin').on('change', function () {
    setCellMargin($(this).val());
    saveState()
});

loadState();

console.log(cells);

loadMarginState();
createCells(cells);
createSelector(items);

