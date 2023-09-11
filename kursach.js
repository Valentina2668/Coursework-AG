$(document).ready(function () {
    // Carusel
    const timeAnimation = 2 * 1000;

    const images = [
        'images/Кросы 1.jpg', //0
        'images/Кросы 2.jpg', //1
        'images/Кросы 3.jpg', //2
        'images/Кросы 4.jpg',//3
        'images/Кросы 5.jpg',//4
    ];

    let index = 0;

    init();

    $('.btn-next').click(function () {
        index = cyrcleIndex(index + 1);
        moveToImage('.next');
    });

    $('.btn-prev').click(function () {
        index = cyrcleIndex(index - 1);
        moveToImage('.prev');
    });
    // $('.go').click(function () {
    //     let newtest = $('.currentIndex').val() - 0;
    //     index = newtest;
    //     const imageUrl = images[newtest];
    //     $('.next').attr('src', imageUrl);
    //     moveToImage('.next');
    // });
    // $('.btn-newImg').click(function () {
    //     let newURL = $('.addNewImg').val();
    //     images.push(newURL);
    //     init();

    // });
    $('.o-blocks a').click(function () {
        const newIndex = $(this).attr('index') - 0;
        index = newIndex;
        const imageUrl = images[index];
        $('.next').attr('src', imageUrl);
        moveToImage('.next');

        // updateImagesBaseOnIndex();
    });

    function moveToImage(blockSelector) {
        $('.center').animate(
            {
                width: 0
            },
            timeAnimation);

        $(blockSelector).animate(
            {
                width: 800
            },
            timeAnimation,
            'swing',
            function () {
                //At the end of animation
                updateImagesBaseOnIndex();
                $('.center').css('width', '800px');
                $(blockSelector).css('width', '0');
            });
    }

    function updateImagesBaseOnIndex() {
        let prevIndex = cyrcleIndex(index - 1);
        let nextIndex = cyrcleIndex(index + 1);

        $('.prev').attr('src', images[prevIndex]);
        $('.center').attr('src', images[index]);
        $('.next').attr('src', images[nextIndex]);

        $('.currentIndex').val(index);

        $(`.o-blocks a`).text('o');
        $(`.o-blocks a[index=${index}]`).text('x');
    }

    function cyrcleIndex(index) {
        let goodIndex = index;
        if (goodIndex < 0) {
            goodIndex = images.length - 1;
        }

        if (goodIndex >= images.length) {
            goodIndex = 0;
        }

        return goodIndex;
    }

    function init() {
        $('.o-blocks').empty();
        for (let i = 0; i < images.length; i++) {
            //const oTag = $('<a>');
            const oTagJquery = $(document.createElement('a'));
            oTagJquery.text('o');
            oTagJquery.attr('index', i);
            $('.o-blocks').append(oTagJquery);
        }

        updateImagesBaseOnIndex();
    }


    // Changing-shape logo
    const timeDuration = 2 * 1000
    $('.size').click(function () {
        updateRadius(this, "100px");
        updateWidth('.red', '0');
        updateWidth('.green', '100%');

        setTimeout(function () {
            updateWidth('.red', '100%');
            updateWidth('.green', '0');
            updateRadius('.size', "0px")
        }, timeDuration);
    });

    function updateWidth(selector, finalWidth) {
        $(selector).animate(
            {
                width: finalWidth,
            },
            timeDuration
        );
    }

    function updateRadius(selector, finalBorderRadius) {
        $(selector).animate(
            {
                borderRadius: finalBorderRadius,
            },
            timeDuration
        );
    }


    // flying cats
    const sceenHeigth = $(document.body).height(); //получили высоту документа
    const screeWidth = $(document.body).width();
    setInterval(() => {
        moveImgUniversal($('.one'), $('.second'));
    }, 500);

    setInterval(() => {
        moveImgUniversal($('.second'), $('.one'));
    }, 300);

    function moveImgUniversal(imageA, imageB) {
        var imgOnePosition = imageA.offset();
        const imgOneWidth = imageA.width(); //получили ширину картинки
        const imgOneHeight = imageA.height();
        const imgSecondeWidth = imageB.width(); //получили ширину картинки
        const imgSecondHeight = imageB.height();
        const maxTop = sceenHeigth - imgSecondHeight; //вычислили высоту, чтобы каждый раз ее не вычислять в функции moveImg
        const maxLeft = screeWidth - imgSecondeWidth; //вычислили ширину, чтобы каждый раз ее не вычислять в функции moveImg


        var randomTop = Math.floor(Math.random() * maxTop) + 0;
        var randomLeft = Math.floor(Math.random() * maxLeft) + 0;
        if (randomTop < imgOnePosition.top - imgSecondHeight
            || randomTop > imgOnePosition.top + imgOneHeight
            || randomLeft < imgOnePosition.left - imgSecondeWidth
            || randomLeft > imgOnePosition.left + imgOneWidth) {
            imageB.animate({ 'left': randomLeft, 'top': randomTop, }, 1000);
        }
    }


    // jalousie
    let curtainOpen = false;
    const shiftCurtain = 0.2;
    const animationDuration = 1000;
    $(".rope").click(function () {

        if (curtainOpen) {
            // $('.right-curtain').css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
            // $('.left-curtain').css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
            $('.right-curtain').animate({
                left: 0
            }, { duration: animationDuration * 4, queue: false });
            $('.left-curtain').animate({
                left: 0
            }, { duration: animationDuration * 4, queue: false });
        } else {
            curtainsMoving('.left-curtain', - 1);
            curtainsMoving('.right-curtain', 1);
            setTimeout(() => {
                $('.left-curtain').animate({
                    left: -585
                }, { duration: animationDuration * 5, queue: false });
                $('.right-curtain').animate({
                    left: 585
                }, { duration: animationDuration * 5, queue: false });
            }, animationDuration);
        }
        curtainOpen = !curtainOpen;
    });
    function curtainsMoving(selector, sight) {
        $(selector).animate(
            { smile: shiftCurtain * sight },
            {
                step: function (now) {
                    console.log(now)
                    // $(selector).css('transform', 'matrix(1.0, 0.0, ' + (now) + ', 1.0, 0.0, 0.0)');
                },
                duration: animationDuration, queue: false
            }
        )
    };
    // pulsing rounds

    const timeDur = 500
    $('.round').click(function () {
        setInterval(function () {
            const roundItems = 5;
            for (let index = 0; index < roundItems; index++) {
                const randomSize = 150 - (getRandomNumber(0, 20) + index * 20)
                $(`.curcle_${index}`).animate({
                    width: randomSize,
                    height: randomSize
                }, timeDuration
                )
            }
        }, timeDur)
    })
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

});
