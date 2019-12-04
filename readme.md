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
EventObserver   | Реализует паттерн 'наблюдатель'
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



## UML диаграмма

![Diagram](https://github.com/Hahahayabanan/FSD-4th-task/blob/master/uml.png)

## Пример инициализации

```JavaScript
$( '.selector' ).HYBSlider({
      min: 200, 
      max: 500, 
      step: 100,
      from: 300,
      hasTip: true
})
```
## Пример инициализации с помощью data-атрибутов
```html
<div class='slider' data-min=99 data-max=199 data-step=1 data-is-range='true' data-orientation='vertical' data-from=105 data-to=125 data-follower-point='true'></div>

<script>
  $(() => {
    $( '.slider' ).HYBSlider()
  })

  $(() => {
    $( '.slider' ).HYBSlider({ min: 20, max: 150, step: 30, isRange: true, from: 25, to: 50 })
  })
</script>
```

При инициализации data-атрибуты имеют наименьший приоритет, а в остальных случаях пассивны

# API

## Методы

Принимает параметры и позволяет обновить слайдер
Возвращает объект
```JavaScript
$( '.slider' ).HYBSlider('update', { min: 20 })
```
Возвращает jQuery объект, содержащий объект текущих параметров слайдера
```JavaScript
const $parameters = $( '.slider' ).HYBSlider('getSettings');
const parametersForFirstSliderMatch = $parameters.get(0);
const { min, max, step } = parametersForFirstSlider;

```

## max
>**Type:** ***number***

>**Default:** ***100***

Максимальное значение слайдера



## min
>**Type:** ***number***

>**Default:** ***0***

Минимальное значение слайдера



## orientation
>**Type:** ***string***

>**Default:** ***'horizontal'***

Определяет положение слайдера горизонтально (min слева, max справа) или вертикально (min сверху, max снизу). Доступные значения ```'horizontal'``` либо ```'vertical'```.



## isRange
>**Type:** ***boolean***

>**Default:** ***false***

Определяет количество бегунков слайдера. При значении ```false``` бегунок один, вводимое значение число, при значении ```true``` два бегунка, вводимое значение интервал.



## step
>**Type:** ***number***

>**Default:** ***1***

Определяет размер или количество каждого интервала или шага слайдера между минимальным и максимальным значениями. Заданный диапазон значений ползунка (max - min) должен делиться на шаг нацело.



## value
>**Type:** ***number***

>**Default:** ***null***

Определяет текущее значение ползунка (и его положение) при ```isRange: false```. Если значение не указано, определяется как минимальное.



## values
>**Type:** ***Array***

>**Default:** ***null***

Определяет текущее значение интервала ползунков (и их положение) при ```isRange: true```. Если не указано, первый ползунок определяется как минимальное, второй как максимальное.



## hasTip
>**Type:** ***boolean***

>**Default:** ***false***

Определяет будет отображаться значение ползунка. При значении ```true``` над бегунком отображается значение.



## Событие changePointer
>**Type:** ***Event***

Срабатывает после перемещения ползунка мышью или изменении значения программно, методами ```value```, ```values```.

Свойство ```event.detail``` содержит объект класса PointerView, значение которого было изменено

#### Пример использования в коде:
```JavaScript
$( '.selector' ).on( 'changePointer', function( event ) {} );
```

---
