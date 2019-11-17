# FSD The 4th task. JQuery Custom plugin

### выполнено для FSD Frontend 4 step education

## Пример работы слайдера на демонстрационной [странице](https://hahahayabanan.github.io/FSD-4th-task/)
---

## Развёртывание
Клонировать
>git clone https://github.com/Hahahayabanan/FSD-4th-task.git

Установка
>npm i

Запустить webpack server
>npm run start

Запустить karma тесты
>npm run test

Запустить production build
>npm run build

Запустить Eslint по файлам проекта
> npm run eslint-fix

---
# Архитектура проекта

Имя класса      | Описание
----------------|----------------------
EventObserver   | Реализует паттерн "наблюдатель"
MODEL           | 
ISliderSettings | Интерфейс, содержит свойства настроек слайдера
SliderSettings  | Реализует свойства и методы настроек слайдера, логику их инициализации, проверки на валидность, сеттеры, геттеры
Model           | Содержит объект настроек слайдера, методы расчета текущей позиции с учетом минимального, максимального значений и шага
VIEW            | 
TipView         | Реализует структуру элемента над бегунком, который показывает значение и который ползает за мышкой
PointerView     | Реализует структуру бегунка, отслеживает положение мыши, создает событие при изменении положения элемента, содержит объект TipView
TemplateView    | Реализует шаблон слайдера, содержит объект слайдера, объект бегунка слайдера
PRESENTER       | 
Presenter       | Реализует логику работы слайдера, содержит объект модели, объект отображения
PresenterAPI    | Статический класс, реализует методы, для получения, внесения данных в плагин



## UML диаграмма

![Diagram](https://github.com/Hahahayabanan/FSD-4th-task/blob/master/uml.png)

## Пример инициализации

```JavaScript
$( ".selector" ).slider({
      min: 200, 
      max: 500, 
      step: 100,
      value: 300,
      hasTip: true
})
```
## Пример инициализации с помощью data-атрибутов
```html
<div class='slider' data-min=99 data-max=199 data-step=1 data-is-range='true' data-orientation='vertical' data-values='[105, 125]' data-follower-point='true'></div>

<script>
  $(() => {
    $( ".slider" ).slider()
  })
</script>
```

При инициализации data-атрибуты имеют наименьший приоритет, а в остальных случаях пассивны

# API настройки

## max
>**Type:** ***number***

>**Default:** ***100***

Максимальное значение слайдера

#### Примеры использования в коде:

Инициализация слайдера со значением ```max```:

```JavaScript
$( ".selector" ).slider({
      max: 500
})
```
Получить или установить значение ```max``` после инициализации слайдера
```JavaScript
// Getter
let max = $( ".selector" ).slider( "option", "max" );
 
// Setter
$( ".selector" ).slider( "option", "max", 50 );
```
---




## min
>**Type:** ***number***

>**Default:** ***0***

Минимальное значение слайдера

#### Примеры использования в коде:

Инициализация слайдера со значением ```min```:

```JavaScript
$( ".selector" ).slider({
      min: 100
})
```
Получить или установить значение ```min``` после инициализации слайдера
```JavaScript
// Getter
let max = $( ".selector" ).slider( "option", "min" );
 
// Setter
$( ".selector" ).slider( "option", "min", 10 );
```
---




## orientation
>**Type:** ***string***

>**Default:** ***"horizontal"***

Определяет положение слайдера горизонтально (min слева, max справа) или вертикально (min сверху, max снизу). Доступные значения ```"horizontal"``` либо ```"vertical"```.

#### Примеры использования в коде:

Инициализация слайдера со значением ```orientation```:

```JavaScript
$( ".selector" ).slider({
      orientation: "vertical"
});
```
Получить или установить значение ```min``` после инициализации слайдера
```JavaScript
// Getter
let orientation = $( ".selector" ).slider( "option", "orientation" );
 
// Setter
$( ".selector" ).slider( "option", "orientation", "vertical" );
```
---



## isRange
>**Type:** ***boolean***

>**Default:** ***false***

Определяет количество бегунков слайдера. При значении ```false``` бегунок один, вводимое значение число, при значении ```true``` два бегунка, вводимое значение интервал.

#### Примеры использования в коде:

Инициализация слайдера со значением ```isRange```:

```JavaScript
$( ".selector" ).slider({
  isRange: true
});
```
Получить или установить значение ```isRange``` после инициализации слайдера
```JavaScript
// Getter
let isRange = $( ".selector" ).slider( "option", "isRange" );
 
// Setter
$( ".selector" ).slider( "option", "isRange", true );
```
---






## step
>**Type:** ***number***

>**Default:** ***1***

Определяет размер или количество каждого интервала или шага слайдера между минимальным и максимальным значениями. Заданный диапазон значений ползунка (max - min) должен делиться на шаг нацело.

#### Примеры использования в коде:

Инициализация слайдера со значением ```step```:

```JavaScript
$( ".selector" ).slider({
  step: 10
});
```
Получить или установить значение ```step``` после инициализации слайдера
```JavaScript
// Getter
let step = $( ".selector" ).slider( "option", "step" );
 
// Setter
$( ".selector" ).slider( "option", "step", 5 );
```
---




## value
>**Type:** ***number***

>**Default:** ***null***

Определяет текущее значение ползунка (и его положение) при ```isRange: false```. Если значение не указано, определяется как минимальное.

#### Примеры использования в коде:

Инициализация слайдера со значением ```value```:

```JavaScript
$( ".selector" ).slider({
  value: 5
});
```
Получить или установить значение ```value``` после инициализации слайдера
```JavaScript
// Getter
let value = $( ".selector" ).slider( "option", "value" );
 
// Setter
$( ".selector" ).slider( "option", "value", 10 );
```
---





## values
>**Type:** ***Array***

>**Default:** ***null***

Определяет текущее значение интервала ползунков (и их положение) при ```isRange: true```. Если не указано, первый ползунок определяется как минимальное, второй как максимальное.

#### Примеры использования в коде:

Инициализация слайдера со значением ```values```:

```JavaScript
$( ".selector" ).slider({
  values: [5, 10]
});
```
Получить или установить значение ```values``` после инициализации слайдера
```JavaScript
// Getter
let values = $( ".selector" ).slider( "option", "values" );
 
// Setter
$( ".selector" ).slider( "option", "values", [10, 15] );
```
Получить или установить ***конкретное*** значение ```values``` после инициализации слайдера
```JavaScript
// Getter
let values = $( ".selector" ).slider( "option", "values", 0 );
 
// Setter
$( ".selector" ).slider( "option", "values", 1, 25 );
```
---



## isRange
>**Type:** ***boolean***

>**Default:** ***false***

Определяет будет отображаться значение ползунка. При значении ```true``` над бегунком отображается значение.

#### Примеры использования в коде:

Инициализация слайдера со значением ```hasTip```:

```JavaScript
$( ".selector" ).slider({
  hasTip: true
});
```
Получить или установить значение ```hasTip``` после инициализации слайдера
```JavaScript
// Getter
let hasTip = $( ".selector" ).slider( "option", "hasTip" );
 
// Setter
$( ".selector" ).slider( "option", "hasTip", true );
```
---




## Событие changePointer
>**Type:** ***Event***

Срабатывает после перемещения ползунка мышью или изменении значения программно, методами ```value```, ```values```.

Свойство ```event.detail``` содержит объект класса PointerView, значение которого было изменено

#### Пример использования в коде:
```JavaScript
$( ".selector" ).on( "changePointer", function( event ) {} );
```

---
