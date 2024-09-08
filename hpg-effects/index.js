'use strict';

let cells = [],
    cellsMargin
;
const EFFECT_TYPES = {
    NONE: 'NONE',
    BUFF: 'BUFF',
    DEBUFF: 'DEBUFF',    
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
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/002.png',
        title: 'Минус игра',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/003.png',
        title: 'Оптовая закупка',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/004.png',
        title: 'Орел Решка',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/005.png',
        title: 'Интрига',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/006.png',
        title: 'Спонсорское задание',
        type: EFFECT_TYPES.BUFF,
    },
    {
        img: 'images/007.png',
        title: 'Во власти чисел',
        type: EFFECT_TYPES.BUFF,       
    },
    {
        img: 'images/008.png',
        title: 'Бумер ролл',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/009.png',
        title: 'Зумер ролл',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0010.png',
        title: 'Чат закон',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0011.png',
        title: 'Стример закон',
        type: EFFECT_TYPES.DEBUFF,
    }, 
    {
        img: 'images/0012.png',
        title: 'Акция 1=2',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0013.png',
        title: 'Динамит',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0014.png',
        title: 'Стонкс',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0015.png',
        title: 'НЕСтонкс',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0016.png',
        title: 'Азбука',
        type: EFFECT_TYPES.DEBUFF,
    },
     {
        img: 'images/0017.png',
        title: 'Русская рулетка',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0018.png',
        title: 'Капкан',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0019.png',
        title: 'Талон с ошибкой',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0020.png',
        title: 'Бронежилет Отмены',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0021.png',
        title: 'Шпаргалка',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0022.png',
        title: 'Проездной ТАТ',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0023.png',
        title: 'Стопка пираток',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0024.png',
        title: 'Синяя таблетка',
        type: EFFECT_TYPES.DEBUFF,
    },
    {
        img: 'images/0025.png',
        title: 'Красная таблетка',
        type: EFFECT_TYPES.DEBUFF,
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

